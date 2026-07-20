import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';
import type { DetailTemplateType } from '@/types/template';

export interface PlacedTemplate {
  id: string;
  type: DetailTemplateType;
}

interface DetailCanvasStore {
  placedTemplates: PlacedTemplate[];
  addTemplate: (type: DetailTemplateType, index?: number) => void;
  reorderTemplates: (activeId: string, overId: string) => void;
  moveTemplateUp: (index: number) => void;
  moveTemplateDown: (index: number) => void;
  deleteTemplate: (id: string) => void;
}

export const useDetailCanvasStore = create<DetailCanvasStore>((set) => ({
  placedTemplates: [],
  addTemplate: (type, index) =>
    set((state) => {
      const next = [...state.placedTemplates];
      const insertAt = Math.max(0, Math.min(index ?? next.length, next.length));
      next.splice(insertAt, 0, { id: crypto.randomUUID(), type });
      return { placedTemplates: next };
    }),
  reorderTemplates: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.placedTemplates.findIndex(
        (item) => item.id === activeId,
      );
      const newIndex = state.placedTemplates.findIndex(
        (item) => item.id === overId,
      );
      if (oldIndex === -1 || newIndex === -1) return state;
      return {
        placedTemplates: arrayMove(state.placedTemplates, oldIndex, newIndex),
      };
    }),
  moveTemplateUp: (index) =>
    set((state) => {
      if (index <= 0) return state;
      return {
        placedTemplates: arrayMove(state.placedTemplates, index, index - 1),
      };
    }),
  moveTemplateDown: (index) =>
    set((state) => {
      if (index === -1 || index >= state.placedTemplates.length - 1)
        return state;
      return {
        placedTemplates: arrayMove(state.placedTemplates, index, index + 1),
      };
    }),
  deleteTemplate: (id) =>
    set((state) => ({
      placedTemplates: state.placedTemplates.filter((item) => item.id !== id),
    })),
}));
