'use client';

import { useMutation } from '@tanstack/react-query';
import { sheetConnectionService } from '@/services/sheetConnectionService';

export const useCreateSheetConnection = () => {
  return useMutation({
    mutationFn: sheetConnectionService.create,
  });
};
