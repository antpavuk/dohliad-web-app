import { CreateIngredient } from '../../types/models/create-ingredient';
import BaseParams from '../../types/models/params/base-params';
import apiCall from '../api.call';

class IngredientService {
  private static readonly baseRoute = 'Ingredients';
  private static readonly apiCall = apiCall;

  public static async getIngredients(params: BaseParams) {
    return await this.apiCall.get(this.baseRoute, {
      params
    });
  }

  public static async getIngredient(id: string) {
    return await this.apiCall.get(`${this.baseRoute}/${id}`);
  }

  public static async createIngredient(body: CreateIngredient) {
    return await this.apiCall.post(this.baseRoute, body);
  }

  // public static async updateIngredient(id: string, body: any) {
  //   return await this.apiCall.put(`${this.baseRoute}/${id}`, body);
  // }

  // public static async deleteIngredient(id: string) {
  //   return await this.apiCall.delete(`${this.baseRoute}/${id}`);
  // }
}

export default IngredientService;
