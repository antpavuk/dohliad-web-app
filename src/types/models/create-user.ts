import { SkinType } from '../skin-types.enum';
import { UserRole } from '../user-roles.enum';

export interface RegisterClientUserCredentials {
  email: string;
  password: string;
  username: string;
  skinTypes: SkinType[];
  dateOfBirth: Date;
  role: UserRole.Client;
}

export interface RegisterBrandEnvoyUserCredentials {
  email: string;
  password: string;
  username: string;
  brandId?: string;
  role: UserRole.BrandEnvoy;
}

export type RegisterUserCredentials =
  | RegisterClientUserCredentials
  | RegisterBrandEnvoyUserCredentials;
