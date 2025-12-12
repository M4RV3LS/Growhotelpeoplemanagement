# Visual Quick Reference Guide
**Staff Schedule Feature - Version 3.0**

---

## 🎨 Color-Coded Shift System

### Shift Colors

| Shift | Color | Hex | Visual |
|-------|-------|-----|--------|
| Morning | Blue | `#4A90E2` | 🔵 |
| Middle | Orange | `#FFA500` | 🟠 |
| Afternoon | Gold | `#FFD700` | 🟡 |
| Night | Purple | `#9370DB` | 🟣 |
| All Day | Red | `#E63946` | 🔴 (bar) |

### How They Appear

```
Individual Shifts:
┌───────────┐
│     M     │ ← Day initial
│    15     │ ← Date number
│  🔵🟠🟡  │ ← Colored dots (Morning, Middle, Afternoon)
└───────────┘

All Day Shift:
┌───────────┐
│     T     │
│    16     │
│  ███████  │ ← Full-width red bar
└───────────┘

No Shifts (Absent):
┌───────────┐
│     W     │
│    17     │
│           │ ← Empty
└───────────┘
```

---

## 🔄 View vs Edit Mode

### View Mode (Default)

```
┌─────────────────────────────────────┐
│  ← Staff Schedule       [👁️ View]  │ ← White button
└─────────────────────────────────────┘

Features:
✅ See all schedules
✅ Navigate weeks/months  
✅ Filter staff
✅ View statistics
❌ Cannot edit
❌ Cannot generate
❌ Day cells not clickable

Day Cell Appearance:
┌─────┐
│  M  │
│ 15  │  ← Normal appearance
│ 🔵  │     No hover effect
└─────┘
```

### Edit Mode (Active)

```
┌─────────────────────────────────────┐
│  ← Staff Schedule    [✏️ Editing]  │ ← Red button
├─────────────────────────────────────┤
│ ⚠️ Edit Mode Active - Click on     │ ← Yellow banner
│    any day to modify staff schedule │
└─────────────────────────────────────┘

Features:
✅ All View Mode features
✅ Click days to edit
✅ Change attendance
✅ Modify shifts
✅ Generate schedules
✅ Day cells interactive

Day Cell Appearance:
┌─────┐
│  M  │
│ 15  │  ← Hover effect active
│ 🔵  │     Scales up on hover
└─────┘     Clickable!
```

---

## 📅 Month/Year Selector States

### State 1: Schedule Exists
```
┌─────────────────────┐
│    December    ●    │ ← Green dot indicator
│                     │
└─────────────────────┘

Footer Button:
┌───────────────────────┐
│ [👁️ View Schedule]   │ ← Eye icon + View text
└───────────────────────┘

Action: Navigate to existing schedule
```

### State 2: No Schedule Created
```
┌─────────────────────┐
│     January         │
│   Not created       │ ← Gray label
└─────────────────────┘

Footer Button:
┌───────────────────────┐
│ [➕ Create Schedule] │ ← Plus icon + Create text
└───────────────────────┘

Action: Navigate + trigger create modal
```

### State 3: Future Month (Locked)
```
┌─────────────────────┐
│    February         │
│     Locked          │ ← Grayed out
└─────────────────────┘
         ↑
    Not selectable
    (Beyond Current + 1 month)

Footer Button: Disabled
```

---

## 🎯 Complete Staff Card Layout

```
┌─────────────────────────────────────────┐
│  JS   John Smith                        │ ← Avatar + Name
│       Front Desk • Reception            │ ← Role + Dept
│                                         │
│  Present Days  │  Total Shifts          │
│      5/7       │      12                │ ← Weekly summary
│                                         │
├─────────────────────────────────────────┤ ← Border separator
│                                         │
│  M   T   W   T   F   S   S             │ ← Day initials
│  8   9  10  11  12  13  14             │ ← Date numbers
│                                         │
│ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐          │ ← Day cells
│ │●│ │●│ │ │ │●│ │●│ │●│ │●│          │ ← Colored dots
│ │●│ │●│ │ │ │●│ │●│ │●│ │ │          │
│ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘          │
│  ✅  ✅  ❌  ✅  ✅  ✅  ✅           │ ← Green border = Present
│                                         │   Gray = Absent
└─────────────────────────────────────────┘
```

**Legend for dots above:**
- Blue dot (●) = Morning shift
- Orange dot (●) = Middle shift
- Gold dot (●) = Afternoon shift
- Purple dot (●) = Night shift

