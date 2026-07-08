// api 스팩 확정 후 변경 예정
export type SelectedProduct = {
  id: string;
  name: string;
  imageUrl?: string;
};

export type ProductGender = 'F' | 'M' | 'U';

export interface ProductListParams {
  category?: string;
  color?: string;
  gender?: ProductGender;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  gender: ProductGender;
  color: string;
  price: number;
  createdAt: string;
}

export interface ProductPage {
  content: Product[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface ProductListResponse {
  category: string | null;
  color: string | null;
  gender: ProductGender | null;
  keyword: string | null;
  products: ProductPage;
}
