import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export function LoadingState({
  text = 'Loading information...',
  type = 'spinner', // 'spinner' | 'skeleton'
  rows = 3,
  className,
}) {
  if (type === 'skeleton') {
    return (
      <div className={cn('space-y-3 animate-pulse p-4', className)}>
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-10 bg-slate-100 rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center text-slate-500',
        className
      )}
    >
      <Loader2 className="w-8 h-8 animate-spin text-gov-700 mb-2" />
      <p className="text-xs font-medium text-slate-600">{text}</p>
    </div>
  );
}
