'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { ApiError } from '@/libs/apiClient';
import type { LoginRequest } from '@/types/auth';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.clear();
      router.push('/');
    },
    onError: (error) => {
      if (error instanceof ApiError) setServerError(error.message);
      else setServerError('오류가 발생했습니다.');
    },
  });

  const login = (data: LoginRequest) => {
    setServerError(null);
    mutate(data);
  };

  return { login, isPending, serverError };
};
