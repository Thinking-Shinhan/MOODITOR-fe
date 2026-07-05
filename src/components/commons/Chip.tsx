import { ButtonHTMLAttributes, ReactNode } from 'react';

type ChipVariant = 'primary' | 'secondary' | 'tertiary';
type ChipSize = 'large' | 'medium' | 'small' | 'xsmall';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  pressed?: boolean;
  children?: ReactNode;
}

type VariantConfig = {
  default: string;
  pressed: string;
};

const variantStyles: Record<ChipVariant, VariantConfig> = {
  primary: {
    default:
      'bg-btn-secondary-fill text-text-primary-basic border border-btn-secondary-border',
    pressed:
      'bg-btn-primary-fill text-text-border-inverse border border-btn-secondary-border',
  },
  secondary: {
    default:
      'bg-btn-secondary-fill text-text-border border border-border-border',
    pressed: 'bg-btn-primary-fill-pressed text-text-border-inverse',
  },
  tertiary: {
    default: 'bg-btn-tertiary-fill text-text-basic',
    pressed:
      'bg-btn-tertiary-fill-hovered text-text-basic border border-btn-outline-border-hovered',
  },
};

type SizeConfig = {
  padding: string;
  text: string;
};

const sizeStyles: Record<ChipSize, SizeConfig> = {
  large: {
    padding: 'px-[var(--padding-7)] py-[var(--padding-3)]',
    text: 'text-[20px] font-normal leading-[1.5]',
  },
  medium: {
    padding: 'px-[var(--padding-6)] py-[var(--padding-3)]',
    text: 'text-[16px] font-normal leading-[1.5]',
  },
  small: {
    padding: 'px-[var(--padding-5)] py-[var(--padding-2)]',
    text: 'text-[14px] font-normal leading-[1.5]',
  },
  xsmall: {
    padding: 'px-[var(--padding-4)] py-[var(--padding-2)]',
    text: 'text-[12px] font-normal leading-[1.5]',
  },
};

export const Chip = ({
  variant = 'primary',
  size = 'large',
  pressed = false,
  children,
  className = '',
  ...props
}: ChipProps) => {
  const { padding, text } = sizeStyles[size];
  const stateClass = pressed
    ? variantStyles[variant].pressed
    : variantStyles[variant].default;

  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={[
        'inline-flex cursor-pointer items-center justify-center transition-colors',
        'rounded-[var(--radius-max)]',
        padding,
        text,
        stateClass,
        className,
      ].join(' ')}
      {...props}
    >
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
};
