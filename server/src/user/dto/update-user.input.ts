import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Role, Status } from '@prisma/client';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  role: Role;

  @Field({ nullable: true })
  status: Status;
}
