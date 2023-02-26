import { Global, Module } from "@nestjs/common/decorators";
import { PrismaService } from "./prisma/prisma.service";
import { JwtModule } from '@nestjs/jwt'


@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            verifyOptions: {
                ignoreExpiration: false
            },
            signOptions: {
                expiresIn: '7d'
            }
        }),
    ],
    providers: [PrismaService],
    exports: [JwtModule, PrismaService]
})
export class GlobalModule { }