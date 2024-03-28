import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
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

  async users(): Promise<User[] | null> {
    return this.prisma.user.findMany();
  }

  async createUser(dto: CreateUserInput): Promise<User> {
    const data = {
      email: dto.email,
      password: await hash(dto.password),
      role: Role.USER,
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
}
