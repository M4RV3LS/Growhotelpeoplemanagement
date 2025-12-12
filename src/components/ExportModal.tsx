import { useState } from 'react';
import { FileText, Loader2, CheckCircle } from 'lucide-react';

interface ExportModalProps {
  month: string;
  onExport: () => void;
  onClose: () => void;
}

export function ExportModal({ month, onExport, onClose }: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsExporting(false);
      setIsComplete(true);
      
      // Auto close after showing success
      setTimeout(() => {
        onExport();
      }, 1500);
    }, 2000);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
        onClick={!isExporting ? onClose : undefined}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
            isComplete ? 'bg-[#D4EDDA]' : 'bg-[#FFF5F6]'
          }`}>
            {isComplete ? (
              <CheckCircle className="w-8 h-8 text-[#28A745]" />
            ) : (
              <FileText className="w-8 h-8 text-[#E63946]" />
            )}
          </div>

          {/* Content */}
          {!isComplete ? (
            <>
              <h3 className="text-lg font-semibold text-[#1A1A1A] text-center mb-2">
                Export Schedule
              </h3>
              <p className="text-sm text-[#6B7280] text-center mb-6">
                Export the complete schedule for <span className="font-medium text-[#1A1A1A]">{month}</span> as a PDF document.
              </p>

              {/* File Preview Info */}
              <div className="bg-[#F8F9FA] rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1A1A] mb-1">
                      Staff_Schedule_{month.replace(' ', '_')}.pdf
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      Full month view with all staff members and shifts
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className={`h-11 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    isExporting
                      ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                      : 'bg-[#E63946] text-white hover:bg-[#D62835] active:bg-[#C11F2C]'
                  }`}
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    'Export PDF'
                  )}
                </button>
                <button
                  onClick={onClose}
                  disabled={isExporting}
                  className="h-11 bg-white border border-[#E5E7EB] text-[#1A1A1A] rounded-lg font-medium hover:bg-[#F3F4F6] active:bg-[#E5E7EB] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-[#1A1A1A] text-center mb-2">
                Export Complete!
              </h3>
              <p className="text-sm text-[#6B7280] text-center">
                Your schedule has been exported successfully
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
