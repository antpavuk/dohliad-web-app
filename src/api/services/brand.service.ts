import { GetBrandsParams } from '../../types/models/params/get-brands-params';
import apiCall from '../api.call';
import { CreateBrand } from '../../types/models/create-brand';
import { UpdateBrand } from '../../types/models/update-brand';

class BrandService {
  private static readonly baseRoute = 'Brands';
  private static readonly apiCall = apiCall;

  public static async getBrands(params: GetBrandsParams) {
    return await this.apiCall.get(this.baseRoute, {
      params
    });
  }

  public static async getBrand(id: string) {
    return await this.apiCall.get(`${this.baseRoute}/${id}`);
  }

  public static async createBrand(body: CreateBrand) {
    return await this.apiCall.post(`${this.baseRoute}`, body);
  }

  public static async updateBrand({ id, ...body }: UpdateBrand) {
    return await BrandService.apiCall.put(`${BrandService.baseRoute}/${id}`, body);
  }
}

export default BrandService;
