import { useState } from 'react';
import { X, Check } from 'lucide-react';

interface FilterModalProps {
  departments: string[];
  designations: string[];
  selectedDepartment: string;
  selectedDesignation: string;
  onApply: (department: string, designation: string) => void;
  onClose: () => void;
}

export function FilterModal({
  departments,
  designations,
  selectedDepartment,
  selectedDesignation,
  onApply,
  onClose,
}: FilterModalProps) {
  const [tempDepartment, setTempDepartment] = useState(selectedDepartment);
  const [tempDesignation, setTempDesignation] = useState(selectedDesignation);

  const handleApply = () => {
    onApply(tempDepartment, tempDesignation);
  };

  const handleReset = () => {
    setTempDepartment('All');
    setTempDesignation('All');
  };

  const hasActiveFilters = tempDepartment !== 'All' || tempDesignation !== 'All';

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
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Filter Staff</h2>
            <button
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] active:bg-[#E5E7EB] -mr-2"
            >
              <X className="w-6 h-6 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* Department Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
                Department
              </label>
              <div className="space-y-2">
                {departments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setTempDepartment(dept)}
                    className={`w-full h-11 rounded-lg border-2 px-4 flex items-center justify-between font-medium text-sm transition-all ${
                      tempDepartment === dept
                        ? 'border-[#E63946] bg-[#FFF5F6] text-[#E63946]'
                        : 'border-[#E5E7EB] bg-white text-[#1A1A1A] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <span>{dept}</span>
                    {tempDepartment === dept && (
                      <Check className="w-5 h-5" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Designation Filter */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
                Designation
              </label>
              <div className="space-y-2">
                {designations.map(desig => (
                  <button
                    key={desig}
                    onClick={() => setTempDesignation(desig)}
                    className={`w-full h-11 rounded-lg border-2 px-4 flex items-center justify-between font-medium text-sm transition-all ${
                      tempDesignation === desig
                        ? 'border-[#E63946] bg-[#FFF5F6] text-[#E63946]'
                        : 'border-[#E5E7EB] bg-white text-[#1A1A1A] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <span>{desig}</span>
                    {tempDesignation === desig && (
                      <Check className="w-5 h-5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#E5E7EB] px-6 py-4 flex gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="h-11 px-4 bg-white border border-[#E5E7EB] text-[#1A1A1A] rounded-lg font-medium hover:bg-[#F3F4F6] active:bg-[#E5E7EB]"
              >
                Reset
              </button>
            )}
            <button
              onClick={handleApply}
              className="flex-1 h-11 bg-[#E63946] text-white rounded-lg font-medium hover:bg-[#D62835] active:bg-[#C11F2C]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
