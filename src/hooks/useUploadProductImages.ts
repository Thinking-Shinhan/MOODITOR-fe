'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/assetService';
import type { UploadProductImagesItem } from '@/services/assetService';

export const useUploadProductImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      items,
    }: {
      productId: number;
      items: UploadProductImagesItem[];
    }) => assetService.uploadProductImages(productId, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
