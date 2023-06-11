import { SkinType } from '../skin-types.enum';

export interface UpdateUserClient {
  id: string;
  email?: string;
  password?: string;
  username?: string;
  skinTypes?: SkinType[];
  dateOfBirth?: Date;
}

export interface UpdateUserBrandEnvoy {
  id: string;
  email?: string;
  password?: string;
  username?: string;
  brandId?: string;
}

export type UpdateUser = UpdateUserClient | UpdateUserBrandEnvoy;
