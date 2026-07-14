import { Body } from '@/components/commons/Typography';

type TooltipPlacement = 'right' | 'top';

interface TooltipProps {
  text: string;
  placement?: TooltipPlacement;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const Tooltip = ({
  text,
  placement = 'right',
  className = '',
}: TooltipProps) => {
  const bubble = (
    <div className="bg-btn-primary-fill-black flex items-center gap-[var(--gap-2)] rounded-[var(--radius-small2)] px-[var(--padding-4)] py-[var(--padding-3)]">
      <Body
        size="xsmall"
        className="text-text-border-inverse whitespace-nowrap"
      >
        {text}
      </Body>
    </div>
  );

  if (placement === 'top') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {bubble}
        <div className="border-t-btn-primary-fill-black h-0 w-0 border-t-[9px] border-r-[5.5px] border-l-[5.5px] border-r-transparent border-l-transparent" />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="border-r-btn-primary-fill-black h-0 w-0 border-t-[5.5px] border-r-[9px] border-b-[5.5px] border-t-transparent border-b-transparent" />
      {bubble}
    </div>
  );
};
