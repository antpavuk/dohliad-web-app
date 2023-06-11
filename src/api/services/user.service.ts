import { RegisterUserCredentials } from '../../types/models/create-user';
import { GetUsersParams } from '../../types/models/params/get-users';
import { UpdateUser } from '../../types/models/update-user';
import apiCall from '../api.call';

class UserService {
  private static readonly baseRoute = 'Users';
  private static readonly apiCall = apiCall;

  public static async register(body: RegisterUserCredentials) {
    const res = await this.apiCall.post(`${this.baseRoute}/register`, body);
    return res;
  }

  public static async getUsers({
    pageSize,
    pageNumber,
    isSortAscending,
    orderBy,
    filterField,
    filterValue
  }: GetUsersParams) {
    const res = await this.apiCall.get(`${this.baseRoute}`, {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
        IsSortAscending: isSortAscending,
        OrderBy: orderBy,
        FilterField: filterField,
        FilterValue: filterValue
      }
    });

    return res;
  }

  public static async getBrandEnvoyUsers() {
    const res = await this.apiCall.get(`${this.baseRoute}/brand-envoys`);
    return res;
  }

  public static async getCurrentUser() {
    const res = await this.apiCall.get(`${this.baseRoute}/current`);
    return res;
  }

  public static async updateUser({ id, ...body }: UpdateUser) {
    const res = await this.apiCall.put(`${this.baseRoute}/${id}`, body);
    return res;
  }

  public static async authorizeEnvoy(userId: string) {
    const res = await this.apiCall.put(`${this.baseRoute}/authorize-envoy/${userId}`);
    return res;
  }

  public static async assignBrandToCurrentEnvoy(brandId: string) {
    // backend route includes brandId after /Users
    const res = await this.apiCall.put(`${this.baseRoute}/${brandId}/assign`);
    return res;
  }
}

export default UserService;
