import { CreateProfileInput } from './create-profile.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';



export class UpdateProfileInput extends PartialType(CreateProfileInput) {

  @IsUUID()
  userId: string;
}
