import { Module } from '@nestjs/common';
import { DropboxService } from './dropbox.service';
import { DropboxResolver } from './dropbox.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DropboxResolver, DropboxService],
  exports: [DropboxService],
})
export class DropboxModule {}
