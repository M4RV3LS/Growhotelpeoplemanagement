# Staff Schedule: View Modes Comparison

## Overview
The Staff Schedule feature supports two distinct view modes, each optimized for different use cases.

---

## 📊 Feature Comparison Table

| Feature | Daily View | Weekly View |
|---------|-----------|-------------|
| **Primary Use Case** | Quick daily check-ins | Weekly planning & overview |
| **Date Navigation** | Day-by-day (← →) | Week-by-week (← →) |
| **Date Display** | Single date (e.g., "Dec 9") | Date range (e.g., "Dec 8 - Dec 14") |
| **Staff Display** | List with today's shifts | List with weekly aggregates |
| **Statistics** | Today's total/on/off | Weekly avg/total shifts |
| **Edit Granularity** | Click staff → Edit that day | Click day cell → Edit that day |
| **Month Boundaries** | Seamless day-to-day | Week index resets at month change |
| **Data Density** | Low (1 day) | High (7 days) |
| **Scroll Length** | Medium (8 staff cards) | Long (8 cards × weekly data) |
| **Best For** | "Who's working today?" | "What's the coverage this week?" |

---

## 🎯 When to Use Each View

### Use Daily View When:
✅ **Quick Check**: "Is John working today?"  
✅ **Day Management**: Making changes for today/tomorrow  
✅ **Simple Context**: Don't need week-level perspective  
✅ **Fast Navigation**: Jumping between specific dates  
✅ **Single Day Focus**: Managing one day's schedule  

### Use Weekly View When:
✅ **Planning Ahead**: Looking at upcoming week coverage  
✅ **Pattern Recognition**: Seeing shift distribution over time  
✅ **Weekly Reports**: Understanding week-level metrics  
✅ **Bulk Review**: Checking multiple days at once  
✅ **Aggregate Data**: Total shifts, attendance rates  

---

## 📱 Visual Comparison

### Daily View Layout
```
┌─────────────────────────────────┐
│  ← Staff Schedule              │
├─────────────────────────────────┤
│  ← [Thu, Dec 9, 2025] →        │
│        December 2025            │
│        [Today Button]           │
├─────────────────────────────────┤
│  Total: 8  | On: 6 | Off: 2    │ ← Today's stats
├─────────────────────────────────┤
│  [Filter] [Export PDF]          │
├─────────────────────────────────┤
│  Staff Members (8)              │
│                                 │
│  ┌─────────────────────────┐   │
│  │ JS  John Smith  ✅       │   │
│  │     Front Desk • Recep  │   │
│  │     [Morning] [Middle]  │   │ ← Today's shifts
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ SC  Sarah Chen  ⚪       │   │
│  │     Chef • Kitchen      │   │
│  │     Off Duty            │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Weekly View Layout
```
┌─────────────────────────────────┐
│  ← Staff Schedule              │
├─────────────────────────────────┤
│  ← [December 2025] →            │
│       Week 2 of 5               │
├─────────────────────────────────┤
│  ← [Dec 8 - Dec 14] →          │
│          7 days                 │
│     [This Week Button]          │
├─────────────────────────────────┤
│ Avg/Day | On Duty | Total Shifts│ ← Weekly stats
│    6    |    6    |     42      │
├─────────────────────────────────┤
│  [Filter] [Export PDF]          │
├─────────────────────────────────┤
│  Staff Members (8)              │
│                                 │
│  ┌─────────────────────────┐   │
│  │ JS  John Smith    71%   │   │ ← Attendance rate
│  │     Front Desk • Recep  │   │
│  │                         │   │
│  │ Present  Shifts  Types  │   │ ← Weekly summary
│  │   5/7      12      3    │   │
│  │                         │   │
│  │ M  T  W  T  F  S  S    │   │ ← Day-by-day grid
│  │ 8  9 10 11 12 13 14    │   │
│  │ ✅ ✅ ❌ ✅ ✅ ✅ ✅    │   │
│  │ 2  3     2  2  2  1    │   │ ← Shift counts
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

---

## 🔄 Navigation Comparison

### Daily View Navigation
```
Navigation Pattern: Linear (day-by-day)

Dec 7 ← [Dec 8] → Dec 9

Actions:
- ← : Previous day
- → : Next day
- [Today] : Jump to current date

Boundaries:
- Can navigate to any date
- Month changes are seamless
- Limited to Current Month + 1
```

