import { API_BASE_URL } from '../../config/api.config';
import { APIRequestContext } from '@playwright/test';

export class UsersService {
  constructor(private request: APIRequestContext) {}

  async getUsers(page: number) {
    const response = await this.request.get(
      `${API_BASE_URL}/users`
    );

    console.log('GET USERS STATUS:', response.status());
    console.log('GET USERS URL:', response.url());

    return response;
  }
}
