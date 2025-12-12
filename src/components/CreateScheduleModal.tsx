import { useState } from 'react';
import { Calendar, Loader2 } from 'lucide-react';

interface CreateScheduleModalProps {
  month: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CreateScheduleModal({ month, onConfirm, onCancel }: CreateScheduleModalProps) {
  const [isCreating, setIsCreating] = useState(false);

  const handleConfirm = () => {
    setIsCreating(true);
    // Simulate async operation
    setTimeout(() => {
      onConfirm();
      setIsCreating(false);
    }, 1500);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200" />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-[#FFF5F6] flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-[#E63946]" />
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-[#1A1A1A] text-center mb-2">
            Create Schedule for {month}
          </h3>
          <p className="text-sm text-[#6B7280] text-center mb-6">
            This will create a default schedule with 1 shift per staff member for each day of the month. You can edit individual schedules later.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleConfirm}
              disabled={isCreating}
              className={`h-11 rounded-lg font-medium flex items-center justify-center gap-2 ${
                isCreating
                  ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  : 'bg-[#E63946] text-white hover:bg-[#D62835] active:bg-[#C11F2C]'
              }`}
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Schedule...
                </>
              ) : (
                'Create Schedule'
              )}
            </button>
            <button
              onClick={onCancel}
              disabled={isCreating}
              className="h-11 bg-white border border-[#E5E7EB] text-[#1A1A1A] rounded-lg font-medium hover:bg-[#F3F4F6] active:bg-[#E5E7EB] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
