import { ObjectType, Field } from '@nestjs/graphql';
import { $Enums, Item as ItemPrisma } from '@prisma/client';
import { Category } from 'src/category/entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@ObjectType()
export class Item implements ItemPrisma {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  name: string;

  @Field(() => Category)
  category: Category;

  @Field()
  image: string;

  @Field()
  description: string;

  @Field(() => [Tag])
  tags: Tag[];

  @Field()
  userId: string;

  @Field()
  categoryId: string;

  @Field()
  status: $Enums.Status;
}

@ObjectType()
export class ItemsDelete {
  @Field(() => Boolean)
  isDelete: boolean;
}

@ObjectType()
export class ItemsContainer {
  @Field()
  userId: string;

  @Field()
  id: string;

  @Field()
  name: string;
}
