'use client';

import { useMutation } from '@tanstack/react-query';
import { imageLibraryService } from '@/services/imageLibraryService';

export const useDeleteLibraryAsset = () => {
  return useMutation({
    mutationFn: (assetId: number) => imageLibraryService.deleteAsset(assetId),
  });
};
