import CreateRoutine from '../../types/models/create-routine';
import GenerateRoutineByQuiz from '../../types/models/generate-routine-by-quiz';
import apiCall from '../api.call';

class RoutineService {
  private static readonly baseRoute = 'Routines';
  private static readonly apiCall = apiCall;

  public static async getRoutines() {
    return await this.apiCall.get(this.baseRoute);
  }

  public static async getRoutine(id: string) {
    return await this.apiCall.get(`${this.baseRoute}/${id}`);
  }

  public static async createRoutine(body: CreateRoutine) {
    return await this.apiCall.post(this.baseRoute, body);
  }

  public static async generateRoutineByQuiz(body: GenerateRoutineByQuiz) {
    return await this.apiCall.post(`${this.baseRoute}/generate`, body);
  }

  //   public static async updateRoutine(id: string, body: any) {
  //     return await this.apiCall.put(`${this.baseRoute}/${id}`, body);
  //   }

  public static async deleteRoutine(id: string) {
    return await this.apiCall.delete(`${this.baseRoute}/${id}`);
  }
}

export default RoutineService;
