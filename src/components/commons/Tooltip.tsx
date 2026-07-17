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
    const containerEdgeClass =
      placement === 'top' ? 'pb-[9.526px]' : 'pt-[9.526px]';
    const arrowEdgeClass = placement === 'top' ? 'bottom-0' : 'top-0';

    return (
      <div className={className}>
        <div
          className={`relative flex flex-col items-start ${containerEdgeClass}`}
        >
          {placement === 'top' && bubble}
          <svg
            viewBox="0 0 11 9.526"
            className={[
              'absolute h-[9.526px] w-[11px]',
              placement === 'top' ? 'rotate-180' : '',
              arrowEdgeClass,
              arrowPositionClass,
            ].join(' ')}
          >
            <path
              d="M0 9.526 L4.5 1.732 Q5.5 0 6.5 1.732 L11 9.526 Z"
              className="fill-btn-primary-fill-black"
            />
          </svg>
          {placement === 'bottom' && bubble}
        </div>
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
