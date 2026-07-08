import { apiClient } from '@/libs/apiClient';
import type { ProductListParams, ProductListResponse } from '@/types/product';

function buildProductQuery(params: ProductListParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export const productService = {
  getProducts: (params: ProductListParams = {}) =>
    apiClient.get<ProductListResponse>(`/products${buildProductQuery(params)}`),
};
