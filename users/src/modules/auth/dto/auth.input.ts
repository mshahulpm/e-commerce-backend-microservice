import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'email or phone ' })
  username: string;

  @Field(() => String, { description: 'Password' })
  password: string
}

@InputType()
export class SignupInput {
  @IsEmail()
  @Field(() => String, { description: 'Email' })
  email: string

  @IsPhoneNumber()
  @Field(() => String, { description: 'Phone' })
  phone: string

  @IsString()
  @MinLength(8)
  @Field(() => String, { description: 'Password min 8 characters' })
  password: string

  @Field(() => String, { description: 'Full Name' })
  @IsNotEmpty()
  name: string
}