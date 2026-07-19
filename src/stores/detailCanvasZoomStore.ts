import { create } from 'zustand';

export const ZOOM_MIN = 25;
export const ZOOM_MAX = 200;
export const ZOOM_STEP = 10;
export const ZOOM_DEFAULT = 100;

interface DetailCanvasZoomStore {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  setZoom: (value: number) => void;
  resetZoom: () => void;
}

const clampZoom = (value: number) =>
  Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value));

export const useDetailCanvasZoomStore = create<DetailCanvasZoomStore>(
  (set) => ({
    zoom: ZOOM_DEFAULT,
    zoomIn: () => set((state) => ({ zoom: clampZoom(state.zoom + ZOOM_STEP) })),
    zoomOut: () =>
      set((state) => ({ zoom: clampZoom(state.zoom - ZOOM_STEP) })),
    setZoom: (value) => set({ zoom: clampZoom(value) }),
    resetZoom: () => set({ zoom: ZOOM_DEFAULT }),
  }),
);
