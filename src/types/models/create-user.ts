import { SkinType } from '../skin-types.enum';
import CreateUserRole from './enums/create-user-role';

export interface RegisterClientUserCredentials {
  email: string;
  password: string;
  username: string;
  skinTypes: SkinType[];
  dateOfBirth: Date;
  role: CreateUserRole.Client;
}

export interface RegisterBrandEnvoyUserCredentials {
  email: string;
  password: string;
  username: string;
  brandId?: string;
  role: CreateUserRole.BrandEnvoy;
}

export type RegisterUserCredentials =
  | RegisterClientUserCredentials
  | RegisterBrandEnvoyUserCredentials;
