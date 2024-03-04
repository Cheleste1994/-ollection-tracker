import { Field, InputType } from '@nestjs/graphql';
import { Prisma, Role } from 'prisma/generated/client';

@InputType()
export class UpdateUserInput {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  role: Role
}
