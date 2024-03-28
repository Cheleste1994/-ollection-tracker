import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Dropbox from 'dropbox';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class DropboxService {
  private redirectUri = `http://${this.configService.get('BASE_DOMAIN')}:${this.configService.get('PORT')}/dropbox-auth`;

  private dbxAuth: Dropbox.DropboxAuth;
  private dbx: Dropbox.Dropbox;

  constructor(private configService: ConfigService) {
    this.dbxAuth = new Dropbox.DropboxAuth({
      clientId: this.configService.get('DROPBOX_KEY'),
      clientSecret: this.configService.get('DROPBOX_SECRET'),
      refreshToken: this.configService.get('DROPBOX_RESRESH_TOKEN'),
    });

    this.dbx = new Dropbox.Dropbox({
      accessToken: this.configService.get('DROPBOX_ACCESS_TOKEN'),
      refreshToken: this.configService.get('DROPBOX_RESRESH_TOKEN'),
    });
  }

  async getAuthenticationUrl() {
    const url = await this.dbxAuth.getAuthenticationUrl(
      this.redirectUri,
      null,
      'code',
      'offline',
      null,
      'none',
      false,
    );

    return url;
  }

  async temporaryLink(id: string) {
    const result = await this.dbx.filesGetTemporaryLink({ path: id });

    return result;
  }

  async filesDownload(id: string) {
    const data = await this.dbx.filesDownload({ path: id });

    const fileContent: Buffer = (<any>data).result.fileBinary;

    return 'data:image/jpeg;base64,' + fileContent.toString('base64');
  }

  async uploadAvatar(id: string, file: FileUpload) {
    try {
      const { filename, createReadStream } = await file;

      const stream = createReadStream();
      const {
        result: { id },
      } = await this.dbx.filesUpload({
        path: '/avatar/' + filename,
        contents: stream,
      });

      return { id, error: '' };
    } catch (error) {
      return { id: null, error: error.message };
    }
  }
}
