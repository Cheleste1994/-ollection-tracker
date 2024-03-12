
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    administrator = "administrator",
    moderator = "moderator",
    user = "user"
}

export interface AuthDto {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

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
    profile(userId: string): Nullable<Profile> | Promise<Nullable<Profile>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): User | Promise<User>;
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
