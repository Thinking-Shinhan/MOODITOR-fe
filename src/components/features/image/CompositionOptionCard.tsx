'use client';

import { Body } from '@/components/commons/Typography';

interface CompositionOptionCardProps {
  label: string;
  imageUrl: string;
  selected: boolean;
  onClick: () => void;
}

export const CompositionOptionCard = ({
  label,
  imageUrl,
  selected,
  onClick,
}: CompositionOptionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className="flex w-full cursor-pointer flex-col items-center gap-[var(--gap-3)]"
  >
    <div
      className={[
        'relative h-[130px] w-full shrink-0 overflow-hidden rounded-[var(--radius-small1)]',
        selected ? 'border-border-primary border' : '',
      ].join(' ')}
    >
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      {selected && <div className="absolute inset-0 bg-[rgba(255,94,0,0.1)]" />}
    </div>
    <Body
      size="xsmall"
      bold
      className={selected ? 'text-text-basic' : 'text-text-subtle'}
    >
      {label}
    </Body>
  </button>
);
