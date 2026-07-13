'use client';

import { useQuery } from '@tanstack/react-query';
import { brandService } from '@/services/brandService';

export const useCurrentBrandMood = () => {
  return useQuery({
    queryKey: ['currentBrandMood'],
    queryFn: () => brandService.getCurrentBrandMood(),
  });
};