### Weekly View Navigation
```
Navigation Pattern: Chunked (week-by-week)

Horizontal (Week):
Week 1 ← [Week 2] → Week 3

Vertical (Month):
November ↑ [December] ↓ January

Actions:
- ← : Previous week (disabled at Week 0)
- → : Next week (disabled at last week)
- [This Week] : Jump to week containing today
- Month ← → : Change month (resets to Week 0)

Boundaries:
- Week index: 0 to totalWeeks-1
- Month limited to Current Month + 1
- Week resets when changing months
```

---

## 📊 Data Representation

### Daily View: Snapshot
```
John Smith - Dec 9, 2025
├── Attendance: Present ✅
└── Shifts: [Morning] [Middle]

Focus: "What is happening TODAY?"
```

### Weekly View: Aggregate
```
John Smith - Dec 8-14, 2025
├── Attendance Rate: 71% (5/7 days)
├── Total Shifts: 12 shifts
├── Shift Types: 3 types (Morning, Middle, Night)
└── Day-by-Day:
    ├── Mon 8: ✅ 2 shifts
    ├── Tue 9: ✅ 3 shifts
    ├── Wed 10: ❌ Off duty
    ├── Thu 11: ✅ 2 shifts
    ├── Fri 12: ✅ 2 shifts
    ├── Sat 13: ✅ 2 shifts
    └── Sun 14: ✅ 1 shift

Focus: "What is the PATTERN this week?"
```

---

## 🎨 UI/UX Differences

### Visual Density
| Aspect | Daily View | Weekly View |
|--------|-----------|-------------|
| Card Height | ~120px | ~280px |
| Information | Low | High |
| Scroll Required | Minimal | More |
| Cognitive Load | Low | Medium |
| Scan Speed | Fast | Slower |

### Interaction Patterns
| Action | Daily View | Weekly View |
|--------|-----------|-------------|
| Edit Staff | Click card | Click day cell in grid |
| View Details | All visible | Scroll within card |
| Navigate | Arrow buttons | Arrow buttons (2 levels) |
| Context Switch | Fast (1 click) | Medium (2 clicks) |

---

## 🧠 Cognitive Models

### Daily View Mental Model
```
User thinks: "Calendar App"
├── Today is the focus
├── Simple chronological navigation
└── One task at a time

User expectation:
"Show me who's working right now"
```

### Weekly View Mental Model
```
User thinks: "Planner/Spreadsheet"
├── Week is the unit of planning
├── Patterns emerge across days
└── Multiple data points compared

User expectation:
"Show me the coverage for this week"
```

---

## 📈 Use Case Examples

### Scenario 1: Emergency Call-In
**Situation**: Sarah calls in sick for today

**Daily View** ✅ Better:
1. Open app → See today (Dec 9)
2. Tap Sarah's card
3. Toggle to "Off Duty"
4. Save
5. **Done in 10 seconds**

**Weekly View** ⚠️ Slower:
1. Open app → See Week 2 (Dec 8-14)
2. Find Sarah's card
3. Scroll down to day-by-day grid
4. Tap Dec 9 cell
5. Toggle to "Off Duty"
6. Save
7. **Done in 15 seconds**

**Winner**: Daily View (faster for immediate action)

---

### Scenario 2: Next Week Planning
**Situation**: Manager needs to review next week's coverage

**Daily View** ⚠️ Tedious:
1. Open app → See today
2. Click → 7 times to get to next week
3. Check each day individually
4. Mental math to calculate totals
5. **Time consuming**

**Weekly View** ✅ Better:
1. Open app → See this week
2. Click → once to next week
3. See all 7 days at once
4. Aggregates calculated automatically
5. **Done in 5 seconds**

**Winner**: Weekly View (designed for this)

---

### Scenario 3: Monthly Report
**Situation**: Export full month schedule

**Daily View** ✅ Suitable:
- Simple export button
- PDF includes all days
- Quick action

**Weekly View** ✅ Equally Suitable:
- Same export button
- Same PDF output
- Same functionality

**Winner**: Tie (export works the same)

---

## 🔀 Transition Between Views

### Current Implementation
- Only Weekly View is active
- Daily View code exists in `/components/StaffSchedule.tsx`
- Weekly View code in `/components/StaffScheduleWeekly.tsx`

