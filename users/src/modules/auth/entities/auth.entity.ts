import { ObjectType, Field, Int, PickType } from '@nestjs/graphql';
import { roles } from '@prisma/client';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@ObjectType()
export class LoginUser extends PickType(User, ['email', 'name', 'phone', 'roles']) { }

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  message: string
  @Field(() => String)
  token: string
  @Field(() => LoginUser)
  user: LoginUser

}


