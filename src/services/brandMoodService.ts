import { apiClient } from '@/libs/apiClient';
import type {
  AnalyzeBrandMoodRequest,
  BrandMood,
  BrandMoodAnalysis,
  SaveBrandMoodRequest,
} from '@/types/onboarding';

export const brandMoodService = {
  // sourceUrl/sourceType/sourceText/customInstruction은 쿼리 파라미터이고,
  // file만 multipart body에 실린다 (Swagger 스펙 기준)
  analyze: (payload: AnalyzeBrandMoodRequest) => {
    const params = new URLSearchParams();
    params.append('sourceUrl', payload.sourceUrl);
    if (payload.sourceType) params.append('sourceType', payload.sourceType);
    if (payload.sourceText) params.append('sourceText', payload.sourceText);
    if (payload.customInstruction) {
      params.append('customInstruction', payload.customInstruction);
    }

    const formData = new FormData();
    if (payload.file) formData.append('file', payload.file);

    console.log('[brandMoodService.analyze] query params:', {
      sourceUrl: payload.sourceUrl,
      sourceType: payload.sourceType,
      sourceText: payload.sourceText,
      customInstruction: payload.customInstruction,
    });
    console.log('[brandMoodService.analyze] file:', payload.file ?? null);

    return apiClient.postForm<BrandMoodAnalysis>(
      `/brands/me/moods/analyze?${params.toString()}`,
      formData,
    );
  },

  save: (body: SaveBrandMoodRequest) =>
    apiClient.post<BrandMood>('/brands/me/moods', body),
};
