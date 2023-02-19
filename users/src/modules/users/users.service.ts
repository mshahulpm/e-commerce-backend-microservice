import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as argon from 'argon2'

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(data: CreateUserInput) {

    const hashedPassword = await argon.hash(data.password)
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    })
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
