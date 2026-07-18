export interface BrandMoodAnalysis {
  sourceType: string;
  sourceUrl: string;
  brandName: string;
  brandSummary: string;
  designPhilosophy: string;
  brandTone: string[];
  colorTemperature: string;
  saturation: string;
  contrast: string;
  lighting: string;
  surfaceTexture: string;
  backgroundMood: string;
  composition: string;
  primaryColors: string[];
  avoidElements: string[];
  customBrandNote: string;
  rawAnalysisJson: string;
}

export interface AnalyzeBrandMoodRequest {
  sourceUrl: string;
  sourceType?: string;
  sourceText?: string;
  customInstruction?: string;
  file?: File;
}

export interface SaveBrandMoodRequest {
  name: string;
  sourceType: string;
  sourceUrl: string;
  brandSummary: string;
  designPhilosophy: string;
  brandTone: string[];
  colorTemperature: string;
  saturation: string;
  contrast: string;
  lighting: string;
  surfaceTexture: string;
  backgroundMood: string;
  composition: string;
  primaryColors: string[];
  avoidElements: string[];
  customBrandNote: string;
  brandInstruction: string;
  rawAnalysisJson: string;
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
  brandTone: string[];
  colorTemperature: string;
  saturation: string;
  contrast: string;
  lighting: string;
  surfaceTexture: string;
  backgroundMood: string;
  composition: string;
  primaryColors: string[];
  avoidElements: string[];
  customBrandNote: string;
  brandInstruction: string;
  createdAt: string;
  updatedAt: string;
}
