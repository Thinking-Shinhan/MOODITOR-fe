'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';

export const useLogout = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      router.push('/login');
    },
  });

  return { logout: mutate, isPending };
};
