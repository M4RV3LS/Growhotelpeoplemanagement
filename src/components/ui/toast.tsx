import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'text-[#28A745]',
    error: 'text-[#DC3545]',
    info: 'text-[#4A90E2]',
  };

  const Icon = icons[type];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom duration-250">
      <div className="bg-[#1A1A1A] text-white rounded-lg shadow-xl px-4 py-3 flex items-center gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 ${colors[type]}`} />
        <p className="flex-1 text-sm">{message}</p>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
