import { apiClient } from '@/libs/apiClient';
import type {
  CreateSheetConnectionRequest,
  SheetConnection,
} from '@/types/sheetConnection';

export const sheetConnectionService = {
  create: (body: CreateSheetConnectionRequest) =>
    apiClient.post<SheetConnection>('/sheet-connections', body),
};
