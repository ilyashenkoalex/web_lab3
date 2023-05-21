import axios from 'axios';

class Api {
  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost/silex/rest',
    });
  }
  async rest(method, options) {
    const response = await this.client.request({ url: method, ...options });
    return response.data;
  }
}
export default Api;
