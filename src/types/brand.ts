export interface BrandMoodAttributes {
  tone: string;
  colorTemperature: string;
  saturation: string;
  contrast: string;
  lighting: string;
  surface: string;
  backgroundMood: string;
  composition: string;
}

export interface BrandColor {
  name: string;
  hex: string;
}

export interface BrandColorPalette {
  primary: BrandColor[];
}

export interface BrandMood {
  brandMoodId: number;
  brandId: number;
  name: string;
  version: number;
  status: string;
  sourceType: string;
  sourceUrl: string;
  brandSummary: string;
  designPhilosophy: string;
  toneKeywords: string[];
  moodAttributes: BrandMoodAttributes;
  colorPalette: BrandColorPalette;
  negativeKeywords: string[];
  customBrandNote: string;
  brandInstruction: string;
  createdAt: string;
  updatedAt: string;
}
