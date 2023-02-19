import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { Product } from "./product.entity";


@ObjectType()
export class Category {
    @Field(() => String)
    name: string

    @Field(() => GraphQLISODateTime)
    createdAt: Date

    @Field(() => GraphQLISODateTime)
    updatedAt: Date
}

