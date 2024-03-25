import { Injectable } from '@nestjs/common';
import { Role, Status } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: { id: string }): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }


  async createUser(dto: CreateUserInput): Promise<User> {
    const data = {
      email: dto.email,
      password: await hash(dto.password),
      role: Role.USER,
      status: Status.ACTIVE
    };

    return this.prisma.user.create({
      data: {
        ...data,
        profile: {
          create: {
            gender: '',
            firstName: '',
            lastName: '',
            about: '',
            avatar: '',
            age: 1
          },
        },
      },
    });
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(userIds: string[]) {
    return this.prisma.user.deleteMany({
      where: {
        id: {
          in: userIds
        }
      },
    });
  }
}
