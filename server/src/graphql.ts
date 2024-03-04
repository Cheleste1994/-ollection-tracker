
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

export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
    password: string;
    role: Role;
}

export interface IQuery {
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): User | Promise<User>;
}

export interface IMutation {
    createUser(dto: CreateUserInput): User | Promise<User>;
    updateUser(id: string, dto: UpdateUserInput): User | Promise<User>;
}

type Nullable<T> = T | null;
