import { Field, InputType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role'>
{
  @Field()
  email: string;

  @Field()
  password: string;
}
