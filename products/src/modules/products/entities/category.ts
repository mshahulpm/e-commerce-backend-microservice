import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { PaginatedResult } from "src/entity/common";
import { Product } from "./product.entity";


@ObjectType()
export class Category {

    @Field(() => String)
    id: string

    @Field(() => String)
    name: string

    @Field(() => GraphQLISODateTime)
    createdAt: Date

    @Field(() => GraphQLISODateTime)
    updatedAt: Date

    @Field(() => [Product], { nullable: true })
    products?: Product[]
}

@ObjectType()
export class PaginatedCategories extends PaginatedResult {

    @Field(() => [Category])
    docs: Category[]
}