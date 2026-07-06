import { HTMLAttributes, ElementType } from 'react';

type DisplaySize = 'large' | 'medium' | 'small';
type HeadingSize =
  'xlarge' | 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall';
type BodySize = 'large' | 'medium' | 'small' | 'xsmall';
type LabelSize = 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

// Display
const displayStyles: Record<DisplaySize, string> = {
  large: 'text-[60px] font-bold leading-[150%] tracking-[-1px]',
  medium: 'text-[44px] font-bold leading-[150%] tracking-[-1px]',
  small: 'text-[36px] font-bold leading-[150%] tracking-[-1px]',
};

export const Display = ({
  size = 'large',
  children,
  className = '',
  ...props
}: TypographyProps & { size?: DisplaySize }) => (
  <p className={`${displayStyles[size]} ${className}`} {...props}>
    {children}
  </p>
);

// Heading
const headingStyles: Record<HeadingSize, string> = {
  xlarge: 'text-[40px] font-bold leading-[150%] tracking-[-1px]',
  large: 'text-[32px] font-bold leading-[150%] tracking-[-1px]',
  medium: 'text-[24px] font-bold leading-[150%] tracking-normal',
  small: 'text-[20px] font-bold leading-[150%] tracking-normal',
  xsmall: 'text-[16px] font-bold leading-[150%] tracking-normal',
  xxsmall: 'text-[12px] font-bold leading-[150%] tracking-normal',
};

const headingTag: Record<HeadingSize, ElementType> = {
  xlarge: 'h1',
  large: 'h2',
  medium: 'h3',
  small: 'h4',
  xsmall: 'h5',
  xxsmall: 'h6',
};

export const Heading = ({
  size = 'medium',
  children,
  className = '',
  ...props
}: TypographyProps & { size?: HeadingSize }) => {
  const Tag = headingTag[size];
  return (
    <Tag className={`${headingStyles[size]} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

// Body
const bodyStyles: Record<BodySize, { bold: string; regular: string }> = {
  large: {
    bold: 'text-[20px] font-semibold leading-[150%]',
    regular: 'text-[20px] font-normal leading-[150%]',
  },
  medium: {
    bold: 'text-[16px] font-semibold leading-[150%]',
    regular: 'text-[16px] font-normal leading-[150%]',
  },
  small: {
    bold: 'text-[14px] font-semibold leading-[150%]',
    regular: 'text-[14px] font-normal leading-[150%]',
  },
  xsmall: {
    bold: 'text-[12px] font-semibold leading-[150%]',
    regular: 'text-[12px] font-normal leading-[150%]',
  },
};

export const Body = ({
  size = 'medium',
  bold = false,
  children,
  className = '',
  ...props
}: TypographyProps & { size?: BodySize; bold?: boolean }) => (
  <p
    className={`${bold ? bodyStyles[size].bold : bodyStyles[size].regular} ${className}`}
    {...props}
  >
    {children}
  </p>
);

// Label
const labelStyles: Record<LabelSize, string> = {
  large: 'text-[20px] font-normal leading-[150%]',
  medium: 'text-[16px] font-normal leading-[150%]',
  small: 'text-[14px] font-normal leading-[150%]',
  xsmall: 'text-[12px] font-normal leading-[150%]',
  xxsmall: 'text-[8px] font-normal leading-[150%]',
};

export const Label = ({
  size = 'medium',
  children,
  className = '',
  ...props
}: TypographyProps & { size?: LabelSize }) => (
  <span className={`${labelStyles[size]} ${className}`} {...props}>
    {children}
  </span>
);
