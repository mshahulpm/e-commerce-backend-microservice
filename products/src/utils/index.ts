import { BadRequestException, InternalServerErrorException } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { ClassConstructor, plainToInstance } from "class-transformer"
import { validate } from "class-validator"



export function handlePaginationQuery(query: any) {

    let { page, limit, search = '', ...others } = query
    page = Math.abs(parseInt(page) || 1) - 1
    limit = Math.abs(parseInt(limit) || 10)

    let filter = {}

    Object.entries(others).forEach(([key, value]) => {

        if (typeof value === 'string') {
            filter[key] = value
        }
        if (Array.isArray(value)) {
            filter[key] = {
                in: value
            }
        }
    })

    return {
        take: limit,
        skip: page * limit,
        search,
        filter
    }
}



export function omitNull(obj: { [key: string]: any }) {
    const res = {}
    Object.entries(obj).forEach(([key, value]) => {
        // const [key, value] = entry
        if (value !== null) {
            res[key] = value
        }
    })
    return res
}


export function handleValidationError(error: any) {
    if (error?.name === 'ValidationError') throw new BadRequestException(error)
    throw new InternalServerErrorException(error)
}



export async function validateAndHandleError(cls: ClassConstructor<unknown>, payload: any) {

    const data = plainToInstance(cls, payload)

    // @ts-ignore
    const error = (await validate(data, { whitelist: true }))[0]

    if (error) {
        throw new InternalServerErrorException(error)
    }

    return data
}


/**
 *  custom promise function to handle client proxy request b/w services 
 */
export function handleClientProxyReq(pattern: any, data: any, client: ClientProxy) {
    return new Promise((resolve, reject) => {

        // default 10 second timeout 
        const timeoutId = setTimeout(() => {
            console.log('Resident details fetch time out')
            resolve(null)
        }, 10000)

        client.send(pattern, data).subscribe({
            next(value) {
                clearTimeout(timeoutId)
                resolve(value)
            },
            error(err) {
                console.log('======== Microservice Client request failed =========')
                console.log(err)
                clearTimeout(timeoutId)
                resolve(null)
            },
        })
    })
}