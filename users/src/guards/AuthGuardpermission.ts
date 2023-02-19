
import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { roles } from '@prisma/client'

export interface IAuthPermissions {
    isMessagePattern?: boolean
    allowedUsers?: roles[]
}

export const AuthGuardPermissionMetadataKey = 'authPermissions';

export const AuthGuardPermissions = (
    permissions?: IAuthPermissions,
): CustomDecorator<string> =>
    SetMetadata(AuthGuardPermissionMetadataKey, {
        isMessagePattern: permissions?.isMessagePattern,
        allowedUsers: permissions?.allowedUsers ?? [],
    });
