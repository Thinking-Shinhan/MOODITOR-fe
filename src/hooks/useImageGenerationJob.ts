'use client';

import { useQuery } from '@tanstack/react-query';
import { imageGenerationService } from '@/services/imageGenerationService';
import type { ImageGenerationJobStatus } from '@/types/imageGenerationJob';

const POLLING_INTERVAL_MS = 2000;
const POLLING_STATUSES: ImageGenerationJobStatus[] = ['PENDING', 'PROCESSING'];

export const useImageGenerationJob = (jobId: number | null) => {
  return useQuery({
    queryKey: ['imageGenerationJob', jobId],
    queryFn: () => imageGenerationService.getJob(jobId as number),
    enabled: jobId !== null,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status && POLLING_STATUSES.includes(status)
        ? POLLING_INTERVAL_MS
        : false;
    },
  });
};
