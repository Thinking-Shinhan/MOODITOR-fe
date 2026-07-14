import { apiClient } from '@/libs/apiClient';
import type { ImageFolderAssetsResponse } from '@/types/imageLibrary';

export const imageLibraryService = {
  getImageFolderAssets: (productId: number) =>
    apiClient.get<ImageFolderAssetsResponse>(
      `/library/image-folders/${productId}/assets`,
    ),
};
