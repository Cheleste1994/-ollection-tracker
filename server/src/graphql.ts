
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AuthDto {
    email: string;
    password: string;
}

export interface CreateUserInput {
    email: string;
    password: string;
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

export interface Country {
    createdAt: Date;
    currency: string;
    flag: string;
    id: string;
    isoCode: string;
    latitude: string;
    longitude: string;
    name: string;
    phonecode: string;
    timezones: Timezone[];
    updatedAt: Date;
}

export interface IMutation {
    createUser(dto: CreateUserInput): User | Promise<User>;
    updateProfile(dto: UpdateProfileInput): Profile | Promise<Profile>;
    updateUser(dto: UpdateUserInput, id: string): User | Promise<User>;
    uploadAvatar(file: Upload): Profile | Promise<Profile>;
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
    role: string;
    status: string;
    updatedAt: Date;
    userId: string;
}

export interface IQuery {
    countries(): Country[] | Promise<Country[]>;
    dbxAuth(): string | Promise<string>;
    filesDownload(id: string): string | Promise<string>;
    getNewTokens(): Auth | Promise<Auth>;
    login(dto: AuthDto): Auth | Promise<Auth>;
    logout(): boolean | Promise<boolean>;
    profileById(userId: string): Profile | Promise<Profile>;
    profileByToken(): Profile | Promise<Profile>;
    profiles(): ProfileWithUser[] | Promise<ProfileWithUser[]>;
    register(dto: AuthDto): Auth | Promise<Auth>;
    temporaryLink(id: string): string | Promise<string>;
    user(id: string): User | Promise<User>;
}

export interface Timezone {
    abbreviation: string;
    countryId: string;
    createdAt: Date;
    gmtOffset: number;
    gmtOffsetName: string;
    id: string;
    tzName: string;
    updatedAt: Date;
    zoneName: string;
}

export interface User {
    createdAt: Date;
    email: string;
    id: string;
    password: string;
    profile?: Nullable<Profile>;
    role: string;
    status: string;
    updatedAt: Date;
}

export type Upload = any;
type Nullable<T> = T | null;