---

## 🎚️ UI States Overview

### Top Navigation States

| Mode | Button Text | Icon | Color | Banner |
|------|------------|------|-------|--------|
| View | "View" | 👁️ Eye | White bg, Black text | None |
| Edit | "Editing" | ✏️ Edit | Red bg (#E63946), White text | Yellow warning |

### Action Bar States

| Mode | Filter | Generate |
|------|--------|----------|
| View | ✅ Visible | ❌ Hidden |
| Edit | ✅ Visible | ✅ Visible |

### Day Cell States

| Mode | Clickable | Hover Effect | Cursor |
|------|-----------|--------------|--------|
| View | ❌ No | None | Default |
| Edit | ✅ Yes | Scale 1.05 | Pointer |

---

## 📊 Statistics Bar

```
┌─────────────────────────────────────┐
│  Avg Present/Day  │  Total Shifts  │
│        6          │       42       │
└─────────────────────────────────────┘
         ↓                    ↓
    Green color         Red color
    (#28A745)          (#E63946)
```

---

## 🗓️ Week Navigation Layout

```
┌─────────────────────────────────────┐
│  ←    Dec 8 - Dec 14    →          │ ← Week range
│          7 days                     │ ← Day count
│     [This Week Button]              │ ← Quick jump
└─────────────────────────────────────┘
  ↑                           ↑
Prev Week              Next Week
(Disabled if           (Disabled if
 at Week 0)             at last week)
```

---

## 🎨 Shift Legend (Always Visible)

```
Shift Legend
┌─────────────────────────────────────────────────────┐
│ 🔵 Morning  🟠 Middle  🟡 Afternoon  🟣 Night  ██ All Day │
└─────────────────────────────────────────────────────┘
```

**Why it's important:**
- Users can reference colors without memorizing
- Always visible below week navigation
- Compact horizontal layout
- Clear labeling

---

## 🚦 User Journey Flows

### Flow 1: Quick View (Read-Only)
```
1. Open Staff Schedule
   ↓
2. Default: View Mode
   ↓
3. See color-coded shifts immediately
   ↓
4. Reference legend if needed
   ↓
5. Navigate weeks/filter as needed
   ↓
6. Done!
```

### Flow 2: Edit a Single Day
```
1. Open Staff Schedule
   ↓
2. Click "Edit" button (top-right)
   ↓
3. Edit Mode activated (banner appears)
   ↓
4. Click any day cell for any staff
   ↓
5. Edit modal opens
   ↓
6. Change attendance/shifts
   ↓
7. Save
   ↓
8. Click "Edit" again to exit to View Mode
```

### Flow 3: Generate New Month Schedule
```
1. Click month selector button
   ↓
2. Select month without schedule
   ↓
3. See "Create Schedule" button
   ↓
4. Click "Create Schedule"
   ↓
5. Navigate to that month
   ↓
6. Enter Edit Mode (if not already)
   ↓
7. Click "Generate" button in action bar
   ↓
8. Confirm generation
   ↓
9. Schedule created!
```

### Flow 4: View Different Month
```
1. Click month selector button
   ↓
2. Browse year/month grid
   ↓
3. Green dot = Has schedule
   ↓
4. Select month
   ↓
5. Click "View Schedule" button
   ↓
6. Navigate to that month
   ↓
7. View in View Mode
```

---

## 🎯 Interactive Element Sizes

| Element | Size | Purpose |
|---------|------|---------|
| Day Cell | 40px × 50px | Touch target |
| Colored Dot | 8px (0.5rem) | Shift indicator |
| Mode Toggle Button | 36px height | Touch target |
| Month Selector Button | 44px height | Primary action |
| Week Nav Arrows | 44px × 44px | Touch target |
| Filter Button | 44px height | Action button |
| Generate Button | 44px height | Action button |

---

## 🎨 Color Palette Summary

### Primary Colors
| Usage | Color | Hex |
|-------|-------|-----|
| Brand/Primary | Red | `#E63946` |
| Success/Present | Green | `#28A745` |
| Warning/Banner | Orange | `#FFA500` |
| Info | Blue | `#4A90E2` |

### Shift Colors
| Shift | Color | Hex |
|-------|-------|-----|
| Morning | Blue | `#4A90E2` |
| Middle | Orange | `#FFA500` |
| Afternoon | Gold | `#FFD700` |
| Night | Purple | `#9370DB` |
| All Day | Red | `#E63946` |

### Neutral Colors
| Usage | Color | Hex |
|-------|-------|-----|
| Text Primary | Near Black | `#1A1A1A` |
| Text Secondary | Gray 500 | `#6B7280` |
| Text Tertiary | Gray 400 | `#9CA3AF` |
| Border | Gray 200 | `#E5E7EB` |
| Background | Off White | `#F8F9FA` |

---

## 📏 Spacing Scale Quick Reference

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight gaps |
| sm | 8px | Internal spacing |
| md | 12px | Card padding (vertical) |
| lg | 16px | Screen padding, card padding (horizontal) |
| xl | 24px | Section separation |
| 2xl | 32px | Major breaks |

---

## ✅ Feature Availability Matrix

| Feature | View Mode | Edit Mode |
|---------|:---------:|:---------:|
| View schedules | ✅ | ✅ |
| Navigate weeks | ✅ | ✅ |
| Navigate months | ✅ | ✅ |
| Filter staff | ✅ | ✅ |
| See color shifts | ✅ | ✅ |
| Reference legend | ✅ | ✅ |
| Click day cells | ❌ | ✅ |
| Edit attendance | ❌ | ✅ |
| Edit shifts | ❌ | ✅ |
| Generate schedule | ❌ | ✅ |

---

## 🔍 Visual Debugging Guide

### Identify Current Mode:
```
View Mode:
- Button says "View" with eye icon (👁️)
- Button has white background
- No yellow banner below header
- Day cells don't respond to clicks

Edit Mode:
- Button says "Editing" with edit icon (✏️)
- Button has red background (#E63946)
- Yellow banner visible: "Edit Mode Active..."
- Day cells scale up on hover
- "Generate" button visible in action bar
```

### Identify Month Status:
```
Has Schedule:
- Green dot (●) in top-right of month cell
- Footer button: "View Schedule" with eye icon

No Schedule:
- No green dot
- "Not created" label visible
- Footer button: "Create Schedule" with plus icon

Locked (Future):
- Grayed out appearance
- "Locked" label visible
- Button disabled
```

### Identify Attendance:
```
Present:
- Green border (#28A745)
- Green background (#D4EDDA)
- Colored dots visible (if shifts assigned)

Absent:
- Gray border (#E5E7EB)
- Light gray background (#F8F9FA)
- No dots visible
```

---

## 🎓 Learning Curve: Progressive Disclosure

### Level 1: Basic Viewing (Day 1)
```
What users learn:
- Colors = Different shifts
- Green = Present, Gray = Absent
- Can filter and navigate
- Default mode is View (safe)
```

### Level 2: Understanding Shifts (Day 2-3)
```
What users learn:
- Each color represents specific shift:
  🔵 = Morning
  🟠 = Middle
  🟡 = Afternoon
  🟣 = Night
  ██ = All Day
- Legend is always there for reference
- Multiple dots = Multiple shifts
```

### Level 3: Editing (Day 4-7)
```
What users learn:
- Click "Edit" to modify
- Yellow banner confirms edit mode
- Day cells become clickable
- Can generate new schedules
- Click "Edit" again to exit safely
```

### Level 4: Power User (Week 2+)
```
What users master:
- Quick mode switching
- Month selector for navigation
- Efficient schedule generation
- Bulk filtering and reviewing
- Understanding weekly patterns via colors
```

---

## 🎉 Visual Highlights

### Most Important Visual Cues:

1. **Mode Indicator** (Top-right button)
   - Tells you if you can edit or not
   - Red = Editing, White = Viewing

2. **Colored Dots** (In day cells)
   - Instant shift recognition
   - No need to click to see shifts

3. **Green Dot** (Month selector)
   - Schedule exists for that month
   - No dot = need to create

4. **Yellow Banner** (Edit mode)
   - Confirms you're in edit mode
   - Warns you can make changes

5. **Shift Legend** (Always visible)
   - Reference without memorization
   - Learn color system quickly

---

**Quick Start**: Just look at the colors! 🎨  
**Want to Edit**: Click the button in top-right ✏️  
**Change Month**: Click the month button 📅  
**See Legend**: It's always there, below week nav 🎯

---

**Last Updated**: December 9, 2025  
**Version**: 3.0  
**For**: Staff Schedule Feature - Grow Apps
