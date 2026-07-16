'use client';

import { useMutation } from '@tanstack/react-query';
import { detailPageService } from '@/services/detailPageService';

export const useSaveDetailPage = () => {
  return useMutation({
    mutationFn: ({ productId, file }: { productId: number; file: File }) =>
      detailPageService.save(productId, file),
  });
};
