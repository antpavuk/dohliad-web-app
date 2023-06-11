import apiCall from '../api.call';

class CountryService {
  private static readonly baseRoute = 'Countries';
  private static readonly apiCall = apiCall;

  public static async getCountries() {
    return await this.apiCall.get(this.baseRoute);
  }
}

export default CountryService;
