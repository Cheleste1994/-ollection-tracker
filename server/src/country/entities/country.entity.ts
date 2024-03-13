import { Timezone, Country as CountryPrisma } from "@prisma/client";

export class Country implements CountryPrisma {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isoCode: string;
  name: string;
  phonecode: string;
  flag: string;
  currency: string;
  latitude: string;
  longitude: string;

  timezones: Timezone[];
}
