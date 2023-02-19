import { handlePaginationQuery } from "src/utils";


type paginateArgs<T, T2> = {
    model: any,
    args?: T,
    searchFields?: Array<keyof T2>,
    query?: any
}
export async function prismaPaginate<T, T2>({
    model, args, query, searchFields
}: paginateArgs<T, T2>) {

    let { filter, search, ...rest } = handlePaginationQuery(query)
    // @ts-ignore
    let { where, orderBy, ...restOfArgs } = args || {}

    // removing extra space 
    if (search) {
        search = (search as string).split(' ').filter(t => t != '').join('&')
    }

    // if search and searchFields exist modify the where object
    if (search && searchFields?.length) {
        const searchQuery = {
            OR: searchFields.map(field => ({
                [field]: { search }
            }))
        }
        if (where) {
            where = {
                AND: {
                    ...searchQuery,
                    ...where
                }
            }
        } else {
            where = searchQuery
        }
    }

    // appending filter into where 
    where = {
        ...where,
        ...filter
    }

    const count = await model.count({ where })
    const docs = await model.findMany({
        ...rest,
        ...restOfArgs,
        orderBy: {
            created_at: 'desc',
            ...orderBy
        },
        where
    })

    return {
        page: +query.page || 1,
        limit: rest.take,
        last_page: Math.ceil(count / rest.take),
        totalDocs: count,
        offset: rest.skip,
        docs,
    }
}


