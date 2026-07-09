import { apiClient } from '@/libs/apiClient';
import type {
  ReferenceAssetsResponse,
  ReferenceAssetType,
} from '@/types/imageGeneration';

export const imageGenerationService = {
  getReferenceAssets: (assetType?: ReferenceAssetType) => {
    const query = assetType ? `?assetType=${assetType}` : '';
    return apiClient.get<ReferenceAssetsResponse>(
      `/image-generation/reference-assets${query}`,
    );
  },
};
