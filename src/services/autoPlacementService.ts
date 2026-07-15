import { apiClient } from '@/libs/apiClient';
import type {
  AutoPlacementRequest,
  AutoPlacementResponse,
} from '@/types/autoPlacement';

export const autoPlacementService = {
  generate: (payload: AutoPlacementRequest) =>
    apiClient.post<AutoPlacementResponse>('/detail-pages/auto-fill', payload),
};
