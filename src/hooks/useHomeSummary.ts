'use client';

import { useQuery } from '@tanstack/react-query';
import { homeService } from '@/services/homeService';

export const useHomeSummary = () => {
  return useQuery({
    queryKey: ['homeSummary'],
    queryFn: homeService.getHome,
  });
};
