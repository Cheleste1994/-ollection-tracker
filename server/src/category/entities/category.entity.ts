import { ObjectType, Field } from '@nestjs/graphql';
import { Category as CategoryPrisma } from '@prisma/client';

@ObjectType()
export class Category implements CategoryPrisma {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  name: string;
}
