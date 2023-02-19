import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuardPermissionMetadataKey, IAuthPermissions } from 'src/guards/AuthGuardpermission';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authGuardPermissions = this.reflector.get<IAuthPermissions>(
            AuthGuardPermissionMetadataKey,
            context.getHandler(),
        );

        // avoiding message queue requests
        if (authGuardPermissions?.isMessagePattern) return true

        const token = request.headers.authorization?.split('Bearer ')[1];

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


        request.user = decodedToken;

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
