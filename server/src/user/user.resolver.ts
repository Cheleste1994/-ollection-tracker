import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User, UserDelete } from './entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  @Auth()
  user(@Args('id') id: string) {
    return this.userService.user({ id });
  }

  @Mutation(() => User, { name: 'createUser' })
  @Auth()
  async createUser(@Args({ name: 'dto' }) dto: CreateUserInput): Promise<User> {
    return this.userService.createUser(dto);
  }

  @Mutation(() => User, { name: 'updateUser' })
  @Auth()
  updateUser(@Args('userId') userId: string, @Args('dto') dto: UpdateUserInput) {
    return this.userService.updateUser(userId, dto);
  }

  @Mutation(() => UserDelete, { name: 'deleteUser' })
  @Auth()
  async deleteUser(
    @CurrentUser() user: User,
    @Args('usersIds', { type: () => [String] }) usersIds: string[],
  ) {
    await this.userService.deleteUser(usersIds);
    return {
      isCurrent: usersIds.includes(user.id),
      isDelete: true,
    };
  }
}
