
export enum StatusItem {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
}

export interface Tag {
  createdAt: Date;
  itemId: string;
  name: string;
  updatedAt: Date;
  id: string;
}

export interface Item {
  category: string;
  categoryId: string;
  createdAt: Date;
  description: string;
  id: string;
  image: string;
  name: string;
  status: StatusItem;
  tags: Tag[];
  updatedAt: Date;
  userId: string;
}

export interface CreateItemInput {
  category?: Nullable<string>;
  description?: Nullable<string>;
  image?: Nullable<string>;
  name?: Nullable<string>;
  status?: Nullable<string>;
  tags?: Nullable<string[]>;
  userId?: Nullable<string>;
}

export interface CreateItemContainerInput {
  category?: Nullable<string>;
  description?: Nullable<string>;
  image?: Nullable<string>;
  name?: Nullable<string>;
  status?: Nullable<string>;
  tags?: Nullable<string[]>;
  userId?: Nullable<string>;
}

type Nullable<T> = T | null;
