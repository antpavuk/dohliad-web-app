import { AuthUserCredentials } from '../../types/models/auth-user';
import apiCall from '../api.call';
import TokenData from '../../types/token/token-data.type';

class AuthService {
  private static readonly baseRoute = 'Auth';
  private static readonly apiCall = apiCall;

  public static async login(body: AuthUserCredentials) {
    const res = await this.apiCall.post(`${this.baseRoute}/login`, body);
    return res;
  }

  public static async refreshToken(body: TokenData) {
    const res = await this.apiCall.post(`${this.baseRoute}/refreshToken`, body);

    return res;
  }

  public static async logout() {
    const res = await this.apiCall.post(`${this.baseRoute}/logout`);

    return res;
  }
}

export default AuthService;
