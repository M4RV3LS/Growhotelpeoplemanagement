# Staff Schedule - Testing Checklist

## 🧪 Manual Testing Guide

Use this checklist to validate all features and edge cases.

---

## ✅ Homepage Integration

### Test: Entry Point Visibility
- [ ] Open the application
- [ ] Verify "Staff Schedule" icon appears in Quick Access grid
- [ ] Verify icon is in 4th position (1st row, 4th column)
- [ ] Verify Calendar icon (red color #E63946)
- [ ] Verify label reads "Staff Schedule" (12px font)

### Test: Navigation
- [ ] Click "Staff Schedule" icon
- [ ] Verify smooth transition to Staff Schedule page
- [ ] Verify pink gradient background loads
- [ ] Verify header shows "Staff Schedule" title
- [ ] Verify back button appears in header
- [ ] Click back button
- [ ] Verify return to homepage

---

## 📅 Main Schedule View

### Test: Initial Load
- [ ] Navigate to Staff Schedule
- [ ] Verify date defaults to "Today"
- [ ] Verify month/year display is correct
- [ ] Verify stats bar shows:
  - Total Staff count
  - On Duty count (green)
  - Off Duty count (gray)
- [ ] Verify Filter button is visible
- [ ] Verify Export button is visible
- [ ] Verify staff list loads with 8 members

### Test: Date Navigation
- [ ] Click left arrow (←)
- [ ] Verify date moves to previous day
- [ ] Verify staff list updates
- [ ] Verify stats recalculate
- [ ] Click right arrow (→) multiple times
- [ ] Verify date moves forward
- [ ] Verify cannot navigate beyond Current Month + 1
- [ ] Verify forward arrow becomes disabled at limit
- [ ] Click "Today" button
- [ ] Verify date resets to current date

### Test: Staff List Display
- [ ] Verify each staff card shows:
  - Avatar with initials
  - Full name
  - Designation • Department
  - Attendance badge (Present/Absent)
  - Shift badges (if present)
  - Chevron right icon
- [ ] Verify Present badges are green (#D4EDDA background)
- [ ] Verify Absent badges are gray (#E5E7EB background)
- [ ] Verify shift badges are orange (#FFF3CD background)
- [ ] Verify cards have white background
- [ ] Verify cards have 12px border radius
- [ ] Verify cards have subtle shadow

### Test: Statistics Accuracy
- [ ] Count manually how many staff are "Present"
- [ ] Verify "On Duty" stat matches
- [ ] Count manually how many staff are "Absent"
- [ ] Verify "Off Duty" stat matches
- [ ] Verify Total = On Duty + Off Duty

---

## 🎨 Filter Functionality

### Test: Filter Modal Opening
- [ ] Click "Filter" button
- [ ] Verify bottom sheet slides up
- [ ] Verify backdrop appears (dark overlay)
- [ ] Verify modal header shows "Filter Staff"
- [ ] Verify close button (X) is visible
- [ ] Verify Department section appears
- [ ] Verify Designation section appears

### Test: Department Filter
- [ ] Click "Kitchen" department
- [ ] Verify visual selection (border changes to red)
- [ ] Verify checkmark appears
- [ ] Click another department
- [ ] Verify selection switches
- [ ] Click "Apply Filters"
- [ ] Verify modal closes
- [ ] Verify staff list shows only Kitchen staff
- [ ] Verify filter badge shows "1" on Filter button

### Test: Designation Filter
- [ ] Open Filter modal
- [ ] Select "Chef" designation
- [ ] Apply filters
- [ ] Verify staff list shows only Chefs
- [ ] Verify filter badge shows "1"

### Test: Combined Filters
- [ ] Open Filter modal
- [ ] Select "Kitchen" department
- [ ] Select "Chef" designation
- [ ] Apply filters
- [ ] Verify staff list shows Kitchen Chefs only
- [ ] Verify filter badge shows "2"

### Test: Reset Filters
- [ ] Apply some filters
- [ ] Open Filter modal
- [ ] Click "Reset" button
- [ ] Verify both filters reset to "All"
- [ ] Apply
- [ ] Verify full staff list returns
- [ ] Verify filter badge disappears

### Test: Filter Persistence
- [ ] Apply filters (e.g., Kitchen)
- [ ] Navigate to next day
- [ ] Verify filters remain active
- [ ] Verify filtered list updates for new date
- [ ] Navigate back to homepage
- [ ] Return to Staff Schedule
- [ ] Verify filters are reset (fresh state)

### Test: No Results
- [ ] Apply filters that result in no matches
  (e.g., if no staff match specific combination)
- [ ] Verify empty state message appears
- [ ] Verify "Clear Filters" link appears
- [ ] Click "Clear Filters"
- [ ] Verify filters reset and list returns

---

## ✏️ Edit Staff Schedule

### Test: Modal Opening
- [ ] Click any staff member card
- [ ] Verify bottom sheet slides up smoothly
- [ ] Verify backdrop appears
- [ ] Verify staff name shows in header
- [ ] Verify date shows in header
- [ ] Verify staff info card displays:
  - Avatar
  - Designation
  - Department
- [ ] Verify Attendance section appears
- [ ] Verify current attendance state is selected

### Test: Attendance Toggle (Present → Absent)
- [ ] Select a staff member with shifts
- [ ] Note their current shifts
- [ ] Click "Off Duty" button
- [ ] Verify button highlights (gray)
- [ ] Verify "On Duty" button unhighlights
- [ ] Verify all shifts are cleared immediately
- [ ] Verify "No shifts can be assigned" message appears
- [ ] Verify shift section is hidden/disabled

### Test: Attendance Toggle (Absent → Present)
- [ ] Select a staff member who is "Off Duty"
- [ ] Click "On Duty" button
- [ ] Verify button highlights (green)
- [ ] Verify shift section becomes enabled
- [ ] Verify "No shifts assigned" empty state shows
- [ ] Verify "+ Add Shift" button appears

### Test: Add First Shift
- [ ] Select a staff member with 0 shifts (Present)
- [ ] Verify shift counter shows "0/4"
- [ ] Click "+ Add Shift"
- [ ] Verify shift selector appears
- [ ] Verify all 4 shift types are available:
  - Morning
  - Middle
  - Afternoon
  - Night
- [ ] Click "Morning"
- [ ] Verify shift is added to list
- [ ] Verify shift counter updates to "1/4"
- [ ] Verify Morning disappears from selector

### Test: Add Multiple Shifts
- [ ] Add "Morning" shift
- [ ] Click "+ Add Shift" again
- [ ] Verify Morning is not in selector
- [ ] Add "Middle" shift
- [ ] Verify shift counter shows "2/4"
- [ ] Add "Afternoon" shift
- [ ] Verify shift counter shows "3/4"
- [ ] Add "Night" shift
- [ ] Verify shift counter shows "4/4"

### Test: 4-Shift Limit
- [ ] Add 4 shifts to a staff member
- [ ] Verify "+ Add Shift" button disappears
- [ ] Verify warning message appears:
  "Maximum shift limit reached. A staff member cannot have more than 4 shifts per day."
- [ ] Verify warning has orange background (#FFF3CD)
- [ ] Verify warning icon appears

### Test: Remove Shift
- [ ] Select a staff member with multiple shifts
- [ ] Click trash icon on one shift
- [ ] Verify shift is removed immediately
- [ ] Verify shift counter decrements
- [ ] Verify "+ Add Shift" reappears if it was hidden
- [ ] Verify removed shift type reappears in selector

### Test: Save Changes
- [ ] Make any change (attendance or shifts)
- [ ] Verify "Save Changes" button becomes enabled (red)
- [ ] Click "Save Changes"
- [ ] Verify modal closes
- [ ] Verify changes appear in main list
- [ ] Verify stats update if attendance changed

### Test: Cancel Without Changes
- [ ] Open edit modal
- [ ] Don't make any changes
- [ ] Click "Cancel"
- [ ] Verify modal closes immediately
- [ ] Verify no confirmation dialog

### Test: Discard Changes Confirmation
- [ ] Open edit modal
- [ ] Make a change (e.g., toggle attendance)
- [ ] Click "Cancel" or X button
- [ ] Verify confirmation dialog appears:
  "Discard Changes?"
  "You have unsaved changes. Are you sure you want to discard them?"
- [ ] Verify two buttons:
  - "Keep Editing"
  - "Discard"
- [ ] Click "Keep Editing"
- [ ] Verify dialog closes, modal remains open
- [ ] Click "Cancel" again
- [ ] Click "Discard"
- [ ] Verify modal closes
- [ ] Verify changes are NOT saved

### Test: Close Modal via Backdrop
- [ ] Open edit modal
- [ ] Make no changes
- [ ] Click dark backdrop (outside modal)
- [ ] Verify modal closes
- [ ] Make changes
- [ ] Click backdrop
- [ ] Verify discard confirmation appears

---

## 📆 Create New Month Schedule

### Test: Empty State Detection
- [ ] Navigate to a future month (use date navigation)
- [ ] Keep clicking → to move to next month
- [ ] Eventually reach a month with no schedule
- [ ] Verify empty state appears:
  - Calendar icon (40px, gray)
  - "No Schedule Created" heading
  - Description with month name
  - "Create Schedule" button (red)

### Test: Create Schedule Flow
- [ ] Click "Create Schedule" button
- [ ] Verify confirmation modal appears:
  - Calendar icon (red)
  - "Create Schedule for [Month]" title
  - Description explaining default behavior
  - "Create Schedule" button
  - "Cancel" button
- [ ] Click "Create Schedule"
- [ ] Verify loading state:
  - Button shows spinner
  - Button text changes to "Creating Schedule..."
  - Button is disabled
  - Cancel is disabled
- [ ] Wait for completion (~1.5s)
- [ ] Verify modal closes
- [ ] Verify main schedule view loads
- [ ] Verify staff list shows default schedules:
  - All staff "Present"
  - All staff have 1 "Morning" shift

### Test: Cancel Creation
- [ ] Reach empty state
- [ ] Click "Create Schedule"
- [ ] In confirmation modal, click "Cancel"
- [ ] Verify modal closes
- [ ] Verify empty state remains

---

## 📤 Export Functionality

### Test: Export Modal Opening
- [ ] Click "Export" button (with PDF icon)
- [ ] Verify modal appears centered
- [ ] Verify backdrop appears
- [ ] Verify modal content:
  - PDF icon (red)
  - "Export Schedule" title
  - Description with current month name
  - File preview section
  - "Export PDF" button
  - "Cancel" button

### Test: File Preview
- [ ] In export modal, verify file preview shows:
  - PDF icon
  - Filename format: "Staff_Schedule_[Month_Year].pdf"
  - Description: "Full month view with all staff members and shifts"

### Test: Export Process
- [ ] Click "Export PDF"
- [ ] Verify loading state:
  - Button shows spinner
  - Button text: "Generating PDF..."
  - Button is disabled
  - Cancel is disabled
- [ ] Wait for completion (~2s)
- [ ] Verify success state:
  - Icon changes to green checkmark
  - Icon background changes to green
  - Title changes to "Export Complete!"
  - Success message appears
- [ ] Verify modal auto-closes after ~1.5s
- [ ] (In production, verify PDF downloads)

### Test: Cancel Export
- [ ] Open export modal
- [ ] Click "Cancel" button
- [ ] Verify modal closes immediately
- [ ] Verify no export occurs

---

## 🎯 Edge Cases & Error States

### Test: Empty Staff List
- [ ] Apply filters that return no results
- [ ] Verify empty state card appears
- [ ] Verify message: "No staff members match your filters"
- [ ] Verify "Clear Filters" button appears

### Test: All Staff Absent
- [ ] Set all staff to "Absent"
- [ ] Verify stats show:
  - Total: 8
  - On Duty: 0
  - Off Duty: 8
- [ ] Verify staff list still displays all cards
- [ ] Verify all badges show "Absent" (gray)

### Test: Rapid Date Navigation
- [ ] Click → arrow repeatedly (fast)
- [ ] Verify date updates smoothly
- [ ] Verify no lag or errors
- [ ] Verify stats recalculate correctly
- [ ] Verify staff list updates

### Test: Rapid Filter Changes
- [ ] Open filter modal
- [ ] Click different departments rapidly
- [ ] Verify selection follows last click
- [ ] Apply filters
- [ ] Verify correct filter is applied

### Test: Month Boundary Navigation
- [ ] Navigate to last day of month
- [ ] Click → arrow
- [ ] Verify date advances to 1st of next month
- [ ] Verify month display updates
- [ ] Navigate to 1st of month
- [ ] Click ← arrow
- [ ] Verify date goes to last day of previous month

### Test: Today Button at Month Boundary
- [ ] Navigate to next month
- [ ] Click "Today" button
- [ ] Verify jumps back to current month's today
- [ ] Verify all data loads correctly

### Test: Simultaneous Modals
- [ ] Try to open multiple modals at once
  (This should not be possible by design)
- [ ] Verify only one modal is ever open
- [ ] Verify backdrop is always correct

### Test: Mobile Responsiveness
- [ ] Test on 375px viewport (iPhone SE)
- [ ] Test on 428px viewport (iPhone 14 Pro Max)
- [ ] Verify layouts adjust properly
- [ ] Verify no horizontal scroll
- [ ] Verify all touch targets are ≥44px
- [ ] Verify text remains readable

---

## 🎨 Design System Validation

### Test: Color Accuracy
- [ ] Verify brand primary red: #E63946
  - CTA buttons
  - Icons
  - Active states
  - Filter borders
- [ ] Verify success green: #28A745
  - On Duty badges
  - Success messages
- [ ] Verify warning orange: #FFA500
  - Shift badges
  - Warning messages
- [ ] Verify background gradient:
  - Top: #FFE5E8
  - Bottom: #FFF5F6

### Test: Typography Consistency
- [ ] Measure/inspect font sizes:
  - Page title: 24px
  - Section headers: 18px
  - Body text: 14px
  - Captions: 12px
- [ ] Verify font weights:
  - Headings: 600-700
  - Body: 400
  - Buttons: 500

### Test: Spacing Accuracy
- [ ] Verify 16px horizontal screen padding
- [ ] Verify 12px card internal padding
- [ ] Verify 24px section gaps
- [ ] Verify 8px element spacing

### Test: Border Radius
- [ ] Verify 12px on cards
- [ ] Verify 8px on buttons
- [ ] Verify 16px on modals (top corners)
- [ ] Verify 6-8px on badges

### Test: Shadow Consistency
- [ ] Verify cards have: 0px 2px 8px rgba(0,0,0,0.08)
- [ ] Verify modals have: 0px -4px 16px rgba(0,0,0,0.12)
- [ ] Verify header has: 0px 2px 4px rgba(0,0,0,0.08)

---

## ⚡ Performance Checks

### Test: Load Time
- [ ] Navigate to Staff Schedule
- [ ] Verify page loads in < 1 second
- [ ] Verify no lag on initial render

### Test: Filter Performance
- [ ] Apply filter
- [ ] Verify list updates instantly (< 100ms)
- [ ] Apply different filter
- [ ] Verify smooth transition

### Test: Date Navigation Performance
- [ ] Click → arrow 20 times rapidly
- [ ] Verify smooth updates
- [ ] Verify no freezing
- [ ] Verify no console errors

### Test: Modal Animations
- [ ] Open/close modals multiple times
- [ ] Verify smooth 250ms slide animation
- [ ] Verify no janky frames
- [ ] Verify backdrop fades smoothly

---

## 🔐 Data Integrity

### Test: Schedule Persistence Within Session
- [ ] Edit a staff member's schedule
- [ ] Save changes
- [ ] Navigate to different date
- [ ] Navigate back
- [ ] Verify changes are still there

### Test: Filter Does Not Modify Data
- [ ] Apply filters
- [ ] Verify filtered-out staff still exist in data
- [ ] Clear filters
- [ ] Verify all staff return with original data

### Test: Unsaved Changes Don't Persist
- [ ] Open edit modal
- [ ] Make changes
- [ ] Click "Discard"
- [ ] Open same staff again
- [ ] Verify original data is unchanged

### Test: Attendance Change Clears Shifts
- [ ] Add 3 shifts to a staff member
- [ ] Save
- [ ] Open again
- [ ] Set to "Absent"
- [ ] Save
- [ ] Open again
- [ ] Set back to "Present"
- [ ] Verify shifts are NOT restored (correctly empty)

---

## 📱 Mobile-Specific Tests

### Test: Touch Targets
- [ ] Try tapping all buttons with finger (not stylus)
- [ ] Verify easy to tap without mistakes
- [ ] Verify 44px minimum size

### Test: Bottom Sheet Behavior
- [ ] Open modal on mobile
- [ ] Try swiping down on modal header
  (Note: Swipe-to-dismiss not implemented, use X or Cancel)
- [ ] Verify backdrop tap closes modal (with unsaved check)

### Test: Keyboard on Mobile
- [ ] Focus on any input (if applicable)
- [ ] Verify keyboard doesn't cover content
- [ ] Verify scroll works with keyboard open

### Test: Safe Area (iOS)
- [ ] Test on iPhone with notch
- [ ] Verify header respects status bar
- [ ] Verify bottom content respects home indicator
- [ ] Verify no content is cut off

---

## ✅ Browser Compatibility

### Test: Chrome/Edge
- [ ] Open in Chrome
- [ ] Run through all major flows
- [ ] Verify animations work
- [ ] Verify no console errors

### Test: Safari (iOS)
- [ ] Open on iPhone Safari
- [ ] Test all interactions
- [ ] Verify gradient renders correctly
- [ ] Verify modal animations smooth

### Test: Firefox
- [ ] Open in Firefox
- [ ] Verify layout consistency
- [ ] Verify animations work

---

## 🐛 Known Limitations (Expected Behavior)

### ⚠️ These are NOT bugs:
- [ ] Data resets on page refresh (no backend)
- [ ] Cannot navigate beyond Current Month + 1
- [ ] Cannot customize shift types (only 4 presets)
- [ ] Cannot add more than 4 shifts per day
- [ ] Export PDF is simulated (no actual file)
- [ ] Only 8 staff members exist (mock data)

---

## 📊 Testing Summary Template

After completing all tests, fill this out:

### Passed Tests: ___ / 100+
### Failed Tests: ___ 
### Blockers Found: ___

### Critical Issues:
- 

### Minor Issues:
- 

### Enhancement Suggestions:
- 

### Overall Quality Rating: ⭐⭐⭐⭐⭐

---

**Testing Completed By**: _____________  
**Date**: _____________  
**Environment**: _____________  
**Device**: _____________
