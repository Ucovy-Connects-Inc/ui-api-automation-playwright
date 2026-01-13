import { APIRequestContext } from '@playwright/test';

export class UsersService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getUsers(page: number) {
    return await this.request.get(`/users?page=${page}`);
  }

  async createUser(name: string, job: string) {
    return await this.request.post('/users', {
      data: { name, job },
    });
  }
}
