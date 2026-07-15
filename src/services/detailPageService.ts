import { apiClient } from '@/libs/apiClient';
import type { DetailPageInitResponse } from '@/types/detailPage';

export const detailPageService = {
  getInitData: (productId: number) =>
    apiClient.get<DetailPageInitResponse>(
      `/detail-pages/init?productId=${productId}`,
    ),
};
