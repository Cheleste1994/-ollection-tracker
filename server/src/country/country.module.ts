import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CountryResolver, CountryService, PrismaService],
})
export class CountryModule {}
