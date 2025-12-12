# Grow Apps (RedDoorz) Design Guidelines
**Version:** 1.0  
**Platform:** Mobile Web/Native App  
**Last Updated:** December 9, 2025

---

## 1. Design Principles

### Core Philosophy
- **Mobile-First**: All designs prioritize mobile experience (375px - 428px viewport)
- **Task-Oriented**: Users complete specific management tasks quickly
- **Information Density**: Balance between data richness and readability
- **Touch-Optimized**: Minimum 44px touch targets for interactive elements

### Design Values
1. **Clarity over Decoration** - Information hierarchy drives visual decisions
2. **Consistency** - Predictable patterns reduce cognitive load
3. **Feedback** - Every action receives immediate visual confirmation
4. **Accessibility** - Minimum AA contrast ratios, readable typography

---

## 2. Color System

### Primary Palette
```
Brand Primary (Red):    #E63946
Primary Hover:          #D62835
Primary Light:          #FF5A67

Background Gradient:
  Top:                  #FFE5E8 (Pink Light)
  Bottom:               #FFF5F6 (Pink Ultra Light)

Neutral Background:     #F8F9FA (Off White)
Surface (Cards):        #FFFFFF (Pure White)
```

### Functional Colors
```
Success:                #28A745
Warning:                #FFA500 (Orange)
Error:                  #DC3545
Info:                   #4A90E2 (Blue)

Text Primary:           #1A1A1A (Near Black)
Text Secondary:         #6B7280 (Gray 500)
Text Tertiary:          #9CA3AF (Gray 400)
Text Disabled:          #D1D5DB (Gray 300)

Border Default:         #E5E7EB (Gray 200)
Border Focus:           #E63946 (Brand Primary)
```

### Status Indicators
```
On Duty (Present):      #28A745 (Green)
Off Duty (Absent):      #9CA3AF (Gray)
Pending:                #FFA500 (Orange)
Confirmed:              #4A90E2 (Blue)
```

### Color Usage Rules
- **Primary Red**: CTA buttons, active states, critical actions, branding elements
- **Gradient Background**: App shell background, decorative headers
- **White Cards**: Content containers, data displays, form sections
- **Status Colors**: ONLY for state indicators (badges, labels, icons)
- **Warning Orange**: Time-sensitive alerts, attention-needed states
- **Info Blue**: Non-critical notifications, informational badges

---

## 3. Typography

### Font Family
```
Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif
Monospace (Data): 'SF Mono', Menlo, Monaco, 'Courier New', monospace
```

### Type Scale (Mobile)
```
Heading 1:     24px / 32px (1.5 line-height) / 700 weight
Heading 2:     20px / 28px (1.4) / 600 weight
Heading 3:     18px / 24px (1.33) / 600 weight

Body Large:    16px / 24px (1.5) / 400 weight
Body Default:  14px / 20px (1.43) / 400 weight
Body Small:    12px / 16px (1.33) / 400 weight

Label:         14px / 20px (1.43) / 500 weight
Caption:       12px / 16px (1.33) / 400 weight
Overline:      10px / 12px (1.2) / 600 weight / UPPERCASE
```

### Typography Usage
- **Heading 1**: Page titles, modal headers
- **Heading 2**: Section headers, card titles
- **Heading 3**: Subsection headers, list group titles
- **Body Default**: Primary content, descriptions, form labels
- **Body Small**: Secondary information, helper text
- **Label**: Button text, tab labels, badge text
- **Caption**: Timestamps, metadata, footnotes
- **Overline**: Category labels, status tags

