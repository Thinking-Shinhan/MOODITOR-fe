import { ButtonHTMLAttributes, ReactNode } from 'react';

type TextButtonSize = 'large' | 'medium' | 'small' | 'xsmall';

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TextButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

type TextButtonSizeConfig = {
  text: string;
  iconSize: string;
};

const textButtonStyles: Record<TextButtonSize, TextButtonSizeConfig> = {
  large: {
    text: 'text-[20px] font-semibold leading-[150%]',
    iconSize: 'w-[24px] h-[24px]',
  },
  medium: {
    text: 'text-[16px] font-semibold leading-[150%]',
    iconSize: 'w-[20px] h-[20px]',
  },
  small: {
    text: 'text-[14px] font-semibold leading-[150%]',
    iconSize: 'w-[16px] h-[16px]',
  },
  xsmall: {
    text: 'text-[12px] font-semibold leading-[150%]',
    iconSize: 'w-[14px] h-[14px]',
  },
};

export const TextButton = ({
  size = 'medium',
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}: TextButtonProps) => {
  const { text, iconSize } = textButtonStyles[size];

  return (
    <button
      type="button"
      className={[
        'inline-flex items-center gap-[var(--gap-2)]',
        'text-text-basic',
        'hover:enabled:text-text-subtler',
        'active:enabled:text-text-subtle',
        'disabled:text-text-disabled',
        'cursor-pointer disabled:cursor-not-allowed',
        text,
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
      {children}
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
