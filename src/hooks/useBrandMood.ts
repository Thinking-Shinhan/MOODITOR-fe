'use client';

import { useQuery } from '@tanstack/react-query';
import { brandService } from '@/services/brandService';

export const useBrandMood = (brandId: number, brandMoodId: number) => {
  return useQuery({
    queryKey: ['brandMood', brandId, brandMoodId],
    queryFn: () => brandService.getBrandMood(brandId, brandMoodId),
  });
};
