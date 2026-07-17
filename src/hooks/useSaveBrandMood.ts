'use client';

import { useMutation } from '@tanstack/react-query';
import { brandMoodService } from '@/services/brandMoodService';

export const useSaveBrandMood = () => {
  return useMutation({
    mutationFn: brandMoodService.save,
  });
};