### Potential Toggle Design
```
┌─────────────────────────────────┐
│  ← Staff Schedule   [☰] [•••]  │
│                                 │
│  View Mode: [Day] [Week] [Month]│
└─────────────────────────────────┘

Or:

┌─────────────────────────────────┐
│  ← Staff Schedule              │
│  ⚙️ Settings → View Mode       │
│     ○ Daily View               │
│     ● Weekly View              │
│     ○ Monthly View (future)    │
└─────────────────────────────────┘
```

### Implementation Plan (If Needed)
```typescript
const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('weekly');

return viewMode === 'daily' 
  ? <StaffSchedule onBack={onBack} />
  : <StaffScheduleWeekly onBack={onBack} />;
```

---

## 📊 Data Sharing Between Views

### Shared State
Both views use the same underlying data structure:

```typescript
// Schedules stored the same way
schedules: Record<string, StaffSchedule>

// Key format: "{staffId}-{YYYY-MM-DD}"
"1-2025-12-09" → {
  staffId: "1",
  date: "2025-12-09",
  attendance: "Present",
  shifts: ["Morning", "Middle"]
}
```

### View-Specific Calculations

**Daily View**:
```typescript
// Get one day's schedule
const todaySchedule = getStaffSchedule(staffId, today);
```

**Weekly View**:
```typescript
// Get 7 days' schedules and aggregate
const weekData = currentWeekDates.map(date => 
  getStaffSchedule(staffId, date)
);
const totalShifts = weekData.reduce((sum, s) => sum + s.shifts.length, 0);
```

---

## 🎯 Recommendation Matrix

| User Type | Recommended View | Reason |
|-----------|-----------------|--------|
| **Front Desk Manager** | Daily | Focuses on today's operations |
| **HR Manager** | Weekly | Plans ahead, tracks patterns |
| **Shift Supervisor** | Daily | Real-time management |
| **Operations Manager** | Weekly | Strategic oversight |
| **Staff Member** | Daily | "Am I working today?" |
| **Analyst** | Weekly | Needs aggregated data |

---

## ✅ Feature Parity

### Both Views Support:
- ✅ Edit staff schedules
- ✅ Filter by department/designation
- ✅ Export to PDF
- ✅ Create new month schedules
- ✅ 4-shift limit enforcement
- ✅ Attendance toggle with auto-clear
- ✅ Unsaved changes protection
- ✅ Month restriction (Current + 1)
- ✅ Design guideline compliance

### Unique to Daily View:
- ✅ "Today" quick jump
- ✅ Single-day focus
- ✅ Simpler navigation

### Unique to Weekly View:
- ✅ "This Week" quick jump
- ✅ Week-level aggregates
- ✅ Day-by-day mini calendar
- ✅ Attendance rate percentage
- ✅ Pattern visualization

---

## 🚀 Future: Hybrid View?

### Concept: Best of Both Worlds
```
┌─────────────────────────────────┐
│  ← Staff Schedule              │
├─────────────────────────────────┤
│  Week View: Dec 8-14           │
│  Focus Day: Wednesday, Dec 10   │ ← Active day highlight
├─────────────────────────────────┤
│  [Weekly Stats]                │
├─────────────────────────────────┤
│  Staff Cards:                  │
│  - Show weekly aggregate       │
│  - Highlight today's shifts    │
│  - Quick toggle to other days  │
└─────────────────────────────────┘
```

Benefits:
- Week context + Day focus
- No mode switching needed
- Progressive disclosure

---

## 📝 Summary

### Daily View = Tactical
- ✅ **Fast**: Immediate action
- ✅ **Simple**: Low cognitive load
- ✅ **Focused**: One day at a time
- ⚠️ **Limited**: Can't see patterns

### Weekly View = Strategic
- ✅ **Comprehensive**: See full week
- ✅ **Analytical**: Aggregated metrics
- ✅ **Efficient**: Review 7 days at once
- ⚠️ **Complex**: More scrolling required

### Current Implementation
**Default**: Weekly View ✅  
**Reason**: Better suits the functional requirements for "7-day window" planning  
**Status**: Production-ready

---

**Last Updated**: December 9, 2025  
**Version**: 2.0 (Weekly View Primary)
