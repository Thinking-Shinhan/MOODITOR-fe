'use client';

interface AspectRatioButtonProps {
  label: string;
  iconClassName: string;
  selected?: boolean;
  onClick?: () => void;
}

export const AspectRatioButton = ({
  label,
  iconClassName,
  selected = false,
  onClick,
}: AspectRatioButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={[
      'flex w-[59px] shrink-0 flex-col items-center justify-center gap-[var(--gap-3)]',
      'rounded-[var(--radius-small2)] px-[var(--padding-5)] py-[var(--padding-4)] transition-colors',
      selected
        ? 'bg-btn-secondary-fill-hovered border-btn-secondary-border-pressed border'
        : 'bg-btn-tertiary-fill hover:bg-btn-tertiary-fill-hovered',
    ].join(' ')}
  >
    <span
      className={[
        'border-icon-disabled shrink-0 rounded-[var(--radius-xsmall)] border-[0.8px]',
        iconClassName,
      ].join(' ')}
    />
    <span className="text-text-subtler text-[12px] font-bold">{label}</span>
  </button>
);
