import CreateProduct from '../../types/models/create-product';
import BaseParams from '../../types/models/params/base-params';
import UpdateProduct from '../../types/models/update-product';
import apiCall from '../api.call';

class ProductService {
  private static readonly baseRoute = 'Products';
  private static readonly apiCall = apiCall;

  public static async getProducts(params: BaseParams) {
    return await this.apiCall.get(this.baseRoute, { params });
  }

  public static async getProduct(id: string) {
    return await this.apiCall.get(`${this.baseRoute}/${id}`);
  }

  public static async createProduct(body: CreateProduct) {
    return await this.apiCall.post(this.baseRoute, body);
  }

  public static async updateProduct({ id, ...body }: UpdateProduct) {
    return await this.apiCall.put(`${this.baseRoute}/${id}`, body);
  }

  public static async deleteProduct(id: string) {
    return await this.apiCall.delete(`${this.baseRoute}/${id}`);
  }
}

export default ProductService;
