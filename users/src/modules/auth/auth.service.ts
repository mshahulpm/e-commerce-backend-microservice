import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginInput } from './dto/auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async login(data: LoginInput) {

    const user = (await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.username },
          { phone: data.username }
        ]
      }
    }))

    if (!user) throw new BadRequestException('Invalid Credentials')

    if (user.banned) throw new ForbiddenException()

    const isPasswordValid = await argon.verify(user.password, data.password)

    if (!isPasswordValid) throw new BadRequestException('Invalid Credentials')

    const token = this.jwtService.sign(
      { id: user.id, roles: user.roles, name: user.name },
    )

    return {
      message: 'Login success!',
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        roles: user.roles
      }
    }

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
