import { useState, useEffect } from 'react';
import { X, Plus, Trash2, AlertCircle } from 'lucide-react';
import type { StaffMember, StaffSchedule, ShiftType, AttendanceStatus } from './StaffSchedule';

interface EditStaffModalProps {
  staff: StaffMember;
  schedule: StaffSchedule;
  date: Date;
  onSave: (schedule: StaffSchedule) => void;
  onClose: () => void;
}

const SHIFT_TYPES: ShiftType[] = ['Morning', 'Middle', 'Afternoon', 'Night', 'All Day'];
const MAX_SHIFTS = 4;

export function EditStaffModal({ staff, schedule, date, onSave, onClose }: EditStaffModalProps) {
  const [attendance, setAttendance] = useState<AttendanceStatus>(schedule.attendance);
  const [shifts, setShifts] = useState<ShiftType[]>(schedule.shifts);
  const [showShiftSelector, setShowShiftSelector] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  // Track changes
  useEffect(() => {
    const changed = 
      attendance !== schedule.attendance || 
      JSON.stringify(shifts) !== JSON.stringify(schedule.shifts);
    setHasUnsavedChanges(changed);
  }, [attendance, shifts, schedule]);

  // Handle attendance toggle
  const handleAttendanceToggle = () => {
    const newAttendance: AttendanceStatus = attendance === 'Present' ? 'Absent' : 'Present';
    setAttendance(newAttendance);
    
    // Clear shifts if setting to Absent
    if (newAttendance === 'Absent') {
      setShifts([]);
    }
  };

  // Add shift
  const handleAddShift = (shiftType: ShiftType) => {
    // If selecting "All Day", replace all shifts with just "All Day"
    if (shiftType === 'All Day') {
      setShifts(['All Day']);
    } else if (shifts.length < MAX_SHIFTS && !shifts.includes(shiftType)) {
      setShifts([...shifts, shiftType]);
    }
    setShowShiftSelector(false);
  };

  // Remove shift
  const handleRemoveShift = (index: number) => {
    setShifts(shifts.filter((_, i) => i !== index));
  };

  // Save changes
  const handleSave = () => {
    onSave({
      ...schedule,
      attendance,
      shifts: attendance === 'Present' ? shifts : [],
    });
  };

  // Handle close with unsaved changes check
  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowDiscardDialog(true);
    } else {
      onClose();
    }
  };

  // Format date
  const formatDate = (d: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return d.toLocaleDateString('en-US', options);
  };

  // Available shifts (not yet selected)
  // If "All Day" is selected, no other shifts can be added
  const hasAllDayShift = shifts.includes('All Day');
  const availableShifts = hasAllDayShift 
    ? [] 
    : SHIFT_TYPES.filter(shift => !shifts.includes(shift));
  const canAddMoreShifts = !hasAllDayShift && shifts.length < MAX_SHIFTS && attendance === 'Present';

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom duration-250">
        <div className="bg-white rounded-t-2xl shadow-[0px_-4px_16px_rgba(0,0,0,0.12)] max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">{staff.name}</h2>
              <p className="text-xs text-[#6B7280]">{formatDate(date)}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] active:bg-[#E5E7EB] -mr-2"
            >
              <X className="w-6 h-6 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* Staff Info */}
            <div className="bg-[#F8F9FA] rounded-lg p-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <span className="text-base font-semibold text-[#1A1A1A]">
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">{staff.designation}</p>
                  <p className="text-xs text-[#6B7280]">{staff.department}</p>
                </div>
              </div>
            </div>

            {/* Attendance Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
                Attendance Status
              </label>
              <div className="flex gap-3">
                <button
                  onClick={handleAttendanceToggle}
                  className={`flex-1 h-11 rounded-lg border-2 font-medium text-sm transition-all ${
                    attendance === 'Present'
                      ? 'border-[#28A745] bg-[#D4EDDA] text-[#155724]'
                      : 'border-[#E5E7EB] bg-white text-[#6B7280]'
                  }`}
                >
                  On Duty
                </button>
                <button
                  onClick={handleAttendanceToggle}
                  className={`flex-1 h-11 rounded-lg border-2 font-medium text-sm transition-all ${
                    attendance === 'Absent'
                      ? 'border-[#9CA3AF] bg-[#E5E7EB] text-[#4B5563]'
                      : 'border-[#E5E7EB] bg-white text-[#6B7280]'
                  }`}
                >
                  Off Duty
                </button>
              </div>
            </div>

            {/* Shifts Section */}
            {attendance === 'Present' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-[#1A1A1A]">
                    Assigned Shifts ({shifts.length}/{MAX_SHIFTS})
                  </label>
                  {canAddMoreShifts && (
                    <button
                      onClick={() => setShowShiftSelector(!showShiftSelector)}
                      className="h-8 px-3 bg-[#E63946] text-white rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-[#D62835] active:bg-[#C11F2C]"
                    >
                      <Plus className="w-4 h-4" />
                      Add Shift
                    </button>
                  )}
                </div>

                {/* Shift limit warning */}
                {shifts.length >= MAX_SHIFTS && (
                  <div className="bg-[#FFF3CD] border border-[#FFA500] rounded-lg p-3 mb-3 flex gap-2">
                    <AlertCircle className="w-4 h-4 text-[#856404] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-[#856404]">
                      Maximum shift limit reached. A staff member cannot have more than {MAX_SHIFTS} shifts per day.
                    </p>
                  </div>
                )}

                {/* All Day shift info */}
                {hasAllDayShift && (
                  <div className="bg-[#D1ECF1] border border-[#4A90E2] rounded-lg p-3 mb-3 flex gap-2">
                    <AlertCircle className="w-4 h-4 text-[#0C5460] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-[#0C5460]">
                      "All Day" shift covers the entire day. No other shifts can be assigned.
                    </p>
                  </div>
                )}

                {/* Shift Selector */}
                {showShiftSelector && availableShifts.length > 0 && (
                  <div className="bg-[#F8F9FA] rounded-lg p-3 mb-3 space-y-2">
                    <p className="text-xs font-medium text-[#6B7280] mb-2">Select Shift Type</p>
                    {availableShifts.map(shift => (
                      <button
                        key={shift}
                        onClick={() => handleAddShift(shift)}
                        className="w-full h-10 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#F3F4F6] active:bg-[#E5E7EB]"
                      >
                        {shift}
                      </button>
                    ))}
                  </div>
                )}

                {/* Current Shifts */}
                {shifts.length > 0 ? (
                  <div className="space-y-2">
                    {shifts.map((shift, index) => (
                      <div
                        key={index}
                        className="bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-[#1A1A1A]">{shift}</span>
                        <button
                          onClick={() => handleRemoveShift(index)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#FEE2E2] active:bg-[#FECACA] text-[#DC3545]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#F8F9FA] rounded-lg p-6 text-center">
                    <p className="text-sm text-[#6B7280]">No shifts assigned</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">Tap "Add Shift" to assign a shift</p>
                  </div>
                )}
              </div>
            )}

            {/* Absent message */}
            {attendance === 'Absent' && (
              <div className="bg-[#F8F9FA] rounded-lg p-6 text-center">
                <p className="text-sm text-[#6B7280]">Staff member is off duty</p>
                <p className="text-xs text-[#9CA3AF] mt-1">No shifts can be assigned when off duty</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#E5E7EB] px-6 py-4 flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 h-11 bg-white border border-[#E5E7EB] text-[#1A1A1A] rounded-lg font-medium hover:bg-[#F3F4F6] active:bg-[#E5E7EB]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className={`flex-1 h-11 rounded-lg font-medium transition-colors ${
                hasUnsavedChanges
                  ? 'bg-[#E63946] text-white hover:bg-[#D62835] active:bg-[#C11F2C]'
                  : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Discard Changes Dialog */}
      {showDiscardDialog && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">Discard Changes?</h3>
              <p className="text-sm text-[#6B7280] mb-6">
                You have unsaved changes. Are you sure you want to discard them?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDiscardDialog(false)}
                  className="flex-1 h-11 bg-white border border-[#E5E7EB] text-[#1A1A1A] rounded-lg font-medium hover:bg-[#F3F4F6]"
                >
                  Keep Editing
                </button>
                <button
                  onClick={() => {
                    setShowDiscardDialog(false);
                    onClose();
                  }}
                  className="flex-1 h-11 bg-[#DC3545] text-white rounded-lg font-medium hover:bg-[#C82333]"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}