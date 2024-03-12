import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async create(createProfileInput: CreateProfileInput): Promise<Profile> {
    return this.prisma.profile.create({
      data: createProfileInput,
    });
  }

  async getProfile(userId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }

  update({ userId, ...data }: UpdateProfileInput) {
    return this.prisma.profile.update({
      where: {
        userId,
      },
      data,
    });
  }
}
