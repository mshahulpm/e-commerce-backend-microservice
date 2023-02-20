import { CreateProductInput } from './create-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @IsUUID()
  @Field(() => String)
  id: string;
}

@InputType()
export class UpdateCategoryInput {
  @IsUUID()
  @Field(() => String)
  id: string;
}