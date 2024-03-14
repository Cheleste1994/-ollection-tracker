export type InputsContatcs = {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  about: string;
};

export interface CreateProfileInput {
  firstName: string;
  lastName: string;
  bio: string;
  userId: string;
}

export interface UpdateProfileInput {
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  bio?: Nullable<string>;
  userId: string;
}


export interface Profile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  bio?: Nullable<string>;
  userId: string;
}

type Nullable<T> = T | null;
