'use client';

import { useMutation } from '@tanstack/react-query';
import { detailPageService } from '@/services/detailPageService';

export const useReviewCopy = () => {
  return useMutation({
    mutationFn: detailPageService.reviewCopy,
  });
};
