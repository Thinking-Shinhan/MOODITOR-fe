import { apiClient } from '@/libs/apiClient';
import type { BrandMood } from '@/types/brand';

export const brandService = {
  getBrandMood: (brandId: number, brandMoodId: number) =>
    apiClient.get<BrandMood>(`/brands/${brandId}/moods/${brandMoodId}`),
};
