import { Profile as ProfilePrisma } from "prisma/generated/client";

export class Profile implements ProfilePrisma {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  bio: string;
  userId: string;
}


