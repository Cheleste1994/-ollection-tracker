export interface Item {
  createdAt: Date;
  updatedAt: Date;
  id: string;

  name: string;
  category: string;
  image: string;
  userId: string;
  status: string;
  description: string;
  tags: string[];

}
