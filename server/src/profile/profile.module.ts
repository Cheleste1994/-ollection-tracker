import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { DateScalar } from 'src/common/scalars/date.scalar';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ProfileResolver, ProfileService, PrismaService, DateScalar],
})
export class ProfileModule {}
