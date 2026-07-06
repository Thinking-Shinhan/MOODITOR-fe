import { apiClient } from '@/libs/apiClient';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/auth';

export const authService = {
  signup: (body: SignupRequest) =>
    apiClient.post<SignupResponse>('/auth/register', body),

  login: (body: LoginRequest) =>
    apiClient.post<LoginResponse>('/auth/login', body),
};
