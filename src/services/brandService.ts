import { apiClient } from '@/libs/apiClient';
import type { BrandMood } from '@/types/brand';

export const brandService = {
  getCurrentBrandMood: () =>
    apiClient.get<BrandMood>('/brands/me/moods/current'),
};
