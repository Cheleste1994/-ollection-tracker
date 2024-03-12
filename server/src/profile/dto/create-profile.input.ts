import { IsUUID } from 'class-validator';
import { Profile } from '../entities/profile.entity';

export class CreateProfileInput
  implements Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>
{
  firstName: string;
  lastName: string;
  bio: string;

  @IsUUID()
  userId: string;
}
