export interface HomeSummary {
  brandName: string;
  brandMoodRegistered: boolean;
  brandSummary: string | null;
  designPhilosophy: string | null;
  toneKeywords: string[];
  productCount: number;
  sheetSynced: boolean;
  sheetSyncedAt: string | null;
}
