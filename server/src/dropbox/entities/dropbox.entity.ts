import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FileDownload {
  @Field(() => String)
  file: string;

  @Field(() => String)
  id: string;
}
