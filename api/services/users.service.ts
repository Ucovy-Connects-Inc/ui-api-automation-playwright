import { APIRequestContext } from '@playwright/test';

export class UsersService {
  constructor(private request: APIRequestContext) {}

  async getUsers(page: number) {
    const response = await this.request.get(
      `https://reqres.in/api/users?page=${page}`
    );

    console.log('GET USERS STATUS:', response.status());
    console.log('GET USERS URL:', response.url());

    return response;
  }
}
