import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost';
type ButtonSize = 'large' | 'medium' | 'small' | 'xsmall';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-btn-primary-fill text-text-border-inverse',
    'hover:enabled:bg-btn-primary-hovered',
    'active:enabled:bg-btn-primary-fill-pressed',
    'disabled:bg-btn-disabled-fill disabled:text-text-disabled',
  ].join(' '),
  secondary: [
    'bg-btn-secondary-fill text-text-primary-basic border border-btn-secondary-border',
    'hover:enabled:bg-btn-secondary-fill-hovered hover:enabled:border-btn-secondary-border-hovered',
    'active:enabled:bg-btn-secondary-fill-pressed active:enabled:border-btn-secondary-border-pressed',
    'disabled:bg-btn-disabled-fill disabled:text-text-disabled disabled:border-transparent',
  ].join(' '),
  tertiary: [
    'bg-btn-tertiary-fill text-text-basic',
    'hover:enabled:bg-btn-tertiary-fill-hovered',
    'active:enabled:bg-btn-tertiary-fill-pressed',
    'disabled:bg-btn-disabled-fill disabled:text-text-disabled',
  ].join(' '),
  outline: [
    'bg-transparent text-text-basic border border-btn-outline-border',
    'hover:enabled:border-btn-outline-border-hovered',
    'active:enabled:border-btn-outline-border-pressed',
    'disabled:bg-btn-disabled-fill disabled:text-text-disabled disabled:border-transparent',
  ].join(' '),
  ghost: [
    'bg-transparent text-text-basic',
    'hover:enabled:bg-btn-tertiary-fill',
    'active:enabled:bg-btn-tertiary-fill-pressed',
    'disabled:text-text-disabled',
  ].join(' '),
};

type SizeConfig = {
  base: string;
  iconOnly: string;
  radius: string;
  text: string;
  iconSize: string;
};

const sizeStyles: Record<ButtonSize, SizeConfig> = {
  large: {
    base: 'px-[var(--padding-8)] py-[var(--size-height-3)] gap-[var(--gap-3)]',
    iconOnly:
      'aspect-square px-[var(--size-height-3)] py-[var(--size-height-3)]',
    radius: 'rounded-[var(--radius-large1)]',
    text: 'text-[20px] font-semibold leading-[1.5]',
    iconSize: 'w-[24px] h-[24px]',
  },
  medium: {
    base: 'px-[var(--padding-7)] py-[var(--size-height-3)] gap-[var(--gap-3)]',
    iconOnly:
      'aspect-square px-[var(--size-height-3)] py-[var(--size-height-3)]',
    radius: 'rounded-[var(--radius-large1)]',
    text: 'text-[16px] font-semibold leading-[1.5]',
    iconSize: 'w-[20px] h-[20px]',
  },
  small: {
    base: 'px-[var(--padding-6)] py-[var(--size-height-2)] gap-[var(--gap-3)]',
    iconOnly:
      'aspect-square px-[var(--size-height-2)] py-[var(--size-height-2)]',
    radius: 'rounded-[var(--radius-small2)]',
    text: 'text-[14px] font-semibold leading-[1.5]',
    iconSize: 'w-[16px] h-[16px]',
  },
  xsmall: {
    base: 'px-[var(--padding-4)] py-[var(--size-height-2)] gap-[var(--gap-2)]',
    iconOnly:
      'aspect-square px-[var(--size-height-2)] py-[var(--size-height-2)]',
    radius: 'rounded-[var(--radius-small2)]',
    text: 'text-[12px] font-semibold leading-[1.5]',
    iconSize: 'w-[14px] h-[14px]',
  },
};

export const Button = ({
  variant = 'primary',
  size = 'large',
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const { base, iconOnly, radius, text, iconSize } = sizeStyles[size];
  const isIconOnly = !children;

  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center transition-colors',
        'cursor-pointer disabled:cursor-not-allowed',
        radius,
        isIconOnly ? iconOnly : base,
        variantStyles[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {leftIcon && (
        <span
          className={`shrink-0 ${iconSize} flex items-center justify-center`}
        >
          {leftIcon}
        </span>
      )}
      {children && (
        <span className={`whitespace-nowrap ${text}`}>{children}</span>
      )}
      {rightIcon && (
        <span
          className={`shrink-0 ${iconSize} flex items-center justify-center`}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
};
