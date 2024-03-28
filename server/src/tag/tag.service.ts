import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async tags() {
    return this.prisma.tag.findMany();
  }
}
