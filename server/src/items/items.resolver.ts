import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Resolver('Item')
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation('createItem')
  create(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput);
  }

  @Query('items')
  findAll() {
    return this.itemsService.findAll();
  }

  @Query('item')
  findOne(@Args('id') id: number) {
    return this.itemsService.findOne(id);
  }

  @Mutation('updateItem')
  update(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation('removeItem')
  remove(@Args('id') id: number) {
    return this.itemsService.remove(id);
  }
}
