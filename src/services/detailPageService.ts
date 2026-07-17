import { apiClient } from '@/libs/apiClient';
import type {
  DetailPageInitResponse,
  DetailPageSaveResponse,
} from '@/types/detailPage';
import type { ReviewCopyRequest, ReviewCopyResponse } from '@/types/reviewCopy';

export const detailPageService = {
  getInitData: (productId: number) =>
    apiClient.get<DetailPageInitResponse>(
      `/detail-pages/init?productId=${productId}`,
    ),

  save: (productId: number, file: File) => {
    const formData = new FormData();
    formData.append('productId', String(productId));
    formData.append('file', file);

    return apiClient.postForm<DetailPageSaveResponse>(
      '/detail-pages',
      formData,
    );
  },

  reviewCopy: (payload: ReviewCopyRequest) =>
    apiClient.post<ReviewCopyResponse>('/detail-pages/review-copy', payload),
};
