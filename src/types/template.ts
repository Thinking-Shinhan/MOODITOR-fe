export type DetailTemplateCategory = 'IMAGE' | 'TEXT' | 'MATERIAL' | 'SIZE';

export type DetailTemplateType =
  | 'IMAGE_1_1'
  | 'IMAGE_1_2'
  | 'IMAGE_2_1'
  | 'IMAGE_2_2'
  | 'IMAGE_3_1'
  | 'IMAGE_3_2'
  | 'IMAGE_4_1'
  | 'IMAGE_4_2'
  | 'TEXT_1'
  | 'TEXT_2'
  | 'TEXT_3'
  | 'TEXT_4'
  | 'TEXT_5'
  | 'MATERIAL'
  | 'SIZE_TIP'
  | 'SIZE_INFO';

export interface DetailTemplate {
  id: string;
  type: DetailTemplateType;
  label: string;
}
