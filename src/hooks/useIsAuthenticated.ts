'use client';

import { useHomeSummary } from '@/hooks/useHomeSummary';
import { ApiError } from '@/libs/apiClient';

// GET /brands/me/home 의 401 응답을 로그인 여부 판단 기준으로 재사용
// 로딩 중에는 아직 알 수 없으므로 null을 반환
export const useIsAuthenticated = () => {
  const { error, isLoading } = useHomeSummary();

  if (isLoading) return { isAuthenticated: null, isLoading: true };

  const isUnauthorized = error instanceof ApiError && error.status === 401;
  return { isAuthenticated: !isUnauthorized, isLoading: false };
};
