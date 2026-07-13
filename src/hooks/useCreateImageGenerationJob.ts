'use client';

import { useMutation } from '@tanstack/react-query';
import { imageGenerationService } from '@/services/imageGenerationService';
import type { CreateImageGenerationJobRequest } from '@/types/imageGenerationJob';

export const useCreateImageGenerationJob = () => {
  return useMutation({
    mutationFn: (payload: CreateImageGenerationJobRequest) =>
      imageGenerationService.createJob(payload),
  });
};
