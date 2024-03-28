import { Field, ObjectType } from '@nestjs/graphql';
import { Timezone as TimezonePrisma, Country as CountryPrisma } from '@prisma/client';

@ObjectType()
export class Timezone implements TimezonePrisma {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  zoneName: string;

  @Field()
  gmtOffset: number;

  @Field()
  gmtOffsetName: string;

  @Field()
  abbreviation: string;

  @Field()
  tzName: string;

  @Field()
  countryId: string;
}

@ObjectType()
export class Country implements CountryPrisma {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  isoCode: string;

  @Field()
  name: string;

  @Field()
  phonecode: string;

  @Field()
  flag: string;

  @Field()
  currency: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field(() => [Timezone])
  timezones: Timezone[];
}
