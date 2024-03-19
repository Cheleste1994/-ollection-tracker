import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDropboxInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
