import { Field, ObjectType } from '@nestjs/graphql';
import { $Enums, User as UserPrisma } from '@prisma/client';
import { Profile } from 'src/profile/entities/profile.entity';

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

  @Field()
  status: $Enums.Status;

  @Field({ nullable: true })
  profile?: Profile;
}

@ObjectType()
export class UserDelete {
  @Field(() => Boolean)
  isCurrent: boolean;

  @Field(() => Boolean)
  isDelete: boolean;
}
