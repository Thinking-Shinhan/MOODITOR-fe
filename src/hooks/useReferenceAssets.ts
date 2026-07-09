'use client';

import { useQuery } from '@tanstack/react-query';
import { imageGenerationService } from '@/services/imageGenerationService';
import type { ReferenceAssetType } from '@/types/image';

export const useReferenceAssets = (assetType?: ReferenceAssetType) => {
  return useQuery({
    queryKey: ['referenceAssets', assetType ?? 'ALL'],
    queryFn: () => imageGenerationService.getReferenceAssets(assetType),
  });
};
