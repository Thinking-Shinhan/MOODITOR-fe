'use client';

import { useEffect, useMemo, useRef, type RefObject } from 'react';
import type Konva from 'konva';
import {
  getSlotImageKey,
  useImagePlacementStore,
} from '@/stores/imagePlacementStore';

interface DroppableSlot {
  id: string;
  type: 'image' | 'text';
}

// ImagePlacementPanel의 저장된 이미지 카드가 드래그를 시작할 때 이 타입으로
// dataTransfer에 이미지 URL을 담는다. 템플릿 패널 카드 드래그(application/json)와
// OS 파일 드래그(dataTransfer.files)와 겹치지 않도록 별도 타입을 쓴다.
export const SAVED_IMAGE_DRAG_TYPE = 'application/x-aven-saved-image';

// 이미지 슬롯 위에 파일(OS 드래그) 또는 저장된 이미지(패널 드래그)를 놓으면
// 해당 슬롯에 이미지를 채운다.
// Konva Stage는 캔버스 하나로 렌더링돼서 슬롯마다 별도의 네이티브 드롭
// 타겟을 둘 수 없어, 스테이지 컨테이너에 리스너를 걸고 드롭 좌표로
// getIntersection을 이용해 어느 슬롯인지 찾는다.
// 이미지 배치 패널에서 놓은 이미지도 같은 슬롯에 들어가야 해서,
// 슬롯 이미지는 컴포넌트 로컬 상태가 아니라 전역 store(imagePlacementStore)에 둔다.
export const useImageSlotDrop = <T extends DroppableSlot>(
  rootRef: RefObject<Konva.Group | null>,
  templateId: string,
  slots: readonly T[],
) => {
  const allImages = useImagePlacementStore((state) => state.images);
  const setStoreImage = useImagePlacementStore((state) => state.setImage);
  const activeUrlsRef = useRef<Set<string>>(new Set());

  const images = useMemo(() => {
    const result: Record<string, string> = {};
    slots.forEach((slot) => {
      const src = allImages[getSlotImageKey(templateId, slot.id)];
      if (src) result[slot.id] = src;
    });
    return result;
  }, [allImages, templateId, slots]);

  useEffect(() => {
    const prev = activeUrlsRef.current;
    const next = new Set(
      Object.values(images).filter((url) => url.startsWith('blob:')),
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

      const savedImageUrl = event.dataTransfer?.getData(SAVED_IMAGE_DRAG_TYPE);
      const file = event.dataTransfer?.files?.[0];
      if (!savedImageUrl && (!file || !file.type.startsWith('image/'))) return;

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

      const src = savedImageUrl || URL.createObjectURL(file as File);
      setStoreImage(templateId, slot.id, src);
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
