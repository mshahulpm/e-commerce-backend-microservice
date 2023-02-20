import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class PaginatedResult {

    @Field(() => Int)
    page: number

    @Field(() => Int)
    limit: number

    @Field(() => Int)
    last_page: number

    @Field(() => Int)
    totalDocs: number

    @Field(() => Int)
    offset: number

}


