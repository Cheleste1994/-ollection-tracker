import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'The email of the user' })
  email: string;

  @Field({ description: 'The password of the user' })
  password: string;
}
