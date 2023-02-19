import { ObjectType, Field, Int, Float, GraphQLISODateTime, } from '@nestjs/graphql';
import { Category } from './category';

@ObjectType()
export class Product {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Float, { nullable: true })
  price?: number

  @Field(() => Float, { nullable: true })
  discount?: number

  @Field(() => String, { nullable: true })
  sku?: string

  @Field(() => Int, { nullable: true })
  stock?: number

  @Field(() => String, { nullable: true })
  thumbnail?: string

  @Field(() => Category, { nullable: true })
  categories?: Category[]

  @Field(() => [String], { nullable: true })
  images?: string[]

  @Field(() => Boolean, { nullable: true })
  disabled?: boolean

  @Field(() => GraphQLISODateTime)
  createdAt: Date

  @Field(() => GraphQLISODateTime)
  updatedAt: Date
}
