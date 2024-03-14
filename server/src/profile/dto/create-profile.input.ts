import { IsUUID } from 'class-validator';
import { Country } from 'src/country/entities/country.entity';
import { Profile } from '../entities/profile.entity';

export class CreateProfileInput
  implements Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>
{
  avatar: string;
  about: string;
  countryId: string;
  firstName: string;
  lastName: string;
  gender: string;

  @IsUUID()
  userId: string;
}
