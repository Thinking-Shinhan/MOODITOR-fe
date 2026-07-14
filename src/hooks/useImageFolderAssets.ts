'use client';

import { useQuery } from '@tanstack/react-query';
import { imageLibraryService } from '@/services/imageLibraryService';

export const useImageFolderAssets = (productId: number) => {
  return useQuery({
    queryKey: ['imageFolderAssets', productId],
    queryFn: () => imageLibraryService.getImageFolderAssets(productId),
  });
};
