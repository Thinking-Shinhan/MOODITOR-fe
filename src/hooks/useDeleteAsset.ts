'use client';

import { useMutation } from '@tanstack/react-query';
import { assetService } from '@/services/assetService';

export const useDeleteAsset = () => {
  return useMutation({
    mutationFn: (assetId: number) => assetService.deleteAsset(assetId),
  });
};
