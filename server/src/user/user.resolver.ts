import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Prisma, User, Role} from 'prisma/generated/client/';


@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  user(@Args('id') id: string ) {
    return this.userService.user({ id });
  }

  @Query('users')
  users() {
    return this.userService.users();
  }

  @Mutation('createUser')
  createUser(@Args('dto') dto: CreateUserInput ) {
    return this.userService.createUser({
      ...dto,
      role: 'user',
    })
  }

  @Mutation('updateUser')
  updateUser(@Args('id') id: string, @Args('dto') dto: Partial<UpdateUserInput> ) {
    return this.userService.updateUser(id, dto)
  }
}
