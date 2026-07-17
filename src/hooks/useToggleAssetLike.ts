'use client';

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { imageLibraryService } from '@/services/imageLibraryService';
import type { AssetLikeResponse } from '@/types/imageLibrary';

type ToggleAssetLikeCallbacks<TContext = unknown> = Pick<
  UseMutationOptions<AssetLikeResponse, unknown, number, TContext>,
  'onMutate' | 'onError' | 'onSettled'
>;

export const useToggleAssetLike = <TContext = unknown>(
  options?: ToggleAssetLikeCallbacks<TContext>,
) => {
  return useMutation({
    mutationFn: (assetId: number) => imageLibraryService.toggleLike(assetId),
    ...options,
  });
};
