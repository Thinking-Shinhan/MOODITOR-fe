'use client';

import {
  getTextSlotKey,
  useTextPlacementStore,
} from '@/stores/textPlacementStore';

export const useTextSlotContent = (
  templateId: string,
  slotKey: string,
  defaultText: string,
) => {
  const stored = useTextPlacementStore(
    (state) => state.texts[getTextSlotKey(templateId, slotKey)],
  );
  const setText = useTextPlacementStore((state) => state.setText);

  const value = stored ?? defaultText;
  const setValue = (content: string) => setText(templateId, slotKey, content);

  return [value, setValue] as const;
};
