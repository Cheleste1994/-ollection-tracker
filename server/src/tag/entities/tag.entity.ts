import { ObjectType, Field } from '@nestjs/graphql';
import { Tag as TagPrisma } from '@prisma/client';

@ObjectType()
export class Tag implements TagPrisma {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  name: string;

  @Field()
  itemId: string;
}
