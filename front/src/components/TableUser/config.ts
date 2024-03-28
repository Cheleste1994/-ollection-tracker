import { Role, Status } from '@/types/user';

export enum COLUMNS_UID {
  userId = 'userId',
  name = 'name',
  age = 'age',
  role = 'role',
  email = 'email',
  status = 'status',
}

export type ENUM_COLUMNS_UID = keyof typeof COLUMNS_UID;

export const INITIAL_VISIBLE_COLUMNS = new Set([
  COLUMNS_UID.name,
  COLUMNS_UID.age,
  COLUMNS_UID.role,
  COLUMNS_UID.status,
  'actions',
]);

export const columns = [
  { name: 'ID', uid: COLUMNS_UID.userId, sortable: true },
  { name: 'NAME', uid: COLUMNS_UID.name, sortable: true },
  { name: 'AGE', uid: COLUMNS_UID.age, sortable: true },
  { name: 'ROLE', uid: COLUMNS_UID.role, sortable: true },
  { name: 'EMAIL', uid: COLUMNS_UID.email, sortable: true },
  { name: 'STATUS', uid: COLUMNS_UID.status, sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

type PropertyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export const statusOptions: Record<keyof typeof Status, PropertyColor> = {
  ACTIVE: 'success',
  PAUSED: 'danger',
  VACATION: 'warning',
};

export type StatusOptions = typeof statusOptions;

type RoleConfig = Role.ADMIN | Role.USER;

export const roleOptions: Record<RoleConfig, PropertyColor> = {
  ADMIN: 'default',
  USER: 'default',
};

export type RoleOptions = typeof roleOptions;
