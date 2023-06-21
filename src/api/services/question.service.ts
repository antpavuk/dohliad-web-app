import apiCall from '../api.call';

class QuestionService {
  private static readonly baseRoute = 'Questions';
  private static readonly apiCall = apiCall;

  public static async getQuestions() {
    return await this.apiCall.get(this.baseRoute);
  }
}

export default QuestionService;
