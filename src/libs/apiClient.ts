import { env } from '@/config/env';

interface ApiErrorBody {
  error: {
    code: string;
    message: string;
  };
}

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    try {
      const body: ApiErrorBody = await response.json();
      throw new ApiError(body.error.code, body.error.message, response.status);
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw new ApiError('UNKNOWN_ERROR', response.statusText, response.status);
    }
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'GET' }),

  post: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  delete: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
