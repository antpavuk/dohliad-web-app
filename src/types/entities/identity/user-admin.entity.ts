import { UserRole } from '../../user-roles.enum';

interface UserAdmin {
  id: number;
  email: string;
  username: string;
  role: UserRole.Admin;
}

export default UserAdmin;
