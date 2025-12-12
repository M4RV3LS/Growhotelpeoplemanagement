import { useState, useMemo } from 'react';
import { X, Calendar, ChevronLeft, ChevronRight, AlertCircle, Plus, Eye } from 'lucide-react';

interface MonthYearSelectorProps {
  currentDate: Date;
  existingSchedules: Record<string, any>; // Keys contain "YYYY-MM" patterns
  onConfirm: (year: number, month: number, shouldCreate: boolean) => void;
  onClose: () => void;
}

export function MonthYearSelector({ currentDate, existingSchedules, onConfirm, onClose }: MonthYearSelectorProps) {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  // Calculate available months (all past months + today's month + next month)
  const availableMonths = useMemo(() => {
    const months = [];
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    // Generate from Jan 2026 onwards (or earlier if needed)
    const startYear = 2026;
    const maxYear = currentYear;
    const maxMonth = currentMonth + 1; // Current + 1
    
    for (let year = startYear; year <= maxYear; year++) {
      const startMonth = year === startYear ? 0 : 0;
      const endMonth = year === maxYear ? maxMonth : 11;
      
      for (let month = startMonth; month <= endMonth; month++) {
        const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
        const hasSchedule = Object.keys(existingSchedules).some(key => key.includes(monthKey));
        
        months.push({
          year,
          month,
          monthKey,
          hasSchedule,
          label: new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          shortLabel: new Date(year, month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        });
      }
    }
    
    return months;
  }, [today, existingSchedules]);

  // Check if selected month has schedule
  const selectedMonthKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;
  const hasSchedule = Object.keys(existingSchedules).some(key => key.includes(selectedMonthKey));

  // Check if selected month is within allowed range
  const maxAllowedDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const selectedDate = new Date(selectedYear, selectedMonth, 1);
  const isWithinLimit = selectedDate <= maxAllowedDate;

  // Get current year and month months
  const currentYearMonths = availableMonths.filter(m => m.year === selectedYear);
  const years = Array.from(new Set(availableMonths.map(m => m.year))).sort((a, b) => b - a);

  const handlePrevYear = () => {
    const currentIndex = years.indexOf(selectedYear);
    if (currentIndex < years.length - 1) {
      setSelectedYear(years[currentIndex + 1]);
      setSelectedMonth(0); // Reset to January
    }
  };

  const handleNextYear = () => {
    const currentIndex = years.indexOf(selectedYear);
    if (currentIndex > 0) {
      setSelectedYear(years[currentIndex - 1]);
      setSelectedMonth(0); // Reset to January
    }
  };

  const handleConfirm = () => {
    if (isWithinLimit) {
      onConfirm(selectedYear, selectedMonth, !hasSchedule);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom duration-250">
        <div className="bg-white rounded-t-2xl shadow-[0px_-4px_16px_rgba(0,0,0,0.12)] max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Select Schedule Month</h2>
            <button
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] active:bg-[#E5E7EB] -mr-2"
            >
              <X className="w-6 h-6 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* Year Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
                Year
              </label>
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handlePrevYear}
                  disabled={years.indexOf(selectedYear) === years.length - 1}
                  className={`w-11 h-11 flex items-center justify-center rounded-lg ${
                    years.indexOf(selectedYear) === years.length - 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#F3F4F6] active:bg-[#E5E7EB]'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
                </button>
                
                <div className="flex-1 text-center">
                  <p className="text-xl font-semibold text-[#1A1A1A]">{selectedYear}</p>
                </div>

                <button
                  onClick={handleNextYear}
                  disabled={years.indexOf(selectedYear) === 0}
                  className={`w-11 h-11 flex items-center justify-center rounded-lg ${
                    years.indexOf(selectedYear) === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#F3F4F6] active:bg-[#E5E7EB]'
                  }`}
                >
                  <ChevronRight className="w-6 h-6 text-[#1A1A1A]" />
                </button>
              </div>
            </div>

            {/* Month Grid */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
                Month
              </label>
              <div className="grid grid-cols-3 gap-3">
                {currentYearMonths.map((monthData) => {
                  const isSelected = monthData.month === selectedMonth;
                  const monthDate = new Date(monthData.year, monthData.month, 1);
                  const isAllowed = monthDate <= maxAllowedDate;
                  const isPast = monthDate < new Date(today.getFullYear(), today.getMonth(), 1);
                  
                  return (
                    <button
                      key={monthData.month}
                      onClick={() => isAllowed && setSelectedMonth(monthData.month)}
                      disabled={!isAllowed}
                      className={`h-16 rounded-lg border-2 px-3 py-2 flex flex-col items-center justify-center relative transition-all ${
                        isSelected
                          ? 'border-[#E63946] bg-[#FFF5F6]'
                          : isAllowed
                          ? 'border-[#E5E7EB] bg-white hover:bg-[#F8F9FA]'
                          : 'border-[#E5E7EB] bg-[#F3F4F6] opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <span className={`text-sm font-medium ${
                        isSelected ? 'text-[#E63946]' : isAllowed ? 'text-[#1A1A1A]' : 'text-[#9CA3AF]'
                      }`}>
                        {monthNames[monthData.month]}
                      </span>
                      
                      {/* Schedule indicator */}
                      {monthData.hasSchedule && isAllowed && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-[#28A745] rounded-full" />
                      )}
                      
                      {/* Not created indicator */}
                      {!monthData.hasSchedule && isAllowed && !isPast && (
                        <span className="text-xs text-[#9CA3AF] mt-1">Not created</span>
                      )}
                      
                      {/* Future month locked */}
                      {!isAllowed && (
                        <span className="text-xs text-[#9CA3AF] mt-1">Locked</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info Messages */}
            <div className="mt-6 space-y-3">
              {!isWithinLimit && (
                <div className="bg-[#FFF3CD] border border-[#FFA500] rounded-lg p-3 flex gap-2">
                  <AlertCircle className="w-4 h-4 text-[#856404] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#856404]">
                    Selected month is beyond the allowed range. You can only view/create schedules up to {maxAllowedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
                  </p>
                </div>
              )}
              
              {isWithinLimit && !hasSchedule && (
                <div className="bg-[#D1ECF1] border border-[#4A90E2] rounded-lg p-3 flex gap-2">
                  <AlertCircle className="w-4 h-4 text-[#0C5460] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#0C5460]">
                    No schedule created for {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}. You'll need to create one.
                  </p>
                </div>
              )}
              
              {isWithinLimit && hasSchedule && (
                <div className="bg-[#D4EDDA] border border-[#28A745] rounded-lg p-3 flex gap-2">
                  <Calendar className="w-4 h-4 text-[#155724] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#155724]">
                    Schedule exists for {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
                  </p>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
              <p className="text-xs font-medium text-[#6B7280] mb-2">Legend</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#28A745] rounded-full" />
                  <span className="text-xs text-[#6B7280]">Schedule created</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-[#E5E7EB] rounded" />
                  <span className="text-xs text-[#6B7280]">Schedule not created (available)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#F3F4F6] border-2 border-[#E5E7EB] rounded opacity-50" />
                  <span className="text-xs text-[#6B7280]">Future month (locked)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#E5E7EB] px-6 py-4 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-11 bg-white border border-[#E5E7EB] text-[#1A1A1A] rounded-lg font-medium hover:bg-[#F3F4F6] active:bg-[#E5E7EB]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isWithinLimit}
              className={`flex-1 h-11 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                isWithinLimit
                  ? 'bg-[#E63946] text-white hover:bg-[#D62835] active:bg-[#C11F2C]'
                  : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              }`}
            >
              {hasSchedule ? (
                <>
                  <Eye className="w-5 h-5" />
                  <span>View Schedule</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Create Schedule</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}