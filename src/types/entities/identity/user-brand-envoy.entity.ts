import { SkinType } from '../../skin-types.enum';
import { UserRole } from '../../user-roles.enum';
import Brand from '../brand.entity';

interface UserBrandEnvoy {
  id: string;
  email: string;
  username: string;
  isAuthorizedEnvoy: boolean;
  role: UserRole.BrandEnvoy;
  brand: Brand | null;
}

export default UserBrandEnvoy;
