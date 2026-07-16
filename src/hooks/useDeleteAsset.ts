'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/assetService';

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assetId: number) => assetService.deleteAsset(assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
