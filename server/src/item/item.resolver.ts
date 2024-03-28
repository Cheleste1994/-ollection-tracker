import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item, ItemsContainer, ItemsDelete } from './entities/item.entity';
import { CreateItemContainerInput, CreateItemInput } from './dto/create-item.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { BadRequestException } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => ItemsContainer, { name: 'createItemContainer' })
  @Auth()
  async createContainer(
    @CurrentUser() user: User,
    @Args('dto') dto: CreateItemContainerInput,
  ) {
    return this.itemService.createContainer(user.id, dto);
  }

  @Mutation(() => Item, { name: 'createItem' })
  @Auth()
  async createItem(@CurrentUser() user: User, @Args('dto') dto: CreateItemInput) {
    return this.itemService.createItem(user.id, dto);
  }

  @Query(() => [Item], { name: 'userItems' })
  @Auth()
  async userItems(@CurrentUser() user: User) {
    return this.itemService.userItems(user.id);
  }

  @Mutation(() => Item, { name: 'uploadItem' })
  @Auth()
  async uploadItem(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
    @Args('itemId') itemId: string,
  ) {
    try {
      const result = await this.itemService.uploadItem(itemId, file);
      return result;
    } catch {
      throw new BadRequestException();
    }
  }

  @Mutation(() => ItemsDelete, { name: 'deleteItems' })
  @Auth()
  async deleteItems(@Args('itemIds', { type: () => [String] }) itemIds: string[]) {
    if (itemIds[0] === '') return { isDelete: false };

    await this.itemService.deleteItem(itemIds);

    return { isDelete: true };
  }
}
