'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/commons/Button';
import { TextButton } from '@/components/commons/TextButton';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number,
): number[] => {
  let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const end = Math.min(totalPages, start + maxVisiblePages - 1);
  start = Math.max(1, end - maxVisiblePages + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className = '',
}: PaginationProps) => {
  const visiblePages = getVisiblePages(
    currentPage,
    totalPages,
    maxVisiblePages,
  );
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className={`flex items-center gap-[var(--gap-3)] ${className}`}>
      <TextButton
        size="xsmall"
        leftIcon={<ChevronLeft size={14} />}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
        className="text-text-subtler! rounded-[var(--radius-xsmall2)] px-[var(--padding-4)] py-[var(--size-height-2)]"
      >
        이전
      </TextButton>

      {visiblePages.map((page) => {
        const isActive = page === currentPage;
        return (
          <Button
            key={page}
            variant="tertiary"
            size="xsmall"
            onClick={() => onPageChange(page)}
            className={[
              'h-[34px]! w-[34px]! gap-0! rounded-[var(--radius-xsmall2)]! p-0!',
              isActive
                ? [
                    'bg-icon-gray! text-text-border-inverse! border-transparent!',
                    'hover:bg-icon-gray! active:bg-icon-gray!',
                  ].join(' ')
                : 'border-btn-outline-border! bg-bg-white! text-text-subtler! border!',
            ].join(' ')}
          >
            {page}
          </Button>
        );
      })}

      <TextButton
        size="xsmall"
        rightIcon={<ChevronRight size={14} />}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className="!text-text-subtler rounded-[var(--radius-xsmall2)] px-[var(--padding-4)] py-[var(--size-height-2)]"
      >
        다음
      </TextButton>
    </div>
  );
};
