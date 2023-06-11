import { SkinType } from '../../skin-types.enum';
import { UserRole } from '../../user-roles.enum';

interface UserClient {
  id: string;
  email: string;
  username: string;
  skinTypes: SkinType[] | null;
  dateOfBirth: Date | null;
  role: UserRole.Client;
}

export default UserClient;
