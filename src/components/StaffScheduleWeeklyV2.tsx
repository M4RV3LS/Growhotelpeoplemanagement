import { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Calendar as CalendarIcon,
} from 'lucide-react';
import { EditStaffModal } from './EditStaffModal';
import { FilterModal } from './FilterModal';
import { CreateScheduleModal } from './CreateScheduleModal';
import { MonthYearSelector } from './MonthYearSelector';
import type { StaffMember, StaffSchedule, ShiftType } from './StaffSchedule';

interface StaffScheduleWeeklyProps {
  onBack: () => void;
}

// Mock data
const STAFF_DATA: StaffMember[] = [
  { id: '1', name: 'John Smith', designation: 'Front Desk', department: 'Reception' },
  { id: '2', name: 'Sarah Johnson', designation: 'Chef', department: 'Kitchen' },
  { id: '3', name: 'Mike Chen', designation: 'Housekeeper', department: 'Housekeeping' },
  { id: '4', name: 'Emily Davis', designation: 'Waiter', department: 'Restaurant' },
  { id: '5', name: 'David Wilson', designation: 'Manager', department: 'Management' },
  { id: '6', name: 'Lisa Anderson', designation: 'Receptionist', department: 'Reception' },
  { id: '7', name: 'Tom Brown', designation: 'Cook', department: 'Kitchen' },
  { id: '8', name: 'Anna Martinez', designation: 'Housekeeper', department: 'Housekeeping'},
];

const DEPARTMENTS = ['All', 'Reception', 'Kitchen', 'Housekeeping', 'Restaurant', 'Management'];
const DESIGNATIONS = ['All', 'Front Desk', 'Chef', 'Housekeeper', 'Waiter', 'Manager', 'Receptionist', 'Cook'];

// Helper functions
function getWeekIndexForDate(date: Date): number {
  const dayOfMonth = date.getDate();
  return Math.floor((dayOfMonth - 1) / 7);
}

function getTotalWeeksInMonth(year: number, month: number): number {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Math.ceil(daysInMonth / 7);
}

function getCurrentWeekDates(weekIndex: number, year: number, month: number): Date[] {
  const dates: Date[] = [];
  const startDay = weekIndex * 7 + 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let i = 0; i < 7; i++) {
    const day = startDay + i;
    if (day <= daysInMonth) {
      dates.push(new Date(year, month, day));
    }
  }
  
  return dates;
}

// Get shift abbreviation for compact display
function getShiftAbbrev(shift: ShiftType): string {
  const abbrevMap: Record<ShiftType, string> = {
    'Morning': 'M',
    'Middle': 'Mid',
    'Afternoon': 'A',
    'Night': 'N',
    'All Day': 'All'
  };
  return abbrevMap[shift] || shift[0];
}

