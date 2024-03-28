import { Field, ObjectType } from '@nestjs/graphql';
import { Profile as ProfilePrisma } from '@prisma/client';

@ObjectType()
export class Profile implements ProfilePrisma {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  gender: string;

  @Field()
  avatar: string;

  @Field()
  about: string;

  @Field()
  userId: string;

  @Field(() => String, { nullable: true })
  countryId: string | null;
}
