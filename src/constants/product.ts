import type { DropdownOption } from '@/components/commons/Dropdown';
import type { ProductGender } from '@/types/product';

export const PRODUCT_GENDER_LABEL: Record<ProductGender, string> = {
  F: '여성용',
  M: '남성용',
  U: '공용',
};

export const PRODUCT_CATEGORY_OPTIONS: DropdownOption[] = [
  { label: '상의', value: '상의' },
  { label: '하의', value: '하의' },
  { label: '셋업', value: '셋업' },
  { label: '악세서리', value: '악세서리' },
];

export const PRODUCT_COLOR_OPTIONS: DropdownOption[] = [
  { label: '화이트', value: '화이트' },
  { label: '블랙', value: '블랙' },
  { label: '멜란지그레이', value: '멜란지그레이' },
  { label: '차콜', value: '차콜' },
  { label: '블루', value: '블루' },
];

export const PRODUCT_GENDER_OPTIONS: DropdownOption[] = [
  { label: '여성용', value: 'F' },
  { label: '남성용', value: 'M' },
];
