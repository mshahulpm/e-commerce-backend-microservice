import { Resolver, Query, Mutation, Args, Int, } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth, LoginResponse } from './entities/auth.entity';
import { LoginInput } from './dto/auth.input';
import { UseGuards } from '@nestjs/common'
import { AuthGuard, JWTDecodedUser, GetUser } from 'src/guards/AuthGuard'
import { User } from '../users/entities/user.entity';


@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginResponse)
  login(@Args('login') createAuthInput: LoginInput) {
    return this.authService.login(createAuthInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'getAuthenticatedUser' })
  getAuthenticatedUser(@GetUser() user: JWTDecodedUser) {
    return this.authService.getAuthUser(user.id);
  }


}
