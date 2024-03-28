import { UseGuards } from '@nestjs/common';
import { DbxAuthGuard } from '../guards/dbx.guard';

export const AuthDbx = () => UseGuards(DbxAuthGuard);
