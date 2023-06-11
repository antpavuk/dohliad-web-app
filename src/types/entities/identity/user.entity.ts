import UserAdmin from './user-admin.entity';
import UserBrandEnvoy from './user-brand-envoy.entity';
import UserClient from './user-client.entity';

type User = UserClient | UserBrandEnvoy | UserAdmin;

export default User;
