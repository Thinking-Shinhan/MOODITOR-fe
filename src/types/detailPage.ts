import type { ProductGender } from '@/types/product';

export interface DetailPageProductMaterial {
  id: number;
  name: string;
  percent: number;
}

export interface DetailPageSizeMeasurement {
  id: number;
  part: string;
  name: string;
  value: number;
  unit: string;
}

export interface DetailPageProductSize {
  id: number;
  size: string;
  measurements: DetailPageSizeMeasurement[];
}

export interface DetailPageProduct {
  id: number;
  code: string;
  name: string;
  category: string;
  gender: ProductGender;
  color: string;
  price: number;
  fitDescription: string;
  description: string;
  fabricationDescription: string;
  lining: number;
  elasticity: number;
  transparency: number;
  touchFeeling: number;
  thickness: number;
  materials: DetailPageProductMaterial[];
  sizes: DetailPageProductSize[];
}

export interface DetailPageAsset {
  id: number;
  fileUrl: string;
  createdAt: string;
}

export interface DetailPageInitResponse {
  product: DetailPageProduct;
  assets: DetailPageAsset[];
}
