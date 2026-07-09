'use client';

import { useMutation } from '@tanstack/react-query';
import { assetService } from '@/services/assetService';
import type { UploadProductImagesItem } from '@/services/assetService';

export const useUploadProductImages = () => {
  return useMutation({
    mutationFn: ({
      productId,
      items,
    }: {
      productId: number;
      items: UploadProductImagesItem[];
    }) => assetService.uploadProductImages(productId, items),
  });
};
