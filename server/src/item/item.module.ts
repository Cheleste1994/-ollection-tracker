import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { PrismaService } from 'src/prisma.service';
import { DropboxModule } from 'src/dropbox/dropbox.module';

@Module({
  imports: [DropboxModule],
  providers: [ItemResolver, ItemService, PrismaService],
})
export class ItemModule {}
