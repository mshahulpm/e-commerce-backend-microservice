
import { CustomDecorator, SetMetadata } from '@nestjs/common';
export enum roles {
    admin = 'admin',
    super_admin = 'super_admin',
    user = 'user',
}

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
