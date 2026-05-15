# QOOMLEE AIRLINE SYSTEM - UI MOCKUPS

Based on the DESIGN.md system, here are the 3 essential UI screens for the MVP:

## 1. FLIGHT SEARCH SCREEN

```
┌─────────────────────────────────┐
│  [Qoomlee Airline]         [P] │  ← Header component
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐ │  ← Hero Banner component
│  │     Flight Search           │ │
│  │   Find your perfect flight  │ │
│  │        Fly Smart.           │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │  ← Form Card component
│  │                             │ │
│  │  [ ] Round trip   [✓] One way│ │  ← Trip type selector
│  │                             │ │
│  │  From                    To  │ │
│  │  ┌──────────┐  ┌──────────┐ │ │  ← Input Field components
│  │  │BKK       │  │CNX       │ │ │
│  │  │Bangkok   │  │Chiang Mai│ │ │
│  │  └──────────┘  └──────────┘ │ │
│  │                             │ │
│  │  Departure               Return│ │
│  │  ┌──────────┐  ┌──────────┐ │ │  ← Input Field components
│  │  │20 May    │  │27 May    │ │ │
│  │  │Wed 08:00 │  │Wed 08:00 │ │ │
│  │  └──────────┘  └──────────┘ │ │
│  │                             │ │
│  │  Travelers: 1 Adult [▼]    │ │  ← Traveler selector
│  │                             │ │
│  │  [Search Flights]           │ │  ← Button Primary component
│  │                             │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │  ← Section Card component
│  │   Popular Destinations      │ │
│  │  • Bangkok → Phuket         │ │
│  │  • Chiang Mai → Bangkok     │ │
│  │  • Kuala Lumpur → Singapore │ │
│  └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## 2. BOOKING PAGE

```
┌─────────────────────────────────┐
│  [Qoomlee Airline]         [P] │  ← Header component
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐ │  ← Hero Banner component
│  │      Book Your Flight       │ │
│  │    Complete your booking    │ │
│  │        Fly Smart.           │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │  ← Form Card component
│  │                             │ │
│  │  Flight Details             │ │
│  │  ┌─────────────────────────┐ │ │
│  │  │BKK → CNX                │ │ │
│  │  │May 20 | 08:00 - 10:30  │ │ │
│  │  │Flight QQ101 | Economy   │ │ │
│  │  └─────────────────────────┘ │ │
│  │                             │ │
│  │  Passenger Information     │ │
│  │  ┌─────────────────────────┐ │ │
│  │  │First Name               │ │ │
│  │  │[John                   ]│ │ │  ← Input Field component
│  │  │                         │ │ │
│  │  │Last Name                │ │ │
│  │  │[Smith                  ]│ │ │  ← Input Field component
│  │  │                         │ │ │
│  │  │Email                    │ │ │
│  │  │[john@example.com       ]│ │ │  ← Input Field component
│  │  │                         │ │ │
│  │  │Phone Number             │ │ │
│  │  │[+66XXXXXXXXX           ]│ │ │  ← Input Field component
│  │  └─────────────────────────┘ │ │
│  │                             │ │
│  │  [Continue to Payment]      │ │  ← Button Primary component
│  │                             │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │  ← Section Card component
│  │      Price Summary          │ │
│  │  Base Fare:        2,500 THB│ │
│  │  Taxes & Fees:       250 THB│ │
│  │  Total:             2,750 THB│ │
│  └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## 3. ONLINE CHECK-IN PAGE

```
┌─────────────────────────────────┐
│  [Qoomlee Airline]         [P] │  ← Header component
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐ │  ← Hero Banner component
│  │       Online Check-in       │ │
│  │    Check in online and      │ │
│  │     save time at the        │ │
│  │         airport             │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │  ← Form Card component
│  │                             │ │
│  │  Retrieve Your Booking      │ │
│  │                             │ │
│  │  Last Name                  │ │
│  │  [Smith                   ] │ │  ← Input Field component
│  │                             │ │
│  │  Booking reference (PNR)    │ │
│  │  [ABC123 OR 1234567890123] │ │  ← Input Field component
│  │                             │ │
│  │  [Retrieve Booking]         │ │  ← Button Primary component
│  │                             │ │
│  │  ┌─────────────────────────┐ │ │  ← Section Card component
│  │  │ Tip: Online check-in    │ │ │
│  │  │ opens 24 hours before   │ │ │
│  │  │ departure and closes 2  │ │ │
│  │  │ hours before departure. │ │ │
│  │  └─────────────────────────┘ │ │
│  │                             │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │  ← Section Card component
│  │      Flight Status          │ │
│  │  Track your flight in       │ │
│  │  real-time. Get updates on  │ │
│  │  departure, arrival, gate   │ │
│  │  changes, and delays.       │ │
│  │  [Check Status →]          │ │
│  └─────────────────────────────┘ │
│                                 │
│                                 │
│  ┌─────────────────────────────┐ │  ← Bottom Nav component
│  │ ◉Home ▪Flights ▪Check-in   │ │
│  │ ▪Manage ▪Contact           │ │
│  └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## COMPONENT SPECIFICATIONS

### Header Component
- Height: 64px
- Background: White
- Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
- Padding: 16px
- Contains logo on left and user indicator on right

### Hero Banner Component
- Gradient: linear-gradient(to bottom, #0E70CA, #1D4ED8)
- Text: White, centered
- Padding: 32px 24px
- Border Radius: 32px 32px 0 0

### Form Card Component
- Background: White
- Margin: -16px 16px 16px 16px
- Padding: 24px
- Border Radius: 16px
- Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- Z-index: 10

### Input Field Component
- Border: 1px solid #D1D5DB
- Border Radius: 12px
- Padding: 10px 16px
- Font Size: 14px
- Placeholder: #6B7280
- Focus: Ring 2px #0E70CA, border transparent

### Button Primary Component
- Background: #0E70CA (Primary)
- Text: White
- Font Size: 16px
- Font Weight: 600
- Padding: 12px 0
- Border Radius: 16px
- Height: 48px
- Hover: #1D4ED8

### Section Card Component
- Background: White
- Padding: 24px
- Margin: 16px
- Border Radius: 16px
- Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

### Bottom Navigation Component
- Fixed at bottom
- Background: White
- Border Top: 1px solid #D1D5DB
- Padding: 8px 4px
- Icons with labels for navigation