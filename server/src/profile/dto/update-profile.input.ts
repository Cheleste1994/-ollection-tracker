import { Field, InputType, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  about?: string;

  @Field({ nullable: true })
  countryId?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  status?: Status;

  @Field(() => Int, { nullable: true,  })
  age?: number;
}
