import { LoginInput } from './auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(LoginInput) {
  @Field(() => Int)
  id: number;
}
