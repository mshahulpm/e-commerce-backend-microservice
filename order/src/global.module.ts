import { Global, Module } from "@nestjs/common/decorators";
import { PrismaService } from "./prisma/prisma.service";
import { JwtModule, JwtService } from '@nestjs/jwt'


@Global()
@Module({
    imports: [
        JwtModule.register({}),
    ],
    providers: [PrismaService, JwtService],
    exports: [PrismaService, JwtService]
})
export class GlobalModule { }