### Text Color Pairing
- Heading 1-3: Text Primary (#1A1A1A)
- Body text: Text Primary for main content, Text Secondary for supporting content
- Labels: Text Primary or inherit from component (e.g., white on red buttons)
- Captions: Text Secondary or Text Tertiary

---

## 4. Spacing & Layout

### Spacing Scale
```
4px   (xs)   - Icon padding, tight gaps
8px   (sm)   - List item internal spacing, badge padding
12px  (md)   - Card internal padding (vertical)
16px  (lg)   - Card internal padding (horizontal), section gaps
24px  (xl)   - Section separation, modal padding
32px  (2xl)  - Major section breaks, screen padding (top/bottom)
```

### Layout Grid
```
Screen Padding:        16px (left/right)
Card Padding:          16px (horizontal) × 12px (vertical)
List Item Height:      Minimum 56px (with 12px vertical padding)
Touch Target:          Minimum 44px × 44px
Safe Area:             Top 44px (status bar) / Bottom 34px (home indicator)
```

### Container Widths
```
Mobile (Default):      375px - 428px (full width minus 16px padding)
Modal/Bottom Sheet:    100% width with 24px side padding
```

### Spacing Usage Rules
- **16px**: Default horizontal padding for all screens
- **24px**: Vertical spacing between major sections
- **12px**: Gap between card elements (vertical stacking)
- **8px**: Gap between related elements (label + value, icon + text)

---

## 5. Components

### 5.1 Cards
```
Background:            #FFFFFF
Border Radius:         12px
Shadow:                0px 2px 8px rgba(0, 0, 0, 0.08)
Padding:               16px (horizontal) × 12px (vertical)
Margin Bottom:         12px (when stacked)
Border:                None (shadow provides separation)
```

**Card Variants:**
- **Default**: White background, subtle shadow
- **Interactive**: Add hover state (shadow: 0px 4px 12px rgba(0, 0, 0, 0.12))
- **Selected**: 2px border in Brand Primary (#E63946)

### 5.2 Buttons

#### Primary Button
```
Background:            #E63946 (Brand Primary)
Text Color:            #FFFFFF
Border Radius:         8px
Height:                44px (minimum touch target)
Padding:               12px 24px
Font:                  14px / 500 weight

States:
  Hover:               Background #D62835
  Active:              Background #C11F2C
  Disabled:            Background #E5E7EB, Text #9CA3AF
```

#### Secondary Button
```
Background:            #FFFFFF
Text Color:            #E63946
Border:                1px solid #E63946
Border Radius:         8px
Height:                44px
Padding:               12px 24px

States:
  Hover:               Background #FFF5F6
  Active:              Background #FFE5E8
  Disabled:            Border #D1D5DB, Text #9CA3AF
```

#### Icon Button
```
Size:                  44px × 44px (square)
Background:            Transparent
Icon Size:             24px
Border Radius:         8px

States:
  Hover:               Background #F3F4F6
  Active:              Background #E5E7EB
```

### 5.3 Icon Grid (Navigation)
```
Layout:                4 columns on mobile (375px width)
Gap:                   12px (horizontal & vertical)
Item Size:             ~80px width × 88px height (flex-based)
Background:            #FFFFFF
Border Radius:         12px
Shadow:                0px 2px 8px rgba(0, 0, 0, 0.08)
Padding:               12px (internal)

Icon Specifications:
  Size:                32px × 32px
  Color:               #E63946 (Brand Primary)
  Style:               Outlined or Filled (consistent within set)

Label:
  Font:                12px / 400 weight
  Color:               #1A1A1A (Text Primary)
  Margin Top:          8px (from icon)
  Alignment:           Center
```

### 5.4 List Items
```
Min Height:            56px
Padding:               12px 16px
Border Bottom:         1px solid #E5E7EB (between items)
Background:            #FFFFFF

Structure:
  Leading Element:     Icon/Avatar (40px × 40px)
  Content Area:        Primary text (14px) + Secondary text (12px)
  Trailing Element:    Action icon, badge, or toggle (24px)
  Gap:                 12px (between elements)
```

### 5.5 Badges & Status Labels
```
Border Radius:         6px (small) / 8px (medium)
Padding:               4px 8px (small) / 6px 12px (medium)
Font:                  10px / 600 weight (small) / 12px / 500 weight (medium)

Color Variants:
  Success:             Background #D4EDDA, Text #155724
  Warning:             Background #FFF3CD, Text #856404
  Error:               Background #F8D7DA, Text #721C24
  Info:                Background #D1ECF1, Text #0C5460
  Neutral:             Background #E5E7EB, Text #4B5563
```

### 5.6 Modals & Bottom Sheets
```
Background:            #FFFFFF
Border Radius:         16px (top corners only for bottom sheet)
Max Height:            85vh (bottom sheet) / 90vh (full modal)
Padding:               24px
Shadow:                0px -4px 16px rgba(0, 0, 0, 0.12) (bottom sheet)

Header:
  Height:              56px
  Title Font:          18px / 600 weight
  Close Button:        44px × 44px (top-right)

Content:
  Padding:             16px 0px (vertical scroll area)
  
Footer (Actions):
  Height:              72px
  Padding:             16px 24px
  Border Top:          1px solid #E5E7EB
  Button Layout:       Full-width or split 50/50
```

### 5.7 Form Elements

#### Text Input
```
Height:                44px
Border:                1px solid #E5E7EB
Border Radius:         8px
Padding:               12px 16px
Font:                  14px / 400 weight
Background:            #FFFFFF

States:
  Focus:               Border #E63946, Shadow 0px 0px 0px 3px rgba(230, 57, 70, 0.1)
  Error:               Border #DC3545
  Disabled:            Background #F3F4F6, Text #9CA3AF
  
Label:
  Font:                14px / 500 weight
  Color:               #1A1A1A
  Margin Bottom:       8px
```

#### Dropdown/Select
```
Same as Text Input (height, border, padding)
Trailing Icon:         Chevron Down (16px)
Selected Value:        Text Primary (#1A1A1A)
Placeholder:           Text Tertiary (#9CA3AF)

Dropdown Menu:
  Background:          #FFFFFF
  Border Radius:       8px
  Shadow:              0px 4px 12px rgba(0, 0, 0, 0.15)
  Max Height:          240px (scrollable)
  Item Height:         44px
  Item Hover:          Background #F3F4F6
```

#### Toggle/Switch
```
Width:                 44px
Height:                24px
Border Radius:         12px (pill)
Background (Off):      #D1D5DB
Background (On):       #E63946
Thumb Size:            20px (circle)
Thumb Color:           #FFFFFF
Transition:            0.2s ease
```

#### Checkbox
```
Size:                  20px × 20px
Border:                2px solid #D1D5DB
Border Radius:         4px
Background (Checked):  #E63946
Checkmark Color:       #FFFFFF (icon 14px)
```

---

## 6. Icons

### Icon System
**Library:** Lucide React (outlined style)  
**Default Size:** 24px × 24px  
**Stroke Width:** 2px  
**Color:** Inherits from parent or Text Primary (#1A1A1A)

### Icon Sizing Scale
```
Small:       16px (inline with text, badges)
Medium:      24px (default, buttons, list items)
Large:       32px (navigation grid, feature icons)
XLarge:      40px (empty states, onboarding)
```

### Icon Usage
- **Navigation Icons**: 32px, Brand Primary (#E63946)
- **Action Icons**: 24px, Text Primary or White (on colored backgrounds)
- **Status Icons**: 16px, matched to status color
- **Decorative Icons**: 40px+, Text Tertiary (#9CA3AF)

### Recommended Icons (Lucide React)
```
Calendar, Clock, Users, User, Settings, ChevronRight, ChevronDown,
Plus, Minus, X, Check, Filter, Download, Upload, Search, Menu,
AlertCircle, Info, CheckCircle, XCircle, Eye, EyeOff, Edit, Trash
```

---

## 7. Interaction Patterns

### 7.1 Navigation Patterns

#### Bottom Navigation Bar (If Applicable)
```
Height:                56px + Safe Area
Items:                 3-5 items
Icon Size:             24px
Label Size:            10px
Active State:          Icon + Label in Brand Primary
Inactive State:        Icon + Label in Text Tertiary
```

#### Top Navigation Bar
```
Height:                56px
Background:            Gradient or Solid White
Title:                 18px / 600 weight, centered or left-aligned
Back Button:           44px × 44px (left)
Action Button:         44px × 44px (right)
Shadow (Scroll):       0px 2px 4px rgba(0, 0, 0, 0.08) (appears on scroll)
```

### 7.2 Loading States
```
Skeleton Screens:      
  - Use gray (#E5E7EB) blocks with shimmer animation
  - Match exact layout of content being loaded
  
Spinner:               
  - Size: 32px (default) / 20px (inline)
  - Color: Brand Primary (#E63946)
  - Type: Circular, indeterminate
  
Progress Bar:
  - Height: 4px
  - Background: #E5E7EB
  - Fill: Brand Primary (#E63946)
```

### 7.3 Empty States
```
Icon:                  40px, Text Tertiary (#9CA3AF)
Heading:               18px / 600 weight, Text Primary
Description:           14px / 400 weight, Text Secondary
Action Button:         Primary Button (if action available)
Spacing:               24px between elements
Alignment:             Center
```

### 7.4 Error States
```
Inline Error:
  - Font: 12px / 400 weight
  - Color: #DC3545 (Error)
  - Icon: AlertCircle (16px)
  - Margin Top: 4px (below input)

Toast/Snackbar:
  - Position: Bottom (16px from bottom + safe area)
  - Background: #1A1A1A (Dark)
  - Text: #FFFFFF (White), 14px
  - Duration: 3s (auto-dismiss)
  - Action Button: Optional, text-only in Brand Primary
```

### 7.5 Confirmation Dialogs
```
Background Overlay:    rgba(0, 0, 0, 0.5)
Dialog Background:     #FFFFFF
Border Radius:         16px
Max Width:             90% (with 16px side margin)
Padding:               24px

Title:                 18px / 600 weight
Message:               14px / 400 weight, Text Secondary
Buttons:               Split layout (Cancel left, Confirm right)
Button Spacing:        12px gap
```

---

## 8. Animation & Motion

### Transition Timing
```
Instant:               0ms (immediate state changes)
Fast:                  150ms (hovers, active states)
Default:               250ms (page transitions, modals)
Slow:                  400ms (complex animations, page loads)
```

### Easing Functions
```
Standard:              cubic-bezier(0.4, 0.0, 0.2, 1) - Most UI transitions
Decelerate:            cubic-bezier(0.0, 0.0, 0.2, 1) - Enter animations
Accelerate:            cubic-bezier(0.4, 0.0, 1, 1) - Exit animations
```

### Common Animations
```
Modal Enter:           
  - Transform: translateY(100%) → translateY(0)
  - Opacity: 0 → 1
  - Duration: 250ms, Decelerate easing

Modal Exit:
  - Transform: translateY(0) → translateY(100%)
  - Opacity: 1 → 0
  - Duration: 200ms, Accelerate easing

Button Press:
  - Scale: 1 → 0.96
  - Duration: 150ms, Standard easing

Skeleton Shimmer:
  - Linear gradient animation
  - Duration: 1500ms, infinite loop
```

---

## 9. Accessibility Guidelines

### Color Contrast
- **Text on White**: Minimum 4.5:1 (WCAG AA)
- **Large Text** (18px+): Minimum 3:1
- **Interactive Elements**: 3:1 against background
- **Status Indicators**: Do not rely on color alone; use icons + text

### Touch Targets
- **Minimum Size**: 44px × 44px
- **Spacing**: Minimum 8px between adjacent targets
- **Safe Area**: Avoid interactive elements within 16px of screen edges

### Focus States
- **Visible Focus Ring**: 3px solid outline in Brand Primary (#E63946)
- **Focus Order**: Logical top-to-bottom, left-to-right
- **Skip Links**: Provide skip-to-content for screen readers

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Label all form inputs with `<label>` elements
- Use `<button>` for actions, `<a>` for navigation
- Provide `alt` text for all images

---

## 10. Responsive Behavior (Mobile-Specific)

### Viewport Breakpoints
```
Small Mobile:          375px (iPhone SE, base design width)
Medium Mobile:         390px - 414px (iPhone 12-14 Pro)
Large Mobile:          428px (iPhone 14 Pro Max)
```

### Responsive Rules
1. **Fixed Padding**: Always maintain 16px side padding
2. **Flexible Grids**: Icon grid items flex to fill available space
3. **Single Column**: All content stacks vertically (no multi-column)
4. **Full-Width Modals**: Modals and bottom sheets always 100% width
5. **Sticky Headers**: Top navigation sticks on scroll
6. **Safe Areas**: Respect iOS safe area insets (top/bottom)

### Typography Scaling
- **Do NOT scale font sizes** across mobile breakpoints
- Maintain consistent type scale (14px body, 18px headings, etc.)
- Only adjust padding/spacing if needed for larger devices

---

## 11. Data Display Patterns

### Metrics/Stats Cards
```
Layout:                Horizontal (icon + label + value)
Icon Size:             24px
Label:                 12px / 400 weight, Text Secondary
Value:                 20px / 600 weight, Text Primary
Background:            White card with 12px border radius
Padding:               12px
Gap:                   8px (between icon and text)
```

### Data Tables (Mobile Adaptation)
- **Avoid traditional tables** - use card-based list items instead
- **Each row = Card** with key-value pairs stacked vertically
- **Primary data**: Larger font (16px), top position
- **Secondary data**: Smaller font (12px), gray color
- **Actions**: Icon buttons in top-right corner of card

### Date/Time Display
```
Date Format:           DD MMM YYYY (e.g., 09 Dec 2025)
Time Format:           HH:MM (24-hour) or h:MM AM/PM (12-hour based on locale)
Relative Time:         "Today", "Yesterday", "2 days ago" (within 7 days)
Color:                 Text Secondary (#6B7280)
Font:                  12px / 400 weight
```

---

## 12. Copy & Content Guidelines

### Tone of Voice
- **Professional but friendly** - Avoid overly formal language
- **Action-oriented** - Use verbs for button labels ("Add Shift", not "New Shift")
- **Concise** - Mobile screens require brevity
- **Localized** - Support multiple languages (consider text expansion)

### Button Labels
```
Primary Actions:       "Save", "Confirm", "Submit", "Create"
Secondary Actions:     "Cancel", "Go Back", "Skip"
Destructive Actions:   "Delete", "Remove", "Discard"
```

### Error Messages
- **Be specific**: "Password must be at least 8 characters" (not "Invalid password")
- **Offer solutions**: "No internet connection. Please check your network settings."
- **Avoid blame**: "Unable to save" (not "You failed to save")

### Empty States
- **Heading**: Describe what's missing ("No Staff Scheduled")
- **Description**: Explain why or what to do ("Add your first staff member to get started")
- **Action**: Provide clear next step ("Add Staff Member" button)

---

## 13. Implementation Notes

### CSS Framework
- **Tailwind CSS v4.0** (no config file needed)
- Use design tokens from `/styles/globals.css`
- Do not override default typography unless explicitly requested

### Component Library
- **React** (functional components + hooks)
- **Lucide React** for icons
- Custom components in `/components` directory
- Reusable patterns extracted into shared components

### State Management
- **Local state** for simple interactions (useState)
- **Context API** for global app state (user, filters)
- **URL state** for navigation and deep linking

### Performance
- **Lazy load** images and heavy components
- **Virtualize** long lists (if > 50 items)
- **Debounce** search/filter inputs (300ms)
- **Optimize** re-renders (React.memo, useMemo)

---

## 14. Design Token Reference (CSS Variables)

```css
/* Color Tokens */
--color-primary: #E63946;
--color-primary-hover: #D62835;
--color-primary-light: #FF5A67;

--color-success: #28A745;
--color-warning: #FFA500;
--color-error: #DC3545;
--color-info: #4A90E2;

--color-text-primary: #1A1A1A;
--color-text-secondary: #6B7280;
--color-text-tertiary: #9CA3AF;
--color-text-disabled: #D1D5DB;

--color-border: #E5E7EB;
--color-surface: #FFFFFF;
--color-background: #F8F9FA;

/* Spacing Tokens */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 12px;
--space-lg: 16px;
--space-xl: 24px;
--space-2xl: 32px;

/* Radius Tokens */
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;

/* Shadow Tokens */
--shadow-sm: 0px 2px 4px rgba(0, 0, 0, 0.08);
--shadow-md: 0px 2px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0px 4px 12px rgba(0, 0, 0, 0.12);
--shadow-xl: 0px 8px 24px rgba(0, 0, 0, 0.15);
```

---

## 15. File Naming Conventions

### Components
```
PascalCase:            StaffScheduleCard.tsx
                       ShiftSelector.tsx
                       AttendanceToggle.tsx
```

### Utilities/Helpers
```
camelCase:             formatDate.ts
                       validateShiftLimit.ts
                       filterByDepartment.ts
```

### Assets
```
kebab-case:            icon-schedule.svg
                       image-placeholder.png
```

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 9, 2025 | Initial design guidelines based on Grow Apps UI analysis |

---

**Next Steps:**
This guideline serves as the foundation for the **Staff Schedule** feature design. All new screens, components, and interactions must adhere to these specifications to maintain visual and functional consistency with the existing Grow Apps platform.
