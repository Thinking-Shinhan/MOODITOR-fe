'use client';

import { useEffect } from 'react';
import { useQueryClient, type QueryClient } from '@tanstack/react-query';
import { imageLibraryService } from '@/services/imageLibraryService';

export const prefetchLibraryFolders = (queryClient: QueryClient) => {
  queryClient.prefetchQuery({
    queryKey: ['imageFolders', null],
    queryFn: () => imageLibraryService.getImageFolders(undefined),
  });
};

export const usePrefetchLibraryFolders = (enabled: boolean) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;
    prefetchLibraryFolders(queryClient);
  }, [enabled, queryClient]);
};
