import { Body } from '@/components/commons/Typography';

type TooltipPlacement = 'right' | 'top' | 'bottom';
type TooltipArrowAlign = 'center' | 'left';

interface TooltipProps {
  text: string;
  placement?: TooltipPlacement;
  arrowAlign?: TooltipArrowAlign;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const Tooltip = ({
  text,
  placement = 'right',
  arrowAlign = 'center',
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

  if (placement === 'top' || placement === 'bottom') {
    const arrowPositionClass =
      arrowAlign === 'left' ? 'left-[24px]' : 'left-1/2 -translate-x-1/2';

    return (
      <div className={`relative flex flex-col items-start ${className}`}>
        {placement === 'top' && bubble}
        <div
          className={[
            'absolute h-0 w-0 border-r-[5.5px] border-l-[5.5px] border-r-transparent border-l-transparent',
            placement === 'top'
              ? 'border-t-btn-primary-fill-black top-full border-t-[9px]'
              : 'border-b-btn-primary-fill-black bottom-full border-b-[9px]',
            arrowPositionClass,
          ].join(' ')}
        />
        {placement === 'bottom' && bubble}
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
