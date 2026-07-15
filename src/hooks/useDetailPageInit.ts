'use client';

import { useQuery } from '@tanstack/react-query';
import { detailPageService } from '@/services/detailPageService';

export const useDetailPageInit = (productId: number | null) => {
  return useQuery({
    queryKey: ['detailPageInit', productId],
    queryFn: () => detailPageService.getInitData(productId as number),
    enabled: productId !== null,
  });
};
