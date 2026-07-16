'use client';

import { useQuery } from '@tanstack/react-query';
import { imageLibraryService } from '@/services/imageLibraryService';

export const useImageFolders = (category?: string) => {
  return useQuery({
    queryKey: ['imageFolders', category ?? null],
    queryFn: () => imageLibraryService.getImageFolders(category),
  });
};
