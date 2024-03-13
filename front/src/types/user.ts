export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface AuthDto {
  email: Nullable<string>;
  password: Nullable<string>;
}

export interface CreateUserInput {
  email?: Nullable<string>;
  name?: Nullable<string>;
  password?: Nullable<string>;
}

export interface UpdateUserInput {
  name?: Nullable<string>;
  password?: Nullable<string>;
  role?: Nullable<Role>;
}

export interface Auth {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  role: Role;
  password: string;
}

type Nullable<T> = T | null;
