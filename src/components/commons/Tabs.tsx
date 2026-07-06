'use client';

import { ReactNode, useState } from 'react';
import { Heading } from '@/components/commons/Typography';

type TabItem = {
  label: string;
  content: ReactNode;
};

interface TabsProps {
  tabs: TabItem[];
  defaultIndex?: number;
  className?: string;
}

export const Tabs = ({ tabs, defaultIndex = 0, className = '' }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={className}>
      <div role="tablist" className="flex">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.label}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`tabpanel-${index}`}
              id={`tab-${index}`}
              onClick={() => setActiveIndex(index)}
              className="flex flex-1 cursor-pointer flex-col items-center gap-3"
            >
              <Heading
                size="xsmall"
                className={
                  isActive ? 'text-text-primary-basic' : 'text-text-disabled-on'
                }
              >
                {tab.label}
              </Heading>
              <div
                className={[
                  'h-1.25 w-full rounded-(--radius-xsmall)',
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
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={index !== activeIndex}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
