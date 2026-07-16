export interface SignupRequest {
  loginId: string;
  name: string;
  password: string;
  passwordConfirm: string;
  brandName: string;
}

export interface SignupResponse {
  userId: number;
  loginId: string;
  name: string;
  brandId: number;
  brandName: string;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export type LoginResponse = Record<string, never>;

export type LogoutResponse = Record<string, never>;

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
