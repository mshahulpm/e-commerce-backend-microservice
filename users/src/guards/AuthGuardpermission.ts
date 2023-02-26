
import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { roles } from '@prisma/client'

export interface AuthPermissions {
    disableGuard?: boolean
    allowedUsers?: roles[]
}

export const AuthGuardPermissionKey = 'authPermissions';

export const AuthGuardPermissions = (
    permissions?: AuthPermissions,
): CustomDecorator<string> =>
    SetMetadata(AuthGuardPermissionKey, {
        isMessagePattern: permissions?.disableGuard,
        allowedUsers: permissions?.allowedUsers ?? [],
    });
