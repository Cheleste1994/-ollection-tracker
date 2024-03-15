export type InputsContacts = {
  firstName: string;
  lastName: string;
  gender: string;
  countryId: string;
  about: string;
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
  avatar?: string;
  about?: string;
  countryId?: string | null;
  firstName?: string;
  lastName?: string;
  gender?: string;
}

export interface Profile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  gender: string;
  avatar: string;
  about: string;
  userId: string;
  countryId: string;
}

type Nullable<T> = T | null;
