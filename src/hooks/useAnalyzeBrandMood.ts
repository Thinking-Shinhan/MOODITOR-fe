'use client';

import { useMutation } from '@tanstack/react-query';
import { brandMoodService } from '@/services/brandMoodService';

export const useAnalyzeBrandMood = () => {
  return useMutation({
    mutationFn: brandMoodService.analyze,
  });
};
