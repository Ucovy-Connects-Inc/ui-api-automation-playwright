import { APIRequestContext, request } from '@playwright/test';

export class ApiClient {
  protected context!: APIRequestContext;

  async init(baseURL: string, headers?: Record<string, string>) {
    this.context = await request.newContext({
      baseURL,   // ✅ THIS MUST BE SET
      extraHTTPHeaders: headers || {
        'Content-Type': 'application/json',
      },
    });
  }

  async get(url: string) {
    return await this.context.get(url);
  }

  async post(url: string, data: any) {
    return await this.context.post(url, { data });
  }

  async put(url: string, data: any) {
    return await this.context.put(url, { data });
  }

  async delete(url: string) {
    return await this.context.delete(url);
  }
}
