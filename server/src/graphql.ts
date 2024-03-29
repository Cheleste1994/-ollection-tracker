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

export interface CreateItemContainerInput {
    category?: Nullable<string>;
    description?: Nullable<string>;
    image?: Nullable<string>;
    name?: Nullable<string>;
    status?: Nullable<string>;
    tags?: Nullable<string[]>;
    userId?: Nullable<string>;
}

export interface CreateItemInput {
    category: string;
    description?: Nullable<string>;
    image?: Nullable<string>;
    name: string;
    status?: Nullable<string>;
    tags?: Nullable<string[]>;
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
    status?: Nullable<string>;
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

export interface Category {
    createdAt: Date;
    id: string;
    name: string;
    updatedAt: Date;
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

export interface FileDownload {
    file: string;
    id: string;
}

export interface Item {
    category: Category;
    categoryId: string;
    createdAt: Date;
    description: string;
    id: string;
    image: string;
    name: string;
    status: string;
    tags: Tag[];
    updatedAt: Date;
    userId: string;
}

export interface ItemsContainer {
    id: string;
    name: string;
    userId: string;
}

export interface ItemsDelete {
    isDelete: boolean;
}

export interface IMutation {
    createItem(dto: CreateItemInput): Item | Promise<Item>;
    createItemContainer(dto: CreateItemContainerInput): ItemsContainer | Promise<ItemsContainer>;
    createUser(dto: CreateUserInput): User | Promise<User>;
    deleteItems(itemIds: string[]): ItemsDelete | Promise<ItemsDelete>;
    deleteUser(usersIds: string[]): UserDelete | Promise<UserDelete>;
    updateProfile(dto: UpdateProfileInput): Profile | Promise<Profile>;
    updateProfileByRole(dto: UpdateProfileInput, userId: string): Profile | Promise<Profile>;
    updateUser(dto: UpdateUserInput, userId: string): User | Promise<User>;
    uploadAvatar(file: Upload, userId: string): Profile | Promise<Profile>;
    uploadItem(file: Upload, itemId: string): Item | Promise<Item>;
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

export interface ProfileByRole {
    currentRole: string;
    profile: ProfileWithUser;
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
    category(): Category[] | Promise<Category[]>;
    countries(): Country[] | Promise<Country[]>;
    dbxAuth(): string | Promise<string>;
    filesDownload(arrId: string[]): FileDownload[] | Promise<FileDownload[]>;
    getNewTokens(): Auth | Promise<Auth>;
    login(dto: AuthDto): Auth | Promise<Auth>;
    logout(): boolean | Promise<boolean>;
    profileById(userId: string): Profile | Promise<Profile>;
    profileByRole(userId: string): ProfileByRole | Promise<ProfileByRole>;
    profileByToken(): ProfileWithUser | Promise<ProfileWithUser>;
    profiles(): ProfileWithUser[] | Promise<ProfileWithUser[]>;
    register(dto: AuthDto): Auth | Promise<Auth>;
    tags(): Tag[] | Promise<Tag[]>;
    temporaryLink(id: string): string | Promise<string>;
    user(id: string): User | Promise<User>;
    userItems(): Item[] | Promise<Item[]>;
}

export interface Tag {
    createdAt: Date;
    id: string;
    itemId: string;
    name: string;
    updatedAt: Date;
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

export interface UserDelete {
    isCurrent: boolean;
    isDelete: boolean;
}

export type Upload = any;
type Nullable<T> = T | null;
