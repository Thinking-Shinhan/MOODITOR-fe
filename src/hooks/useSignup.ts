'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { ApiError } from '@/libs/apiClient';
import type { SignupRequest } from '@/types/auth';

export const useSignup = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: authService.signup,
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      if (error instanceof ApiError) setServerError(error.message);
      else setServerError('오류가 발생했습니다.');
    },
  });

  const signup = (data: SignupRequest) => {
    setServerError(null);
    mutate(data);
  };

  return { signup, isPending, serverError };
};
