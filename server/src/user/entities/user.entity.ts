import { $Enums, User as UserPrisma } from '@prisma/client';

export class User implements UserPrisma {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  role: $Enums.Role;
}
