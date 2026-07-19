'use client';

import { useQuery, type QueryClient } from '@tanstack/react-query';
import { imageLibraryService } from '@/services/imageLibraryService';

export const useImageFolderAssets = (productId: number) => {
  return useQuery({
    queryKey: ['imageFolderAssets', productId],
    queryFn: () => imageLibraryService.getImageFolderAssets(productId),
  });
};

export const prefetchImageFolderAssets = (
  queryClient: QueryClient,
  productId: number,
) => {
  queryClient.prefetchQuery({
    queryKey: ['imageFolderAssets', productId],
    queryFn: () => imageLibraryService.getImageFolderAssets(productId),
  });
};
