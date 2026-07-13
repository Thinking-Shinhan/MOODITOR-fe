'use client';

import { ReactNode, useId, useState } from 'react';
import { Body, Heading } from '@/components/commons/Typography';

type TabItem = {
  label: string;
  content: ReactNode;
};

interface TabsProps {
  tabs: TabItem[];
  defaultIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
}

export const Tabs = ({
  tabs,
  defaultIndex = 0,
  onTabChange,
  className = '',
}: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const uid = useId();

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onTabChange?.(index);
  };

  return (
    <div className={className}>
      <div role="tablist" className="mb-[var(--gap-8)] flex">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.label}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`${uid}-tabpanel-${index}`}
              id={`${uid}-tab-${index}`}
              onClick={() => handleTabClick(index)}
              className="flex flex-1 cursor-pointer flex-col items-center gap-[var(--gap-3)]"
            >
              <Body
                size="small"
                bold={true}
                className={
                  isActive ? 'text-text-primary-basic' : 'text-text-disabled-on'
                }
              >
                {tab.label}
              </Body>
              <div
                className={[
                  'h-[4px] w-full',
                  isActive
                    ? 'bg-btn-primary-fill'
                    : 'bg-btn-tertiary-fill-hovered',
                ].join(' ')}
              />
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${uid}-tabpanel-${index}`}
          aria-labelledby={`${uid}-tab-${index}`}
          hidden={index !== activeIndex}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
