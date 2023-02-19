import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { roles } from '@prisma/client';
import { ArrayMinSize, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { LoginInput } from 'src/modules/auth/dto/auth.input';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput {

  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsEmail()
  @Field(() => String)
  email: string

  @IsPhoneNumber()
  @IsString()
  @Field(() => String)
  phone: string

  @MinLength(8)
  @IsString()
  @Field(() => String)
  password: string

  @ArrayMinSize(1)
  @Field(() => [roles])
  roles: `${roles}`[]

}
