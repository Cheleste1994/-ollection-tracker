import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  @Auth()
  user(@Args('id') id: string) {
    return this.userService.user({ id });
  }

  @Query('users')
  users() {
    return this.userService.users();
  }

  @Mutation('createUser')
  @Auth()
  createUser(@Args('dto') dto: CreateUserInput) {
    return this.userService.createUser(dto);
  }

  @Mutation('updateUser')
  @Auth()
  updateUser(@Args('id') id: string, @Args('dto') dto: UpdateUserInput) {
    return this.userService.updateUser(id, dto);
  }
}
