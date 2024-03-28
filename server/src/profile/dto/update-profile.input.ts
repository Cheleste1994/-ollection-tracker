import { Field, InputType } from '@nestjs/graphql';

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
}
