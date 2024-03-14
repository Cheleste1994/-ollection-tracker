
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface AuthDto {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface CreateProfileInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    gender?: Nullable<string>;
    avatar?: Nullable<string>;
    about?: Nullable<string>;
    countryId?: Nullable<string>;
    userId: string;
}

export interface UpdateProfileInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    gender?: Nullable<string>;
    avatar?: Nullable<string>;
    about?: Nullable<string>;
    countryId?: Nullable<string>;
}

export interface CreateUserInput {
    email?: Nullable<string>;
    name?: Nullable<string>;
    password?: Nullable<string>;
}

export interface UpdateUserInput {
    email?: Nullable<string>;
    name?: Nullable<string>;
    password?: Nullable<string>;
    role?: Nullable<Role>;
}

export interface Auth {
    accessToken: string;
    user: User;
}

export interface IQuery {
    login(dto: AuthDto): Auth | Promise<Auth>;
    register(dto: AuthDto): Auth | Promise<Auth>;
    getNewTokens(): Auth | Promise<Auth>;
    logout(): boolean | Promise<boolean>;
    countries(): Nullable<Nullable<Country>[]> | Promise<Nullable<Nullable<Country>[]>>;
    profileById(userId: string): Nullable<Profile> | Promise<Nullable<Profile>>;
    profileByToken(): Nullable<Profile> | Promise<Nullable<Profile>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): User | Promise<User>;
}

export interface Timezone {
    id: string;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    zoneName?: Nullable<string>;
    gmtOffset?: Nullable<number>;
    gmtOffsetName?: Nullable<string>;
    abbreviation?: Nullable<string>;
    tzName?: Nullable<string>;
    countryId?: Nullable<string>;
}

export interface Country {
    id: string;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    isoCode?: Nullable<string>;
    name?: Nullable<string>;
    phonecode?: Nullable<string>;
    flag?: Nullable<string>;
    currency?: Nullable<string>;
    latitude?: Nullable<string>;
    longitude?: Nullable<string>;
    timezones?: Nullable<Nullable<Timezone>[]>;
}

export interface Profile {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    gender?: Nullable<string>;
    avatar?: Nullable<string>;
    about?: Nullable<string>;
    userId: string;
    countryId?: Nullable<string>;
}

export interface IMutation {
    createProfile(dto: CreateProfileInput): Profile | Promise<Profile>;
    updateProfile(dto: UpdateProfileInput): Profile | Promise<Profile>;
    createUser(dto: CreateUserInput): User | Promise<User>;
    updateUser(id: string, dto: UpdateUserInput): User | Promise<User>;
}

export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    role: Role;
    password: string;
}

type Nullable<T> = T | null;
