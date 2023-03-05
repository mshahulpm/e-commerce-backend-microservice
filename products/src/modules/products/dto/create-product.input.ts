import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { MinLength, IsNotEmpty, IsHexadecimal, Min, IsUUID, IsArray, IsOptional } from 'class-validator'
@InputType()
export class CreateProductInput {

  @IsNotEmpty()
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @IsOptional()
  @Min(0)
  @Field(() => Float, { nullable: true })
  price?: number

  @IsOptional()
  @Min(0)
  @Field(() => Float, { nullable: true })
  discount?: number

  @IsOptional()
  @Field(() => String, { nullable: true })
  sku?: string

  @IsOptional()
  @Min(0)
  @Field(() => Int, { nullable: true })
  stock?: number

  @Field(() => String, { nullable: true })
  thumbnail?: string

  @IsUUID(undefined, { each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  categories?: string[]

  @Field(() => [String], { nullable: true })
  images?: string[]

  @Field(() => Boolean, { nullable: true })
  disabled?: boolean

}


@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string
}