export function StaffScheduleWeekly({ onBack }: StaffScheduleWeeklyProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeekIndex, setCurrentWeekIndex] = useState(() => 
    getWeekIndexForDate(new Date())
  );
  
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedDesignation, setSelectedDesignation] = useState('All');
  
  // Schedule state with auto-generation for current and past months
  const [schedules, setSchedules] = useState<Record<string, StaffSchedule>>(() => {
    const initial: Record<string, StaffSchedule> = {};
    const today = new Date();
    
    // Auto-generate for current month
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    STAFF_DATA.forEach((staff, staffIdx) => {
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = date.toISOString().split('T')[0];
        const key = `${staff.id}-${dateKey}`;
        
        // Varied data for demo
        const isPresent = Math.random() > 0.2;
        const shiftCount = isPresent ? Math.floor(Math.random() * 3) + 1 : 0;
        const shifts: ShiftType[] = [];
        
        if (isPresent && shiftCount > 0) {
          const allShifts: ShiftType[] = ['Morning', 'Middle', 'Afternoon', 'Night'];
          for (let i = 0; i < shiftCount && i < allShifts.length; i++) {
            shifts.push(allShifts[i]);
          }
        }
        
        initial[key] = {
          staffId: staff.id,
          date: dateKey,
          attendance: isPresent ? 'Present' : 'Absent',
          shifts,
        };
      }
    });
    
    return initial;
  });

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const totalWeeks = getTotalWeeksInMonth(currentYear, currentMonth);
  const currentWeekDates = getCurrentWeekDates(currentWeekIndex, currentYear, currentMonth);

  // Check if schedule exists for current month
  const hasScheduleForMonth = useMemo(() => {
    const monthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    return Object.keys(schedules).some(key => key.includes(monthKey));
  }, [schedules, currentYear, currentMonth]);

  // Filter staff
  const filteredStaff = useMemo(() => {
    return STAFF_DATA.filter(staff => {
      const departmentMatch = selectedDepartment === 'All' || staff.department === selectedDepartment;
      const designationMatch = selectedDesignation === 'All' || staff.designation === selectedDesignation;
      return departmentMatch && designationMatch;
    });
  }, [selectedDepartment, selectedDesignation]);

  // Week navigation
  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < totalWeeks - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  const handleThisWeek = () => {
    const today = new Date();
    if (today.getMonth() === currentMonth && today.getFullYear() === currentYear) {
      setCurrentWeekIndex(getWeekIndexForDate(today));
    }
  };

  // Month selection handler
  const handleMonthSelect = (year: number, month: number) => {
    setCurrentDate(new Date(year, month, 1));
    setCurrentWeekIndex(0);
    setShowMonthSelector(false);
  };

  // Get schedule for a staff member on a specific date
  const getStaffSchedule = (staffId: string, date: Date): StaffSchedule => {
    const dateKey = date.toISOString().split('T')[0];
    const key = `${staffId}-${dateKey}`;
    return schedules[key] || {
      staffId,
      date: dateKey,
      attendance: 'Present',
      shifts: [],
    };
  };

  // Update schedule
  const handleUpdateSchedule = (staffId: string, schedule: StaffSchedule) => {
    const dateKey = schedule.date;
    const key = `${staffId}-${dateKey}`;
    setSchedules(prev => ({
      ...prev,
      [key]: schedule,
    }));
  };

  // Get aggregated data for a staff member across the week
  const getWeeklyStaffData = (staffId: string) => {
    let totalShifts = 0;
    let presentDays = 0;
    let absentDays = 0;
    
    currentWeekDates.forEach(date => {
      const schedule = getStaffSchedule(staffId, date);
      if (schedule.attendance === 'Present') {
        presentDays++;
        totalShifts += schedule.shifts.length;
      } else {
        absentDays++;
      }
    });
    
    return { totalShifts, presentDays, absentDays };
  };

  // Create new month schedule
  const handleCreateSchedule = () => {
    const year = currentYear;
    const month = currentMonth;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const newSchedules: Record<string, StaffSchedule> = { ...schedules };
    
    STAFF_DATA.forEach(staff => {
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = date.toISOString().split('T')[0];
        const key = `${staff.id}-${dateKey}`;
        
        if (!newSchedules[key]) {
          newSchedules[key] = {
            staffId: staff.id,
            date: dateKey,
            attendance: 'Present',
            shifts: ['Morning'],
          };
        }
      }
    });
    
    setSchedules(newSchedules);
    setShowCreateSchedule(false);
  };

  // Format date displays
  const formatDateRange = () => {
    if (currentWeekDates.length === 0) return '';
    const start = currentWeekDates[0];
    const end = currentWeekDates[currentWeekDates.length - 1];
    
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return `${startStr} - ${endStr}`;
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  // Calculate statistics
  const weeklyStats = useMemo(() => {
    const stats = {
      totalWorkingDays: 0,
      avgPresent: 0,
      totalShifts: 0,
    };
    
    currentWeekDates.forEach(date => {
      let presentCount = 0;
      let shiftCount = 0;
      
      filteredStaff.forEach(staff => {
        const schedule = getStaffSchedule(staff.id, date);
        if (schedule.attendance === 'Present') {
          presentCount++;
          shiftCount += schedule.shifts.length;
        }
      });
      
      stats.totalWorkingDays++;
      stats.avgPresent += presentCount;
      stats.totalShifts += shiftCount;
    });
    
    if (stats.totalWorkingDays > 0) {
      stats.avgPresent = Math.round(stats.avgPresent / stats.totalWorkingDays);
    }
    
    return stats;
  }, [currentWeekDates, filteredStaff, schedules]);

  // Check navigation limits
  const canGoToPrevWeek = currentWeekIndex > 0;
  const canGoToNextWeek = currentWeekIndex < totalWeeks - 1;
  
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  const canGoToNextMonth = new Date(currentYear, currentMonth + 1, 1) <= maxDate;

  const activeFiltersCount = (selectedDepartment !== 'All' ? 1 : 0) + (selectedDesignation !== 'All' ? 1 : 0);

  // Show create schedule modal if no schedule exists
  if (!hasScheduleForMonth && !showCreateSchedule) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFE5E8] to-[#FFF5F6]">
        <header className="h-14 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.08)] flex items-center px-4 sticky top-0 z-10">
          <button
            onClick={onBack}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] active:bg-[#E5E7EB] -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-[#1A1A1A] -ml-11">
            Staff Schedule
          </h1>
        </header>

        {/* Month Selector Button - Always visible */}
        <div className="px-4 py-3 bg-white border-b border-[#E5E7EB]">
          <button
            onClick={() => setShowMonthSelector(true)}
            className="w-full h-11 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center gap-2 hover:bg-[#F3F4F6] active:bg-[#E5E7EB]"
          >
            <CalendarIcon className="w-5 h-5 text-[#E63946]" />
            <span className="text-sm font-medium text-[#1A1A1A]">{formatMonthYear(currentDate)}</span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center px-4 pt-16">
          <div className="w-20 h-20 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-6">
            <CalendarIcon className="w-10 h-10 text-[#9CA3AF]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">No Schedule Created</h2>
          <p className="text-sm text-[#6B7280] text-center mb-6 max-w-xs">
            Create a schedule for {formatMonthYear(currentDate)} to start managing staff shifts
          </p>
          <button
            onClick={() => setShowCreateSchedule(true)}
            className="h-11 px-6 bg-[#E63946] text-white rounded-lg font-medium hover:bg-[#D62835] active:bg-[#C11F2C] transition-colors"
          >
            Create Schedule
          </button>
        </div>

        {/* Month Selector Modal */}
        {showMonthSelector && (
          <MonthYearSelector
            currentDate={currentDate}
            existingSchedules={schedules}
            onConfirm={handleMonthSelect}
            onClose={() => setShowMonthSelector(false)}
          />
        )}

        {showCreateSchedule && (
          <CreateScheduleModal
            month={formatMonthYear(currentDate)}
            onConfirm={handleCreateSchedule}
            onCancel={() => setShowCreateSchedule(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE5E8] to-[#FFF5F6] pb-6">
      {/* Header */}
      <header className="h-14 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.08)] flex items-center px-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] active:bg-[#E5E7EB] -ml-2"
        >
          <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-[#1A1A1A] -ml-11">
          Staff Schedule
        </h1>
      </header>

      {/* Month Selector Button */}
      <div className="px-4 py-3 bg-white border-b border-[#E5E7EB]">
        <button
          onClick={() => setShowMonthSelector(true)}
          className="w-full h-11 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center gap-2 hover:bg-[#F3F4F6] active:bg-[#E5E7EB]"
        >
          <CalendarIcon className="w-5 h-5 text-[#E63946]" />
          <span className="text-sm font-medium text-[#1A1A1A]">{formatMonthYear(currentDate)}</span>
          <span className="text-xs text-[#6B7280]">(Week {currentWeekIndex + 1} of {totalWeeks})</span>
        </button>
      </div>

      {/* Week Navigation */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handlePreviousWeek}
            disabled={!canGoToPrevWeek}
            className={`w-11 h-11 flex items-center justify-center rounded-lg ${
              canGoToPrevWeek 
                ? 'hover:bg-[#F3F4F6] active:bg-[#E5E7EB]' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          
          <div className="text-center">
            <p className="text-sm font-semibold text-[#1A1A1A]">{formatDateRange()}</p>
            <p className="text-xs text-[#6B7280]">{currentWeekDates.length} days</p>
          </div>

          <button
            onClick={handleNextWeek}
            disabled={!canGoToNextWeek}
            className={`w-11 h-11 flex items-center justify-center rounded-lg ${
              canGoToNextWeek 
                ? 'hover:bg-[#F3F4F6] active:bg-[#E5E7EB]' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-6 h-6 text-[#1A1A1A]" />
          </button>
        </div>

        <button
          onClick={handleThisWeek}
          className="w-full h-9 bg-[#F8F9FA] text-[#E63946] text-sm font-medium rounded-lg hover:bg-[#E5E7EB] active:bg-[#D1D5DB]"
        >
          This Week
        </button>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <p className="text-xs text-[#6B7280] mb-1">Avg Present/Day</p>
            <p className="text-lg font-semibold text-[#28A745]">{weeklyStats.avgPresent}</p>
          </div>
          <div className="text-center border-l border-[#E5E7EB]">
            <p className="text-xs text-[#6B7280] mb-1">Total Shifts</p>
            <p className="text-lg font-semibold text-[#E63946]">{weeklyStats.totalShifts}</p>
          </div>
        </div>
      </div>

      {/* Action Bar - Filter only */}
      <div className="px-4 py-3">
        <button
          onClick={() => setShowFilterModal(true)}
          className="w-full h-11 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center gap-2 hover:bg-[#F3F4F6] active:bg-[#E5E7EB] relative"
        >
          <Filter className="w-5 h-5 text-[#1A1A1A]" />
          <span className="text-sm font-medium text-[#1A1A1A]">Filter Staff</span>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E63946] text-white text-xs rounded-full flex items-center justify-center font-semibold">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Staff List - Weekly View with visible shifts */}
      <div className="px-4">
        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
          Staff Members ({filteredStaff.length})
        </h3>
        
        <div className="space-y-3">
          {filteredStaff.map(staff => {
            const weekData = getWeeklyStaffData(staff.id);
            
            return (
              <div
                key={staff.id}
                className="bg-white rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.08)] p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[#1A1A1A]">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">{staff.name}</p>
                    <p className="text-xs text-[#6B7280]">
                      {staff.designation} • {staff.department}
                    </p>
                  </div>
                </div>

                {/* Weekly Summary */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-1">
                    <p className="text-xs text-[#6B7280] mb-1">Present Days</p>
                    <p className="text-sm font-semibold text-[#28A745]">
                      {weekData.presentDays}/{currentWeekDates.length}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#6B7280] mb-1">Total Shifts</p>
                    <p className="text-sm font-semibold text-[#E63946]">
                      {weekData.totalShifts}
                    </p>
                  </div>
                </div>

                {/* Day-by-day breakdown with visible shifts */}
                <div className="border-t border-[#E5E7EB] pt-3">
                  <div className="grid grid-cols-7 gap-1">
                    {currentWeekDates.map((date, idx) => {
                      const schedule = getStaffSchedule(staff.id, date);
                      const dayName = date.toLocaleDateString('en-US', { weekday: 'narrow' });
                      const dayNum = date.getDate();
                      const isPresent = schedule.attendance === 'Present';
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedStaff(staff);
                            setSelectedDate(date);
                          }}
                          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border-2 transition-all ${
                            isPresent 
                              ? 'border-[#28A745] bg-[#D4EDDA]' 
                              : 'border-[#E5E7EB] bg-[#F8F9FA]'
                          }`}
                        >
                          <span className="text-xs font-medium text-[#6B7280]">{dayName}</span>
                          <span className={`text-sm font-semibold ${
                            isPresent ? 'text-[#155724]' : 'text-[#9CA3AF]'
                          }`}>
                            {dayNum}
                          </span>
                          {/* Show shift abbreviations */}
                          {isPresent && schedule.shifts.length > 0 && (
                            <div className="flex flex-wrap gap-0.5 mt-1 justify-center">
                              {schedule.shifts.map((shift, sidx) => (
                                <span
                                  key={sidx}
                                  className="text-xs font-semibold text-[#856404] bg-[#FFF3CD] px-1 rounded"
                                  title={shift}
                                >
                                  {getShiftAbbrev(shift)}
                                </span>
                              ))}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredStaff.length === 0 && (
          <div className="bg-white rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.08)] p-8 text-center">
            <p className="text-sm text-[#6B7280]">No staff members match your filters</p>
            <button
              onClick={() => {
                setSelectedDepartment('All');
                setSelectedDesignation('All');
              }}
              className="mt-3 text-sm text-[#E63946] font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Edit Staff Modal */}
      {selectedStaff && selectedDate && (
        <EditStaffModal
          staff={selectedStaff}
          schedule={getStaffSchedule(selectedStaff.id, selectedDate)}
          date={selectedDate}
          onSave={(schedule) => {
            handleUpdateSchedule(selectedStaff.id, schedule);
            setSelectedStaff(null);
            setSelectedDate(null);
          }}
          onClose={() => {
            setSelectedStaff(null);
            setSelectedDate(null);
          }}
        />
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          departments={DEPARTMENTS}
          designations={DESIGNATIONS}
          selectedDepartment={selectedDepartment}
          selectedDesignation={selectedDesignation}
          onApply={(dept, desig) => {
            setSelectedDepartment(dept);
            setSelectedDesignation(desig);
            setShowFilterModal(false);
          }}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {/* Month Selector Modal */}
      {showMonthSelector && (
        <MonthYearSelector
          currentDate={currentDate}
          existingSchedules={schedules}
          onConfirm={handleMonthSelect}
          onClose={() => setShowMonthSelector(false)}
        />
      )}

      {/* Create Schedule Modal */}
      {showCreateSchedule && (
        <CreateScheduleModal
          month={formatMonthYear(currentDate)}
          onConfirm={handleCreateSchedule}
          onCancel={() => setShowCreateSchedule(false)}
        />
      )}
    </div>
  );
}
