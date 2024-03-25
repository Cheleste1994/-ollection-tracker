export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  AUTH = 'AUTH'
}

export enum Status {
  ACTIVE = 'success',
  PAUSED = 'danger',
  VACATION = 'warning',
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
  email?: Nullable<string>;
  password?: Nullable<string>;
  role?: Nullable<string>;
  status?: Nullable<string>;
}


export interface Auth {
  accessToken: string;
  user: User;
}

export interface User {
  createdAt: Date;
  email: string;
  id: string;
  password: string;
  role: Role;
  status: Status;
  updatedAt: Date;
}

export interface UserDelete {
  isCurrent: boolean;
  isDelete: boolean;
}

type Nullable<T> = T | null;
