export type CutType = 'MODEL_CUT' | 'PRODUCT_CUT';
export type GenerationMode = 'PARALLEL';

export type ImageGenerationJobStatus =
  'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED';

export type ColorTemperature = 'WARM' | 'NEUTRAL' | 'COOL';
export type CameraAngle =
  | 'EYE_LEVEL_FRONT'
  | 'LEFT_THREE_QUARTER_45'
  | 'RIGHT_THREE_QUARTER_45'
  | 'BACK_VIEW';
export type Framing =
  'FULL_BODY' | 'THREE_QUARTER_BODY' | 'HALF_BODY' | 'CLOSE_UP' | 'WIDE_MARGIN';
export type RequestAspectRatio =
  | 'RATIO_1_1'
  | 'RATIO_2_3'
  | 'RATIO_3_4'
  | 'RATIO_4_5'
  | 'RATIO_16_9'
  | 'RATIO_9_16';

export type OutfitItemRole = 'PRIMARY' | 'STYLING';

export interface OutfitItem {
  role: OutfitItemRole;
  productId: number;
  assetIds: number[];
}

export interface ModelCutUserOptions {
  colorTemperature: ColorTemperature | null;
  cameraAngle: CameraAngle | null;
  framing: Framing | null;
  aspectRatio: RequestAspectRatio | null;
}

export interface ProductCutUserOptions {
  colorTemperature: ColorTemperature | null;
  aspectRatio: RequestAspectRatio | null;
}

export interface ModelCutReference {
  outfitItems: OutfitItem[];
  modelReferenceId: number | null;
  poseReferenceId: number | null;
  backgroundReferenceId: number | null;
}

export interface ProductCutReference {
  productImages: number[];
  backgroundReferenceId: number | null;
  shotReferenceIds: number[];
}

export interface CreateImageGenerationJobRequest {
  productId: number;
  cutType: CutType;
  generationMode: GenerationMode;
  requestedCount: number;
  prompt: string;
  userOptionsJson: ModelCutUserOptions | ProductCutUserOptions;
  referenceJson: ModelCutReference | ProductCutReference;
}

export interface ImageGenerationResult {
  resultId: number;
  assetId: number;
  outputIndex: number;
  status: string;
  imageUrl: string | null;
  imageBase64: string | null;
}

export type ImageGenerationProgressItemStatus =
  'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface ImageGenerationProgressItem {
  outputIndex: number;
  status: ImageGenerationProgressItemStatus;
  message: string | null;
}

export interface ImageGenerationJob {
  jobId: number;
  status: ImageGenerationJobStatus;
  cutType: CutType;
  generationMode: GenerationMode;
  aiName: string;
  requestedCount: number;
  outputCount: number;
  latencyMs: number | null;
  errorMessage: string | null;
  progressPercent: number;
  progressStage: string;
  progressMessage: string;
  progressItems: ImageGenerationProgressItem[];
  results: ImageGenerationResult[];
}
