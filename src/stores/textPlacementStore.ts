import { create } from 'zustand';

// key: `${templateId}:${slotKey}`
interface TextPlacementStore {
  texts: Record<string, string>;
  setText: (templateId: string, slotKey: string, content: string) => void;
}

export const getTextSlotKey = (templateId: string, slotKey: string) =>
  `${templateId}:${slotKey}`;

export const useTextPlacementStore = create<TextPlacementStore>((set) => ({
  texts: {},
  setText: (templateId, slotKey, content) =>
    set((state) => ({
      texts: {
        ...state.texts,
        [getTextSlotKey(templateId, slotKey)]: content,
      },
    })),
}));
