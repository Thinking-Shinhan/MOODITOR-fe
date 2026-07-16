'use client';

import { useMutation } from '@tanstack/react-query';
import { imageLibraryService } from '@/services/imageLibraryService';

export const useDeleteDetailPage = () => {
  return useMutation({
    mutationFn: (productId: number) =>
      imageLibraryService.deleteDetailPage(productId),
  });
};
