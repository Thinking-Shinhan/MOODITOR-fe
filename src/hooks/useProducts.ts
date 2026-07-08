'use client';

import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import type { ProductListParams } from '@/types/product';

export const useProducts = (params: ProductListParams = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
  });
};
