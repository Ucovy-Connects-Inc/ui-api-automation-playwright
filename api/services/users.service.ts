import { ApiClient } from '../client/api-client';

export class UsersService extends ApiClient {

  async init() {
    await super.init('https://jsonplaceholder.typicode.com');
  }

  async getUsers() {
    // GET https://jsonplaceholder.typicode.com/users
    return await this.get('/users');
  }

  async createUser(name: string, job: string) {
    // POST https://jsonplaceholder.typicode.com/users
    return await this.post('/users', {
      name,
      job,
      email: 'rajesh@test.com'
    });
  }
}
