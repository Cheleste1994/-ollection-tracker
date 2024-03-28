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
  countryId?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
}

export interface Profile {
  about: string;
  avatar: string;
  countryId?: string | null;
  createdAt: Date;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  updatedAt: Date;
  userId: string;
}

type Nullable<T> = T | null;
