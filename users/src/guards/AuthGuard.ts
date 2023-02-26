import {
    CanActivate,
    createParamDecorator,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuardPermissionKey, AuthPermissions } from 'src/guards/AuthGuardpermission';
import { JwtService } from "@nestjs/jwt";
import { GqlExecutionContext } from '@nestjs/graphql';
import { roles } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const ctx = GqlExecutionContext.create(context)
        const { req } = ctx.getContext()

        const authGuardPermissions = this.reflector.get<AuthPermissions>(
            AuthGuardPermissionKey,
            context.getHandler(),
        );

        // checking if the guard is disabled for a specific route 
        if (authGuardPermissions?.disableGuard) return true

        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            throw new UnauthorizedException('No Token found');
        }

        let decodedToken: any
        try {
            decodedToken = this.jwtService.verify(token)
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Invalid Token')
        }

        if (!decodedToken?.id) {
            throw new UnauthorizedException();
        }

        req.user = decodedToken;

        if (authGuardPermissions?.allowedUsers?.length > 0) {
            let isRoleAllowed = false
            authGuardPermissions.allowedUsers.forEach(role => {
                if (decodedToken.roles.includes(role)) isRoleAllowed = true
            })
            if (!isRoleAllowed) throw new ForbiddenException()
        }

        return true
    }
}


/**
 *  Custom User Decorator to get user details 
 */
export type JWTDecodedUser = {
    id: string,
    roles: roles[],
    name: string,
    iat: number,
    exp: number
}
export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const { req } = GqlExecutionContext.create(ctx).getContext()
        return req.user as JWTDecodedUser
    }

);