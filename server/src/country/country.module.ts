import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { DateScalar } from 'src/common/scalars/date.scalar';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CountryResolver, CountryService, PrismaService, DateScalar],
})
export class CountryModule {}
