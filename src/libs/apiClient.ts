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
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      // FormData 요청은 브라우저가 boundary를 포함한 Content-Type을 직접 설정해야 하므로 생략
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
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

  const text = await response.text();
  return (text ? JSON.parse(text) : {}) as T;
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

  postForm: <T>(path: string, formData: FormData, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'POST', body: formData }),

  put: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  patch: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
