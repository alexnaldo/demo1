import axios from 'axios';
import { User } from '../model';

const BASE_URL = 'http://10.0.2.2:3000';

class API {
  private static instance: API;

  private constructor() { }

  public static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  async getUsers(): Promise<User[]> {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  }

  async login(username: string): Promise<User | null | undefined> {
    const users = await this.getUsers();
    const user = users.find(user => user.name === username);
    return user;
  }
}

export default API;