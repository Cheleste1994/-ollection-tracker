import { Field, ObjectType } from '@nestjs/graphql';
import { $Enums, User as UserPrisma } from '@prisma/client';

@ObjectType()
export class User implements UserPrisma {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: $Enums.Role;
}
