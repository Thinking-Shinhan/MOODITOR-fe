export type SheetSyncStatus = 'SUCCESS';

export interface CreateSheetConnectionRequest {
  url: string;
}

export interface SheetConnection {
  id: number;
  url: string;
  spreadsheetId: string;
  syncStatus: SheetSyncStatus;
  lastSyncedAt: string;
}
