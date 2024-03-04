import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma.service';
import { DateScalar } from 'src/common/scalars/date.scalar';

@Module({
  providers: [UserResolver, UserService, PrismaService, DateScalar],
})
export class UserModule {}
