import { Role, Status } from "./user";

export type InputsContacts = {
  firstName: string;
  lastName: string;
  gender: string;
  countryId: string;
  about: string;
  age: string;
};

export interface CreateProfileInput {
  avatar: string;
  about: string;
  countryId: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface UpdateProfileInput {
  about?: Nullable<string>;
  age?: Nullable<number>;
  avatar?: Nullable<string>;
  countryId?: Nullable<string>;
  firstName?: Nullable<string>;
  gender?: Nullable<string>;
  lastName?: Nullable<string>;
}


export interface ProfileWithUser {
  about: string;
  age: number;
  avatar: string;
  countryId?: Nullable<string>;
  createdAt: Date;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  role: keyof typeof Role;
  status: keyof typeof Status;
  updatedAt: Date;
  userId: string;
}

export interface Profile {
  about: string;
  age: number;
  avatar: string;
  countryId?: Nullable<string>;
  createdAt: Date;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  updatedAt: Date;
  userId: string;
}

type Nullable<T> = T | null;
