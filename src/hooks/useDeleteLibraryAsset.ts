'use client';

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { imageLibraryService } from '@/services/imageLibraryService';
import type { DeleteLibraryAssetResponse } from '@/types/imageLibrary';

type DeleteLibraryAssetCallbacks<TContext = unknown> = Pick<
  UseMutationOptions<DeleteLibraryAssetResponse, unknown, number, TContext>,
  'onMutate' | 'onError' | 'onSettled'
>;

export const useDeleteLibraryAsset = <TContext = unknown>(
  options?: DeleteLibraryAssetCallbacks<TContext>,
) => {
  return useMutation({
    mutationFn: (assetId: number) => imageLibraryService.deleteAsset(assetId),
    ...options,
  });
};
