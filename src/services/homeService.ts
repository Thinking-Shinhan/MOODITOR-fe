import { apiClient } from '@/libs/apiClient';
import type { HomeSummary } from '@/types/home';

export const homeService = {
  getHome: () => apiClient.get<HomeSummary>('/brands/me/home'),
};
