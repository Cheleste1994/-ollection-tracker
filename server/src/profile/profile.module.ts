import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { PrismaService } from 'src/prisma.service';
import { DropboxModule } from 'src/dropbox/dropbox.module';

@Module({
  imports: [DropboxModule],
  providers: [ProfileResolver, ProfileService, PrismaService],
})
export class ProfileModule {}
