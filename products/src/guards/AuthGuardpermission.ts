enum roles {
    super_admin = 'super_admin',
    admin = 'admin',
    user = 'user'
}
import { CustomDecorator, SetMetadata } from '@nestjs/common';

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
