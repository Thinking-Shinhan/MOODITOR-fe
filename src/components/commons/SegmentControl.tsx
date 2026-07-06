'use client';

import { ReactNode, useState } from 'react';

type SegmentItem = {
  label: string;
  content: ReactNode;
};

interface SegmentControlProps {
  segments: SegmentItem[];
  defaultIndex?: number;
  className?: string;
}

export const SegmentControl = ({
  segments,
  defaultIndex = 0,
  className = '',
}: SegmentControlProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={className}>
      <div
        role="tablist"
        className="bg-bg-gray-subtler flex gap-2 rounded-(--radius-small2) p-3"
      >
        {segments.map((segment, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={segment.label}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`segment-panel-${index}`}
              id={`segment-tab-${index}`}
              onClick={() => setActiveIndex(index)}
              className={[
                'flex flex-1 cursor-pointer items-center justify-center rounded-(--radius-small2) px-[10px] py-2 text-[14px] leading-[1.5] transition-all',
                isActive
                  ? 'bg-bg-white text-text-basic shadow-[0px_2px_8px_rgba(0,0,0,0.04)]'
                  : 'text-text-disabled-on',
              ].join(' ')}
            >
              {segment.label}
            </button>
          );
        })}
      </div>

      {segments.map((segment, index) => (
        <div
          key={segment.label}
          role="tabpanel"
          id={`segment-panel-${index}`}
          aria-labelledby={`segment-tab-${index}`}
          hidden={index !== activeIndex}
        >
          {segment.content}
        </div>
      ))}
    </div>
  );
};
