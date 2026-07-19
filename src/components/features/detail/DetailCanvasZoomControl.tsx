'use client';

import { Minus, Plus } from 'lucide-react';
import { Body } from '@/components/commons/Typography';
import {
  useDetailCanvasZoomStore,
  ZOOM_MIN,
  ZOOM_MAX,
} from '@/stores/detailCanvasZoomStore';

interface DetailCanvasZoomControlProps {
  className?: string;
}

const ZOOM_ICON_BUTTON_CLASS = [
  'flex size-5 shrink-0 cursor-pointer items-center justify-center',
  'text-icon-gray',
  'hover:enabled:text-icon-gray-light',
  'disabled:text-icon-disabled disabled:cursor-not-allowed',
].join(' ');

export const DetailCanvasZoomControl = ({
  className = '',
}: DetailCanvasZoomControlProps) => {
  const zoom = useDetailCanvasZoomStore((state) => state.zoom);
  const zoomIn = useDetailCanvasZoomStore((state) => state.zoomIn);
  const zoomOut = useDetailCanvasZoomStore((state) => state.zoomOut);

  return (
    <div
      className={`bg-bg-white flex items-center gap-[var(--gap-3)] rounded-[var(--radius-xsmall2)] px-[var(--padding-4)] py-[var(--padding-3)] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] ${className}`}
    >
      <button
        type="button"
        onClick={zoomOut}
        disabled={zoom <= ZOOM_MIN}
        aria-label="축소"
        className={ZOOM_ICON_BUTTON_CLASS}
      >
        <Minus size={20} />
      </button>
      <div className="bg-border-subtler h-[16px] w-px shrink-0" />
      <Body size="medium" bold className="text-text-basic w-[40px] text-center">
        {zoom}%
      </Body>
      <div className="bg-border-subtler h-[16px] w-px shrink-0" />
      <button
        type="button"
        onClick={zoomIn}
        disabled={zoom >= ZOOM_MAX}
        aria-label="확대"
        className={ZOOM_ICON_BUTTON_CLASS}
      >
        <Plus size={20} />
      </button>
    </div>
  );
};
