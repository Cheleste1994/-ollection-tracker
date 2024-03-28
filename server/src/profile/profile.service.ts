import { BadRequestException, Injectable } from '@nestjs/common';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';
import { FileUpload } from 'graphql-upload';

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
