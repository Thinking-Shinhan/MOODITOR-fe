'use client';

import { useEffect, useMemo, useRef, type RefObject } from 'react';
import type Konva from 'konva';
import {
  getSlotImageKey,
  useImagePlacementStore,
  type PlacedImage,
} from '@/stores/imagePlacementStore';

interface DroppableSlot {
  id: string;
  type: 'image' | 'text';
}

export const SAVED_IMAGE_DRAG_TYPE = 'application/x-aven-saved-image';

interface SavedImageDragPayload {
  assetId: number;
  url: string;
}

export const useImageSlotDrop = <T extends DroppableSlot>(
  rootRef: RefObject<Konva.Group | null>,
  templateId: string,
  slots: readonly T[],
) => {
  const allImages = useImagePlacementStore((state) => state.images);
  const setStoreImage = useImagePlacementStore((state) => state.setImage);
  const activeUrlsRef = useRef<Set<string>>(new Set());

  const images = useMemo(() => {
    const result: Record<string, PlacedImage> = {};
    slots.forEach((slot) => {
      const image = allImages[getSlotImageKey(templateId, slot.id)];
      if (image) result[slot.id] = image;
    });
    return result;
  }, [allImages, templateId, slots]);

  useEffect(() => {
    const prev = activeUrlsRef.current;
    const next = new Set(
      Object.values(images)
        .map((image) => image.url)
        .filter((url) => url.startsWith('blob:')),
    );

    prev.forEach((url) => {
      if (!next.has(url)) URL.revokeObjectURL(url);
    });

    activeUrlsRef.current = next;
  }, [images]);

  useEffect(() => {
    return () => {
      activeUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    const container = rootRef.current?.getStage()?.container();
    if (!container) return;

    const imageSlots = slots.filter((slot) => slot.type === 'image');
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();

      const savedImageRaw = event.dataTransfer?.getData(SAVED_IMAGE_DRAG_TYPE);
      const file = event.dataTransfer?.files?.[0];
      if (!savedImageRaw && (!file || !file.type.startsWith('image/'))) return;

      const stage = rootRef.current?.getStage();
      if (!stage) return;

      const containerRect = container.getBoundingClientRect();
      const pointerPosition = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
      };
      const target = stage.getIntersection(pointerPosition);
      const slot = imageSlots.find(
        (candidate) => target?.name() === `slot-${templateId}-${candidate.id}`,
      );
      if (!slot) return;

      if (savedImageRaw) {
        const payload: SavedImageDragPayload = JSON.parse(savedImageRaw);
        setStoreImage(templateId, slot.id, {
          url: payload.url,
          assetId: payload.assetId,
        });
        return;
      }

      const url = URL.createObjectURL(file as File);
      setStoreImage(templateId, slot.id, { url, assetId: null });
    };

    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);

    return () => {
      container.removeEventListener('dragover', handleDragOver);
      container.removeEventListener('drop', handleDrop);
    };
  }, [rootRef, templateId, slots, setStoreImage]);

  return images;
};
