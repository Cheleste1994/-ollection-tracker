import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { DropboxService } from './dropbox.service';
import { FileDownload } from './entities/dropbox.entity';

@Resolver('Dropbox')
export class DropboxResolver {
  constructor(private readonly dropboxService: DropboxService) {}

  @Query(() => [FileDownload], { name: 'filesDownload' })
  async filesDownload(@Args('arrId', { type: () => [String] }) id: string[]) {
    return this.dropboxService.filesDownload(id);
  }

  @Query(() => String, { name: 'temporaryLink' })
  async temporaryLink(@Args('id', { type: () => String }) id: string) {
    try {
      const result = await this.dropboxService.temporaryLink(id);
      if (result?.result) {
        return result.result.link;
      }

      throw new NotFoundException();
    } catch (error) {
      return error;
    }
  }

  @Query(() => String, { name: 'dbxAuth' })
  async dbxAuth() {
    const authUrl = await this.dropboxService.getAuthenticationUrl();

    return authUrl;
  }
}
