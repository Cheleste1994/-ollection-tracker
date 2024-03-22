import { BadRequestException, Injectable } from '@nestjs/common';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile, ProfileWithUser } from './entities/profile.entity';
import { FileUpload } from 'graphql-upload';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private dropboxService: DropboxService,
  ) {}

  async getProfileByUserId(userId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }

  async profiles(): Promise<ProfileWithUser[]> {
    const profiles = await this.prisma.profile.findMany({
      include: {
        user: {
          select: {
            email: true,
            role: true,
            status: true
          }
        },
      },
    });

    return profiles.map(({ user, ...profile }) => ({ ...profile, ...user }));
  }

  async update(userId: string, dto: UpdateProfileInput): Promise<Profile> {
    const result = await this.prisma.profile.update({
      where: {
        userId,
      },
      data: {
        ...dto,
        countryId: dto.countryId ? dto.countryId : null,
      },
    });

    return result;
  }

  async uploadAvatar(userId: string, file: FileUpload) {
    try {
      const { id } = await this.dropboxService.uploadAvatar(userId, file);
      if (id) {
        return this.prisma.profile.update({
          where: {
            userId,
          },
          data: {
            avatar: id,
          },
        });
      }
      throw new BadRequestException();
    } catch {
      throw new BadRequestException();
    }
  }
}
