'use client';

import { useMutation } from '@tanstack/react-query';
import { autoPlacementService } from '@/services/autoPlacementService';

export const useAutoPlacement = () => {
  return useMutation({
    mutationFn: autoPlacementService.generate,
  });
};
