import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })

    if(!user) {
      throw new NotFoundException(userWhereUniqueInput)
    }

    return user;
  }

  async users(): Promise<User[] | null> {
    return this.prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: {
        id
      },
      data
    });
  }

}
