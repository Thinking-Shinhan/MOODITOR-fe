export interface HomeSummary {
  brandName: string;
  brandMoodRegistered: boolean;
  brandSummary: string | null;
  designPhilosophy: string | null;
  toneKeywords: string[];
  productCount: number;
  sheetSynced: boolean;
  sheetUrl: string | null;
  sheetSyncedAt: string | null;
}
