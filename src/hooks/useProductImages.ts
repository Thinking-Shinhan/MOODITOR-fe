'use client';

import { useQuery } from '@tanstack/react-query';
import { assetService } from '@/services/assetService';

export const useProductImages = (productId: number) => {
  return useQuery({
    queryKey: ['productImages', productId],
    queryFn: () => assetService.getProductImages(productId),
  });
};
