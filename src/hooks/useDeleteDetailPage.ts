'use client';

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { imageLibraryService } from '@/services/imageLibraryService';
import type { DeleteDetailPageResponse } from '@/types/imageLibrary';

type DeleteDetailPageCallbacks<TContext = unknown> = Pick<
  UseMutationOptions<DeleteDetailPageResponse, unknown, number, TContext>,
  'onMutate' | 'onError' | 'onSettled'
>;

export const useDeleteDetailPage = <TContext = unknown>(
  options?: DeleteDetailPageCallbacks<TContext>,
) => {
  return useMutation({
    mutationFn: (productId: number) =>
      imageLibraryService.deleteDetailPage(productId),
    ...options,
  });
};
