'use client';

import { useMutation } from '@tanstack/react-query';
import { imageLibraryService } from '@/services/imageLibraryService';

export const useToggleAssetLike = () => {
  return useMutation({
    mutationFn: (assetId: number) => imageLibraryService.toggleLike(assetId),
  });
};
