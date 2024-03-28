import { Field, Int, ObjectType } from '@nestjs/graphql';
import { $Enums, Profile as ProfilePrisma } from '@prisma/client';

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

  @Field(() => Int)
  age: number;

  @Field(() => String, { nullable: true })
  countryId: string | null;
}

@ObjectType()
export class ProfileWithUser implements ProfilePrisma {
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

  @Field(() => Int)
  age: number;

  @Field(() => String, { nullable: true })
  countryId: string | null;

  @Field()
  email: string;

  @Field()
  role: $Enums.Role;

  @Field()
  status: $Enums.Status;
}

@ObjectType()
export class ProfileByRole {
  @Field(() => String)
  currentRole: $Enums.Role;

  @Field(() => ProfileWithUser)
  profile: ProfileWithUser;
}
