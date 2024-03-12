import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Role } from 'prisma/generated/client';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  @Field()
  role: Role;
}
