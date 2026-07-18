'use client';

import Image from 'next/image';
import { Body } from '@/components/commons/Typography';

interface CompositionOptionCardProps {
  label: string;
  imageUrl: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const CompositionOptionCard = ({
  label,
  imageUrl,
  selected,
  disabled = false,
  onClick,
}: CompositionOptionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-pressed={selected}
    className={[
      'flex w-full flex-col items-center gap-[var(--gap-3)]',
      disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
    ].join(' ')}
  >
    <div
      className={[
        'relative h-[130px] w-full shrink-0 overflow-hidden rounded-[var(--radius-small1)]',
        selected ? 'border-border-primary border' : '',
      ].join(' ')}
    >
      <Image
        src={imageUrl}
        alt=""
        fill
        sizes="200px"
        quality={60}
        className="object-cover"
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
