import { Profile as ProfilePrisma } from '@prisma/client';
import { Country } from 'src/country/entities/country.entity';

export class Profile implements ProfilePrisma {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  gender: string;
  avatar: string;
  about: string;
  userId: string;
  countryId: string;
}
