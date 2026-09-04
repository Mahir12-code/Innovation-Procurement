import React from 'react';
import { cn } from '../../utils/cn';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

const alertVariants = {
  info: {
    container: 'bg-sky-50 border-sky-200 text-sky-900',
    icon: Info,
    iconColor: 'text-sky-600',
  },
  success: {
    container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    icon: CheckCircle2,
    iconColor: 'text-emerald-600',
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-900',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
  },
  danger: {
    container: 'bg-rose-50 border-rose-200 text-rose-900',
    icon: AlertCircle,
    iconColor: 'text-rose-600',
  }
};

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className,
  action,
}) {
  const config = alertVariants[variant] || alertVariants.info;
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-xl border text-sm',
        config.container,
        className
      )}
      role="alert"
    >
      <IconComponent className={cn('w-5 h-5 shrink-0 mt-0.5', config.iconColor)} />

      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold leading-tight">{title}</h5>}
        {children && <div className="text-xs opacity-90 leading-relaxed">{children}</div>}
        {action && <div className="pt-2">{action}</div>}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-slate-500 hover:text-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
