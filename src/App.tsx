import { useState } from 'react';
import { 
  Calendar, 
  Hotel, 
  Users, 
  ClipboardList, 
  Settings, 
  FileText,
  BellRing,
  BarChart3 
} from 'lucide-react';
import { StaffScheduleWeekly } from './components/StaffScheduleWeeklyV3';

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [showStaffSchedule, setShowStaffSchedule] = useState(false);

  const features = [
    { id: 'room-status', icon: Hotel, label: 'Room Status' },
    { id: 'reservation', icon: ClipboardList, label: 'Reservation' },
    { id: 'guest-list', icon: Users, label: 'Guest List' },
    { id: 'staff-schedule', icon: Calendar, label: 'Staff Schedule' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'notifications', icon: BellRing, label: 'Notifications' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleFeatureClick = (featureId: string) => {
    setSelectedFeature(featureId);
    if (featureId === 'staff-schedule') {
      setShowStaffSchedule(true);
    } else {
      // Other features - coming soon
      alert(`${featureId} feature - Coming soon!`);
    }
  };

  // Show Staff Schedule page (Weekly View V2)
  if (showStaffSchedule) {
    return <StaffScheduleWeekly onBack={() => setShowStaffSchedule(false)} />;
  }

  // Show Homepage
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE5E8] to-[#FFF5F6]">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.08)] flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold text-[#1A1A1A]">Grow Apps</h1>
        <button className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] active:bg-[#E5E7EB] transition-colors">
          <Settings className="w-6 h-6 text-[#1A1A1A]" />
        </button>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-6 pb-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A] leading-8">Welcome Back</h2>
          <p className="text-sm text-[#6B7280] mt-1 leading-5">Manage your hotel operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.08)] p-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FFF3CD] rounded-lg flex items-center justify-center">
                <Hotel className="w-6 h-6 text-[#FFA500]" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] leading-4">Occupied Rooms</p>
                <p className="text-xl font-semibold text-[#1A1A1A] leading-7">24/30</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.08)] p-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#D1ECF1] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#4A90E2]" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] leading-4">Today's Guests</p>
                <p className="text-xl font-semibold text-[#1A1A1A] leading-7">42</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4 leading-6">Quick Access</h3>
          
          {/* Icon Grid - 4 columns as per guidelines */}
          <div className="grid grid-cols-4 gap-3">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(feature.id)}
                className={`
                  bg-white rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.08)] 
                  p-3 flex flex-col items-center justify-center gap-2
                  active:scale-95 transition-transform
                  hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)]
                  ${selectedFeature === feature.id ? 'ring-2 ring-[#E63946]' : ''}
                `}
              >
                <feature.icon 
                  className="w-8 h-8 text-[#E63946]" 
                  strokeWidth={2}
                />
                <span className="text-xs text-[#1A1A1A] text-center leading-4">
                  {feature.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4 leading-6">Recent Activity</h3>
          <div className="bg-white rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
            {[
              { title: 'New Reservation', subtitle: 'Room 101 - John Doe', time: '10 min ago' },
              { title: 'Check-out Completed', subtitle: 'Room 205 - Jane Smith', time: '1 hour ago' },
              { title: 'Maintenance Request', subtitle: 'Room 303 - AC Repair', time: '2 hours ago' },
            ].map((activity, index) => (
              <div
                key={index}
                className={`
                  px-4 py-3 flex items-center justify-between gap-3
                  ${index < 2 ? 'border-b border-[#E5E7EB]' : ''}
                `}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A1A] leading-5">
                    {activity.title}
                  </p>
                  <p className="text-xs text-[#6B7280] leading-4 truncate">
                    {activity.subtitle}
                  </p>
                </div>
                <span className="text-xs text-[#9CA3AF] leading-4 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}