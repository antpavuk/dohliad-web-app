import { AuthUserCredentials } from '../../types/models/auth-user';
import apiCall from '../api.call';
import TokenData from '../../types/token/token-data.type';

class AuthService {
  private static readonly baseRoute = 'Auth';
  private static readonly apiCall = apiCall;

  public static async login(body: AuthUserCredentials) {
    return await this.apiCall.post(`${this.baseRoute}/login`, body);
  }

  public static async refreshToken(body: TokenData) {
    return await this.apiCall.post(`${this.baseRoute}/refreshToken`, body);
  }

  public static async logout() {
    return await this.apiCall.post(`${this.baseRoute}/logout`);
  }
}

export default AuthService;
