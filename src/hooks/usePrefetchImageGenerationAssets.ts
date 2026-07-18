'use client';

import { useEffect } from 'react';
import { useQueryClient, type QueryClient } from '@tanstack/react-query';
import { imageGenerationService } from '@/services/imageGenerationService';
import type { ReferenceAssetType } from '@/types/image';

const REFERENCE_ASSET_TYPES: ReferenceAssetType[] = [
  'MODEL',
  'BACKGROUND',
  'POSE',
  'SHOT_REFERENCE',
  'SHOT_TEMPLATE',
];

export const prefetchImageGenerationAssets = (queryClient: QueryClient) => {
  REFERENCE_ASSET_TYPES.forEach((assetType) => {
    queryClient.prefetchQuery({
      queryKey: ['referenceAssets', assetType],
      queryFn: () => imageGenerationService.getReferenceAssets(assetType),
    });
  });
};

export const usePrefetchImageGenerationAssets = (enabled: boolean) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;
    prefetchImageGenerationAssets(queryClient);
  }, [enabled, queryClient]);
};
