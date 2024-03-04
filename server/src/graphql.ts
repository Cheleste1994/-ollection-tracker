
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

export interface IQuery {
    login(dto: AuthDto): Auth | Promise<Auth>;
    register(dto: AuthDto): Auth | Promise<Auth>;
    getNewTokens(): Auth | Promise<Auth>;
    logout(): boolean | Promise<boolean>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): User | Promise<User>;
}

export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
    role: Role;
}

export interface IMutation {
    createUser(dto: CreateUserInput): User | Promise<User>;
    updateUser(id: string, dto: UpdateUserInput): User | Promise<User>;
}

type Nullable<T> = T | null;
