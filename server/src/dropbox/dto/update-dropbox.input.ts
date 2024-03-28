import { CreateDropboxInput } from './create-dropbox.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDropboxInput extends PartialType(CreateDropboxInput) {
  @Field(() => Int)
  id: number;
}
