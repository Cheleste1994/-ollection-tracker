import { InputType, Int, Field } from '@nestjs/graphql';
import { $Enums, Item as ItemPrisma } from '@prisma/client';

type Item = Omit<ItemPrisma, 'id' | 'createdAt' | 'updatedAt'>

@InputType()
export class CreateItemInput implements Partial<Item>{
  @Field(() => String, {nullable: false})
  name: string;

  @Field(() => String, {nullable: false})
  category: string;

  @Field(() => String, {nullable: true})
  image: string;

  @Field(() => String, {nullable: true})
  description: string;

  @Field(() => [String], {nullable: true})
  tags: string[];

  @Field(() => String, {nullable: true})
  status: $Enums.Status;
}

@InputType()
export class CreateItemContainerInput implements Partial<Item>{
  @Field(() => String, {nullable: true})
  name: string;

  @Field(() => String, {nullable: true})
  category: string;

  @Field(() => String, {nullable: true})
  image: string;

  @Field(() => String, {nullable: true})
  description: string;

  @Field(() => [String], {nullable: true})
  tags: string[];

  @Field(() => String, {nullable: true})
  userId: string;

  @Field(() => String, {nullable: true})
  status: $Enums.Status;
}
