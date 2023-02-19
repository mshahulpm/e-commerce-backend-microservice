import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { roles } from '@prisma/client';

registerEnumType(roles, {
  name: 'Roles'
})

@ObjectType()
export class User {
  @Field(() => String)
  id: string
  @Field(() => Boolean, { nullable: true })
  banned?: boolean
  @Field(() => String)
  name: string
  @Field(() => String)
  email: string
  @Field(() => String)
  phone: string
  @Field(() => [roles])
  roles: `${roles}`[]

}
