import { RegisterUserCredentials } from '../../types/models/create-user';
import apiCall from '../api.call';

class UserService {
  private static readonly baseRoute = 'Users';
  private static readonly apiCall = apiCall;

  public static async register(body: RegisterUserCredentials) {
    const res = await this.apiCall.post(`${this.baseRoute}/register`, body);
    return res.data;
  }
}

export default UserService;
