import { APIRequestContext } from '@playwright/test';

export class UsersService {
  private request: APIRequestContext;
  private readonly baseUrl = 'https://reqres.in/api';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getUsers(page: number) {
    return await this.request.get(`${this.baseUrl}/users?page=${page}`);
  }

  async createUser(name: string, job: string) {
    return await this.request.post(`${this.baseUrl}/users`, {
      data: { name, job },
    });
  }
}
