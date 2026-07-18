'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { imageGenerationService } from '@/services/imageGenerationService';
import type { ReferenceAssetType } from '@/types/image';

const REFERENCE_ASSET_TYPES: ReferenceAssetType[] = [
  'MODEL',
  'BACKGROUND',
  'POSE',
  'SHOT_REFERENCE',
  'SHOT_TEMPLATE',
];

export const usePrefetchImageGenerationAssets = (enabled: boolean) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    REFERENCE_ASSET_TYPES.forEach((assetType) => {
      queryClient.prefetchQuery({
        queryKey: ['referenceAssets', assetType],
        queryFn: () => imageGenerationService.getReferenceAssets(assetType),
      });
    });
  }, [enabled, queryClient]);
};
