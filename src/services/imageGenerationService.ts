import { apiClient } from '@/libs/apiClient';
import type {
  ReferenceAssetsResponse,
  ReferenceAssetType,
} from '@/types/image';
import type {
  CreateImageGenerationJobRequest,
  ImageGenerationJob,
} from '@/types/imageGenerationJob';

export const imageGenerationService = {
  getReferenceAssets: (assetType?: ReferenceAssetType) => {
    const query = assetType ? `?assetType=${assetType}` : '';
    return apiClient.get<ReferenceAssetsResponse>(
      `/image-generation/reference-assets${query}`,
    );
  },

  createJob: (payload: CreateImageGenerationJobRequest) =>
    apiClient.post<ImageGenerationJob>('/image-generation/jobs', payload),

  getJob: (jobId: number) =>
    apiClient.get<ImageGenerationJob>(`/image-generation/jobs/${jobId}`),
};
