import { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Download, 
  Plus,
  X,
  Calendar as CalendarIcon
} from 'lucide-react';
import { EditStaffModal } from './EditStaffModal';
import { FilterModal } from './FilterModal';
import { CreateScheduleModal } from './CreateScheduleModal';
import { ExportModal } from './ExportModal';

// Types
export type ShiftType = 'Morning' | 'Middle' | 'Afternoon' | 'Night' | 'All Day';
export type AttendanceStatus = 'Present' | 'Absent';

export interface StaffMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  photo?: string;
}

export interface StaffSchedule {
  staffId: string;
  date: string;
  attendance: AttendanceStatus;
  shifts: ShiftType[];
}

interface StaffScheduleProps {
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
  { id: '8', name: 'Anna Martinez', designation: 'Housekeeper', department: 'Housekeeping' },
];

const DEPARTMENTS = ['All', 'Reception', 'Kitchen', 'Housekeeping', 'Restaurant', 'Management'];
const DESIGNATIONS = ['All', 'Front Desk', 'Chef', 'Housekeeper', 'Waiter', 'Manager', 'Receptionist', 'Cook'];

export function StaffSchedule({ onBack }: StaffScheduleProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedDesignation, setSelectedDesignation] = useState('All');
  
  // Schedule state - key: "staffId-YYYY-MM-DD"
  const [schedules, setSchedules] = useState<Record<string, StaffSchedule>>(() => {
    // Initialize with some default data for current month
    const initial: Record<string, StaffSchedule> = {};
    const today = new Date();
    
    STAFF_DATA.forEach(staff => {
      const dateKey = today.toISOString().split('T')[0];
      const key = `${staff.id}-${dateKey}`;
      initial[key] = {
        staffId: staff.id,
        date: dateKey,
        attendance: 'Present',
        shifts: ['Morning'],
      };
    });
    
    return initial;
  });

  // Check if schedule exists for current month
  const hasScheduleForMonth = useMemo(() => {
    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    return Object.keys(schedules).some(key => key.includes(monthKey));
  }, [schedules, currentDate]);

  // Filter staff based on selected filters
  const filteredStaff = useMemo(() => {
    return STAFF_DATA.filter(staff => {
      const departmentMatch = selectedDepartment === 'All' || staff.department === selectedDepartment;
      const designationMatch = selectedDesignation === 'All' || staff.designation === selectedDesignation;
      return departmentMatch && designationMatch;
    });
  }, [selectedDepartment, selectedDesignation]);

  // Navigation handlers
  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    
    // Check if next day exceeds current month + 1
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0); // Last day of next month
    
    if (newDate <= maxDate) {
      setCurrentDate(newDate);
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Get schedule for a staff member on current date
  const getStaffSchedule = (staffId: string): StaffSchedule => {
    const dateKey = currentDate.toISOString().split('T')[0];
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
    const dateKey = currentDate.toISOString().split('T')[0];
    const key = `${staffId}-${dateKey}`;
    setSchedules(prev => ({
      ...prev,
      [key]: schedule,
    }));
  };

  // Create new month schedule
  const handleCreateSchedule = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
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
            shifts: ['Morning'], // Default 1 shift
          };
        }
      }
    });
    
    setSchedules(newSchedules);
    setShowCreateSchedule(false);
  };

  // Format date display
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatMonthYear = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  // Check if we can navigate forward
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  const canGoForward = currentDate < maxDate;

  // Count active filters
  const activeFiltersCount = (selectedDepartment !== 'All' ? 1 : 0) + (selectedDesignation !== 'All' ? 1 : 0);

  // Calculate statistics
  const todayStats = useMemo(() => {
    const dateKey = currentDate.toISOString().split('T')[0];
    let presentCount = 0;
    let absentCount = 0;
    
    filteredStaff.forEach(staff => {
      const key = `${staff.id}-${dateKey}`;
      const schedule = schedules[key];
      if (schedule?.attendance === 'Present') {
        presentCount++;
      } else if (schedule?.attendance === 'Absent') {
        absentCount++;
      }
    });
    
    return { presentCount, absentCount, totalCount: filteredStaff.length };
  }, [currentDate, filteredStaff, schedules]);

  // Show create schedule modal if no schedule exists
  if (!hasScheduleForMonth && !showCreateSchedule) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFE5E8] to-[#FFF5F6]">
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

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center px-4 pt-24">
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

        {/* Create Schedule Confirmation Modal */}
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

      {/* Date Navigation */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handlePreviousDay}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] active:bg-[#E5E7EB]"
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          
          <div className="text-center">
            <p className="text-sm font-semibold text-[#1A1A1A]">{formatDate(currentDate)}</p>
            <p className="text-xs text-[#6B7280]">{formatMonthYear(currentDate)}</p>
          </div>

          <button
            onClick={handleNextDay}
            disabled={!canGoForward}
            className={`w-11 h-11 flex items-center justify-center rounded-lg ${
              canGoForward 
                ? 'hover:bg-[#F3F4F6] active:bg-[#E5E7EB]' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-6 h-6 text-[#1A1A1A]" />
          </button>
        </div>

        <button
          onClick={handleToday}
          className="w-full h-9 bg-[#F8F9FA] text-[#E63946] text-sm font-medium rounded-lg hover:bg-[#E5E7EB] active:bg-[#D1D5DB]"
        >
          Today
        </button>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xs text-[#6B7280] mb-1">Total Staff</p>
            <p className="text-lg font-semibold text-[#1A1A1A]">{todayStats.totalCount}</p>
          </div>
          <div className="text-center border-l border-r border-[#E5E7EB]">
            <p className="text-xs text-[#6B7280] mb-1">On Duty</p>
            <p className="text-lg font-semibold text-[#28A745]">{todayStats.presentCount}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[#6B7280] mb-1">Off Duty</p>
            <p className="text-lg font-semibold text-[#9CA3AF]">{todayStats.absentCount}</p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-4 py-3 flex gap-2">
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex-1 h-11 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center gap-2 hover:bg-[#F3F4F6] active:bg-[#E5E7EB] relative"
        >
          <Filter className="w-5 h-5 text-[#1A1A1A]" />
          <span className="text-sm font-medium text-[#1A1A1A]">Filter</span>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E63946] text-white text-xs rounded-full flex items-center justify-center font-semibold">
              {activeFiltersCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setShowExportModal(true)}
          className="h-11 px-4 bg-[#E63946] text-white rounded-lg flex items-center gap-2 hover:bg-[#D62835] active:bg-[#C11F2C]"
        >
          <Download className="w-5 h-5" />
          <span className="text-sm font-medium">Export</span>
        </button>
      </div>

      {/* Staff List */}
      <div className="px-4">
        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
          Staff Members ({filteredStaff.length})
        </h3>
        
        <div className="space-y-3">
          {filteredStaff.map(staff => {
            const schedule = getStaffSchedule(staff.id);
            const isPresent = schedule.attendance === 'Present';
            
            return (
              <button
                key={staff.id}
                onClick={() => setSelectedStaff(staff)}
                className="w-full bg-white rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.08)] p-4 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] active:scale-[0.98] transition-all"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[#1A1A1A]">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-[#1A1A1A]">{staff.name}</p>
                      <span 
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          isPresent 
                            ? 'bg-[#D4EDDA] text-[#155724]' 
                            : 'bg-[#E5E7EB] text-[#4B5563]'
                        }`}
                      >
                        {schedule.attendance}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] mb-2">
                      {staff.designation} • {staff.department}
                    </p>
                    
                    {/* Shifts */}
                    {isPresent && schedule.shifts.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {schedule.shifts.map((shift, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-[#FFF3CD] text-[#856404] text-xs rounded font-medium"
                          >
                            {shift}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {isPresent && schedule.shifts.length === 0 && (
                      <p className="text-xs text-[#9CA3AF]">No shifts assigned</p>
                    )}
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-[#9CA3AF] flex-shrink-0 mt-2" />
                </div>
              </button>
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
      {selectedStaff && (
        <EditStaffModal
          staff={selectedStaff}
          schedule={getStaffSchedule(selectedStaff.id)}
          date={currentDate}
          onSave={(schedule) => {
            handleUpdateSchedule(selectedStaff.id, schedule);
            setSelectedStaff(null);
          }}
          onClose={() => setSelectedStaff(null)}
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

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          month={formatMonthYear(currentDate)}
          onExport={() => {
            // Simulate PDF generation
            setTimeout(() => {
              alert('PDF exported successfully!');
              setShowExportModal(false);
            }, 1500);
          }}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Create Schedule Confirmation Modal */}
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