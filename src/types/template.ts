export type DetailTemplateType = 'IMAGE_2COL' | 'IMAGE_3COL' | 'TEXT_1COL';

export interface DetailTemplate {
  id: string;
  type: DetailTemplateType;
  label: string;
}
