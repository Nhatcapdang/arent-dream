import React from 'react';
import { cn } from '../utils/cn';

export default function Button({
  label,
  isPending,
  loadMore,
}: {
  label: string;
  isPending: boolean;
  loadMore: () => void;
}) {
  return (
    <button
      onClick={loadMore}
      type="button"
      className={cn(
        'primary-gradient text-white text-base sm:text-lg font-noto-sans-jp leading-relaxed sm:leading-[26px] max-w-[296px] w-full h-12 sm:h-[56px] rounded-[5px] cursor-pointer active:translate-y-2 transition-all duration-100',
        {
          'opacity-50 cursor-not-allowed': isPending,
        }
      )}
    >
      {label}
    </button>
  );
}
