import { apiClient } from '@/libs/apiClient';
import type { AssetRole, ProductImageAsset } from '@/types/asset';

export interface UploadProductImagesItem {
  file: File;
  role: AssetRole;
}

export const assetService = {
  uploadProductImages: (
    productId: number,
    items: UploadProductImagesItem[],
  ) => {
    const formData = new FormData();
    items.forEach(({ file, role }) => {
      formData.append('files', file);
      formData.append('roles', role);
    });

    return apiClient.postForm<ProductImageAsset[]>(
      `/assets/products/${productId}/images`,
      formData,
    );
  },
};
