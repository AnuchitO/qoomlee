# STITCH PROMPT FOR QOOMLEE AIRLINE UI DESIGNS

## Context
Design a modern airline booking and check-in system called "Qoomlee Airline" with a clean, professional aesthetic. The system serves travelers booking flights between Southeast Asian tier-2 cities and Australian gateways. Create a complete user journey from flight search to boarding pass with all necessary sub-pages and detailed interactions, including comprehensive real-world airline procedures and requirements.

## Design System (Based on DESIGN.md)
- Primary Color: #0E70CA (Sky Blue)
- Secondary Color: #1A3557 (Dark Blue)
- Accent Color: #E8A020 (Gold)
- Success: #10B981, Warning: #F59E0B, Error: #EF4444
- Typography: System fonts (iOS/Android native)
- Rounded corners: 12px standard radius
- Spacing: Based on 8px grid system

## USER JOURNEY FLOW
Design a complete end-to-end user experience with these sequential steps:
1. **Flight Discovery** → 2. **Flight Selection** → 3. **Passenger Info** → 4. **Travel Requirements** → 5. **Payment** → 6. **Booking Confirmation** → 7. **Online Check-in** → 8. **Boarding Pass**

## SCREEN 1: Flight Search Screen
Design a mobile-friendly flight search interface with:
- Header with Qoomlee logo and user profile icon
- Hero banner with gradient background (#0E70CA to #1D4ED8)
- Clear title "Flight Search" and subtitle "Find your perfect flight"
- Search form with:
  - Trip type toggle (Round trip vs One way)
  - From/To city selection fields with autocomplete and city suggestions
  - Departure/Return date selectors with calendar widget and date validation
  - Traveler count selector (adults, children, infants) with detailed selection modal
  - Cabin class selector (Economy, Premium Economy, Business)
  - Prominent "Search Flights" button
- Additional section for "Popular Destinations" with inspiring imagery
- **User Action:** Taps "Search Flights" to go to results screen

### SUB-PAGE 1.1: Date Selection Calendar
- Interactive calendar showing available dates
- Visual indicators for flexible date options
- Return date selection with validation for trip duration
- **User Action:** Selects dates and returns to search screen

### SUB-PAGE 1.2: Traveler Selection Modal
- Detailed traveler selection with:
  - Adults count (+/- buttons)
  - Children ages (dropdowns for age selection)
  - Infants (age and lap/seat selection)
  - **User Action:** Confirms selection and returns to search screen

### SUB-PAGE 1.3: Cabin Class Selection
- Options: Economy, Premium Economy, Business
- Price comparison between classes
- Feature comparison (baggage allowance, seat comfort, etc.)
- **User Action:** Selects cabin class and returns to search screen

## SCREEN 2: Flight Results Screen
Design flight selection results with:
- Header with search summary and "Edit Search" link
- Filter bar with expandable options (price, duration, departure time, stops, airline)
- Sorting options dropdown (price, duration, departure time, rating)
- List of flight options with:
  - Flight number, origin/destination, times
  - Duration and layover information
  - Price and aircraft type
  - "Select" button for each flight
  - "Show more details" chevron for expanded view
- Price comparison chart
- "Sort by" and "Filter" options
- **User Action:** Taps "Select" to proceed to passenger info

### SUB-PAGE 2.1: Flight Detail View
- Expanded flight information:
  - Complete itinerary with layovers
  - Aircraft details and amenities
  - Baggage policy
  - Layover details (city, duration, airport)
  - Travel requirements (visa, vaccination, customs)
  - Flight status and reliability rating
- "Select Flight" button
- **User Action:** Taps "Select Flight" to proceed or "Back" to results

### SUB-PAGE 2.2: Filters Modal
- Expandable filter sections:
  - Price range slider
  - Maximum stops
  - Departure time ranges
  - Airlines selection
  - Connection time minimums
  - Aircraft type preferences
  - On-time performance ratings
- "Apply Filters" button
- **User Action:** Applies filters and returns to results

### SUB-PAGE 2.3: Sorting Options
- Sort by: Price (low to high), Duration, Departure time, Arrival time, Rating, On-time performance
- **User Action:** Selects sorting option and returns to results

## SCREEN 3: Passenger Information Screen
Design passenger details collection with:
- Header with flight summary (route, date, time, price)
- Tabs for each passenger if multiple travelers
- Form to collect passenger information:
  - First name field
  - Last name field
  - Gender selection
  - Date of birth (with calendar picker)
  - Nationality selection
  - Passport/ID number
  - Passport expiry date
  - Country of residence
  - Email address field
  - Phone number field (with country code selector)
  - Special requests section (dietary, wheelchair, medical needs)
- Seat selection section with interactive seat map
- Emergency contact information
- "Continue to Travel Requirements" button
- **User Action:** Taps "Continue to Travel Requirements" to proceed

### SUB-PAGE 3.1: Interactive Seat Map
- Visual seat map for selected aircraft
- Seat availability with color coding
- Seat class and price differences displayed
- Ability to select seats for all passengers
- Seat details on selection (legroom, exit row, etc.)
- Family seating recommendations
- "Continue" button
- **User Action:** Selects seats and continues to travel requirements

### SUB-PAGE 3.2: Special Requests Modal
- Dietary requirements selection
- Mobility assistance options
- Medical needs information
- Additional services (extra baggage, lounge access)
- **User Action:** Confirms requests and returns to passenger info

### SUB-PAGE 3.3: Multiple Passenger Tabs
- Separate tabs for each passenger
- Ability to copy information from first passenger
- Individual validation for each passenger
- Passport/ID photo upload for each passenger
- **User Action:** Completes all passengers and continues

## SCREEN 4: Travel Requirements Screen
Design comprehensive travel requirements verification with:
- Header with flight information and requirements checklist
- International travel requirements section:
  - Passport validity checker (must be valid for 6 months beyond travel)
  - Visa requirements verification by nationality/destination
  - Vaccination certificate requirements (COVID, yellow fever, etc.)
  - Travel insurance recommendations
  - Customs declaration preparation
- Domestic travel requirements:
  - Government-issued ID verification
  - Travel permits (if required)
- Health documentation upload section
- "I confirm all requirements are met" checkbox
- "Continue to Payment" button (disabled until requirements are confirmed)
- **User Action:** Reviews and confirms all requirements, then continues to payment

### SUB-PAGE 4.1: Visa Requirements Checker
- Automated visa requirement check based on nationality and destination
- Visa application links and requirements
- Visa processing time information
- Visa exemption information if applicable
- "Check Again" button to verify changes
- **User Action:** Reviews visa requirements and confirms

### SUB-PAGE 4.2: Vaccination Certificate Upload
- Document upload interface for vaccination certificates
- Supported formats and file size limits
- Automatic verification of certificate validity
- Reminder about destination country requirements
- **User Action:** Uploads documents and continues

### SUB-PAGE 4.3: Travel Insurance Options
- Insurance package comparison
- Coverage details for medical, baggage, delays
- Cost comparison and recommendations
- Purchase option or "Continue without insurance"
- **User Action:** Selects insurance or continues without

## SCREEN 5: Payment Screen
Design secure payment processing with:
- Header with booking summary (passengers, flight, price breakdown)
- Payment method selection tabs (Credit Card, Debit Card, PayPal, Bank Transfer, Digital Wallets)
- Credit card form with:
  - Card number field with real-time validation
  - Expiry date with month/year pickers
  - CVV with help icon for location
  - Cardholder name
  - Save card option with security note
- Billing address section (auto-populated from passenger if same)
- Promotional code field with "Apply" button
- Price breakdown (base fare, taxes, fees, baggage, total) with expandable details
- Terms and conditions checkbox with link to full terms
- Cancellation policy information
- "Secure Payment" button with lock icon and security assurance
- **User Action:** Taps "Secure Payment" to complete booking

### SUB-PAGE 5.1: Alternative Payment Methods
- PayPal login interface
- Bank transfer instructions with reference number
- Digital wallet options (Apple Pay, Google Pay, Samsung Pay)
- Buy now, pay later options (if available)
- Corporate payment methods (if business booking)
- **User Action:** Completes payment method and returns to main payment screen

### SUB-PAGE 5.2: Billing Address Form
- Address line 1 and 2
- City, state/province, postal code
- Country selection
- Tax ID/VAT number (for business bookings)
- **User Action:** Saves address and returns to payment screen

### SUB-PAGE 5.3: Terms and Conditions Modal
- Scrollable terms and conditions
- Cancellation policy details
- Baggage policy details
- Refund policy information
- "Accept" and "Go Back" buttons
- **User Action:** Accepts terms to return to payment screen

### SUB-PAGE 5.4: Payment Security Verification
- 3D Secure authentication (if required)
- SMS verification code entry
- Biometric authentication option (if device supports)
- **User Action:** Completes verification and returns to payment processing

## SCREEN 6: Booking Confirmation Screen
Design booking confirmation with:
- Large success message with animated checkmark icon
- Booking reference (PNR) prominently displayed with copy option
- Flight details summary with timeline view
- Passenger information confirmation
- Price breakdown and payment confirmation
- Travel requirements status indicators
- "View Booking Details" button
- "Download Itinerary" button
- "Add to Calendar" button
- "Continue Shopping" button
- Email/SMS confirmation options with resend capability
- **User Action:** Can tap "View Booking" to see details or proceed to check-in later

### SUB-PAGE 6.1: Booking Details Modal
- Comprehensive booking information:
  - All flight segments
  - Passenger details
  - Seat assignments
  - Special requests
  - Payment details
  - Cancellation policy
  - Travel requirements status
  - Visa/entry requirements reminder
- "Save as PDF" option
- **User Action:** Can save information or close modal

### SUB-PAGE 6.2: Share Options Modal
- Social media sharing options
- Email itinerary
- SMS itinerary
- Calendar integration
- **User Action:** Selects sharing method and returns to confirmation

### SUB-PAGE 6.3: Travel Preparation Checklist
- Pre-flight checklist:
  - Check-in reminder (24 hours before)
  - Document verification checklist
  - Baggage allowance confirmation
  - Airport arrival time recommendation
- "Set Reminders" option for check-in and airport arrival
- **User Action:** Sets reminders or dismisses checklist

## SCREEN 7: Online Check-in Screen
Design an online check-in interface with:
- Header with Qoomlee branding
- Hero banner with title "Online Check-in"
- Subtitle "Check in online and save time at the airport"
- Form to retrieve booking:
  - Last name field
  - Booking reference (PNR) field
  - Email address field (alternative lookup method)
  - "Retrieve Booking" button
- Informational tip section about check-in timing (opens 24h before, closes 2h before)
- Flight status section with link to check real-time status
- Recent bookings quick access (for logged-in users)
- Bottom navigation bar with icons for Home, Flights, Check-in, Manage Booking, and Contact
- **User Action:** Enters booking details and taps "Retrieve Booking"

### SUB-PAGE 7.1: Booking Retrieval Results
- Multiple booking options if user has several
- Flight information for each booking
- "Check-in" button for eligible bookings
- Date/time until check-in opens for others
- **User Action:** Selects booking to check-in

### SUB-PAGE 7.2: Check-in Eligibility Verification
- System checks booking validity and check-in time window
- Displays eligibility status:
  - ✅ "Check-in available now" (if within time window)
  - ❌ "Check-in not available yet" (if too early)
  - ❌ "Check-in closed" (if too late)
  - ❌ "Invalid booking" (if PNR/name mismatch)
- Countdown timer until check-in opens (if applicable)
- Email reminder option to notify when check-in opens
- **User Action:** Proceeds if eligible, waits if too early, or contacts support if invalid

## SCREEN 8: Passenger Selection Screen
Design passenger selection for check-in with:
- Header with flight information and check-in progress
- List of all passengers on the booking (names and passenger types)
- Select/deselect options for each passenger
- "Check-in Selected Passengers" button (only enabled when at least one passenger selected)
- Option to "Check-in All Passengers" (if all eligible)
- Clear indication of which passengers are eligible for online check-in
- **User Action:** Selects passengers and taps "Check-in Selected Passengers"

### SUB-PAGE 8.1: Passenger Eligibility Check
- Validates each passenger's eligibility for online check-in:
  - Age restrictions (infants under 2 may have different procedures)
  - Special assistance requirements
  - Visa/residency requirements for destination
  - Previous check-in status (cannot check-in twice)
  - Travel document validity
- Displays eligibility status for each passenger
- **User Action:** Reviews eligibility and proceeds with eligible passengers

## SCREEN 9: Individual Passenger Check-in Flow
Design comprehensive individual passenger check-in with:
- Header with passenger name and progress indicator (Passenger X of Y)
- Tabbed interface for each required step:
  - Personal Details
  - Baggage Declaration
  - Seat Selection
  - Dangerous Goods Declaration
  - Special Services
- Progress bar showing completion status
- "Save & Continue" button for each section
- "Skip for Now" option for non-mandatory sections
- **User Action:** Completes each tab and moves to next passenger or boarding pass

### SUB-PAGE 9.1: Personal Details Verification
- Passenger name and booking reference display
- Contact information verification:
  - Mobile phone number (for flight updates)
  - Email address (for boarding pass delivery)
- Emergency contact information (if not already provided)
- Travel document information (passport/ID number, expiry date)
- "Confirm & Continue" button
- **User Action:** Verifies details and continues

### SUB-PAGE 9.2: Baggage Declaration
- Number of checked bags input field (with +/- controls)
- Baggage weight verification (max 23kg per bag)
- Oversize item declaration (length+width+height >158cm)
- Special baggage types (musical instruments, sports equipment)
- Baggage fee calculation and payment if excess
- Carry-on baggage confirmation (max 7kg, dimensions 56x45x25cm)
- "Confirm Baggage" button
- **User Action:** Declares baggage and continues

### SUB-PAGE 9.3: Seat Selection
- Interactive seat map for the aircraft
- Available seats highlighted in green
- Occupied seats shown in red
- Seat class indicators (standard, extra legroom, premium)
- Seat price information (if applicable)
- Family seating recommendations
- "Select Seat" button for chosen seat
- "Keep Current Seat" option if already assigned
- **User Action:** Selects seat and continues

### SUB-PAGE 9.4: Dangerous Goods Declaration
- Legal declaration form for dangerous goods:
  - "I declare that I am not carrying any dangerous goods in my baggage"
  - Checkbox for passenger to acknowledge and agree
  - Information about prohibited items (explosives, flammables, toxic substances, etc.)
  - List of common prohibited items with examples
  - Link to complete dangerous goods policy
- "I Agree" button (mandatory to proceed)
- **User Action:** Acknowledges and agrees to the declaration

### SUB-PAGE 9.5: Special Services
- Special meal requests:
  - Vegetarian/Vegan
  - Religious meals (Halal, Kosher)
  - Medical dietary requirements
  - Children's meals
- Special assistance:
  - Wheelchair assistance
  - Medical assistance
  - Unaccompanied minor services
- Additional services:
  - Lounge access
  - Priority boarding
  - Fast track security
- "Save Preferences" button
- **User Action:** Selects services and continues to next passenger or boarding pass

## SCREEN 10: Check-in Review and Confirmation
Design final check-in review with:
- Summary of all checked-in passengers
- Seat assignments for each passenger
- Baggage declarations
- Special service requests
- Dangerous goods declarations acknowledged
- "Complete Check-in" button
- "Make Changes" option to go back to individual passenger details
- Flight status and gate information
- Airport navigation information
- Security and boarding timeline
- **User Action:** Reviews information and completes check-in

## SCREEN 11: Digital Boarding Pass Screen
Design a digital boarding pass display with:
- Header with Qoomlee branding and options menu (share, print, add to wallet)
- Flight information prominently displayed:
  - Airline name and logo (Qoomlee)
  - Flight number (e.g., QQ101)
  - Origin and destination (e.g., BKK → CNX)
  - Date and time (e.g., May 20, 08:00)
  - Gate information
  - Boarding time
  - Terminal and concourse
- Passenger information:
  - Passenger name (formatted as on ID)
  - Seat number
  - Booking reference (PNR)
  - Passenger status (checked-in)
- Large scannable QR code in the center (high contrast, large size)
- Baggage claim information (baggage carousel number)
- Important notices or instructions
- Airport map with gate location
- Security checkpoint information
- Options: "Add to Wallet", "Share", "Print", "Save Image", "More Options"
- Footer with flight status and gate information
- For multiple passengers: Tabbed interface or scrollable list
- **User Action:** Can save to wallet, share, or present for scanning

### SUB-PAGE 11.1: Boarding Pass Options Menu
- Add to Apple Wallet
- Add to Google Pay
- Share via messaging/email
- Print boarding pass
- Save as image
- Add to calendar
- **User Action:** Selects option and executes action

### SUB-PAGE 11.2: Multiple Boarding Passes
- Tabbed interface for multiple passengers in same booking
- Individual QR codes for each passenger
- Timeline view of entire journey
- Option to download all as PDF
- **User Action:** Navigates between passenger boarding passes

## SCREEN 12: Manage Booking Screen
Design booking management with:
- Header with booking reference and status indicator
- Flight details and timeline view
- Passenger list with check-in status
- Booking status indicators (confirmed, checked-in, etc.)
- Options: "Change Flight", "Request Refund", "Add Services", "Cancel Booking", "Check-in Again" (if eligible)
- Payment history and receipts
- Travel requirements status
- Contact customer service option
- **User Action:** Can modify booking or contact support

### SUB-PAGE 12.1: Change Flight Options
- Available alternative flights
- Price difference calculation
- Change fee information
- "Confirm Change" button
- **User Action:** Selects new flight and confirms change

### SUB-PAGE 12.2: Refund Request Form
- Refund reason selection
- Supporting documentation upload
- Refund policy information
- "Submit Request" button
- **User Action:** Submits refund request

### SUB-PAGE 12.3: Additional Services
- Extra baggage purchase
- Seat upgrade options
- Lounge access
- Travel insurance
- **User Action:** Selects services and adds to booking

### SUB-PAGE 12.4: Re-check-in Option
- For passengers who need to re-check-in
- Validates eligibility (still within check-in window)
- Option to update baggage or seat preferences
- **User Action:** Proceeds with re-check-in if eligible

## ADDITIONAL REAL-WORLD FLOWS

### Flight Disruption Management
- Delay/Cancellation notifications
- Rebooking options with minimal fuss
- Accommodation arrangements if overnight delay
- Compensation information and claims process
- Real-time updates and communication

### Special Circumstances
- Unaccompanied minor check-in with additional documentation
- Pet travel requirements and documentation
- Medical clearance procedures
- Visa/residency document verification
- Group travel management

### Security Procedures
- Security screening preparation tips
- Prohibited items information
- Liquid restrictions reminder (100ml containers, 1L bag)
- Enhanced security screening notices
- Special screening requirements for electronics

### International Travel Requirements
- Passport validity checks (6 months beyond travel)
- Visa requirements verification
- Health documentation (vaccination certificates, health forms)
- Customs declaration assistance
- Currency and duty-free shopping information

### Baggage Management
- Checked baggage tracking
- Lost baggage reporting
- Excess baggage fees and payment
- Special baggage handling (fragile, oversized, valuable)
- Baggage allowance by cabin class

### Airport Experience
- Airport navigation maps
- Gate change notifications
- Boarding time updates
- Terminal amenities information
- Transit procedures for connecting flights

## REAL-WORLD TIMELINES
- **Booking Flow:**
  - Flight search and selection: Within 15 minutes
  - Passenger information: 2-5 minutes per passenger
  - Travel requirements: 3-10 minutes depending on documentation
  - Payment: 2-3 minutes
  - Confirmation: Instant

- **Check-in Flow:**
  - Check-in opens: 24 hours before departure
  - Check-in deadline: 90 minutes before domestic flights, 120 minutes before international
  - Gate closes: 45 minutes before domestic, 60 minutes before international
  - Boarding begins: 35 minutes before domestic, 50 minutes before international

- **Documentation:**
  - Passport: Valid for 6+ months beyond travel dates
  - Visas: Applied for 2-3 months before travel
  - Vaccinations: Completed 4+ weeks before travel
  - Insurance: Purchased during booking process

## SCREEN 8: Digital Boarding Pass Screen
Design a digital boarding pass display with:
- Header with Qoomlee branding and options menu (share, print, add to wallet)
- Flight information prominently displayed:
  - Airline name and logo (Qoomlee)
  - Flight number (e.g., QQ101)
  - Origin and destination (e.g., BKK → CNX)
  - Date and time (e.g., May 20, 08:00)
  - Gate information
  - Boarding time
  - Terminal and concourse
- Passenger information:
  - Passenger name (formatted as on ID)
  - Seat number
  - Booking reference (PNR)
- Large scannable QR code in the center (high contrast, large size)
- Baggage claim information
- Important notices or instructions
- Options: "Add to Wallet", "Share", "Print", "Save Image", "More Options"
- Footer with flight status and gate information
- **User Action:** Can save to wallet, share, or present for scanning

### SUB-PAGE 8.1: Boarding Pass Options Menu
- Add to Apple Wallet
- Add to Google Pay
- Share via messaging/email
- Print boarding pass
- Save as image
- Add to calendar
- **User Action:** Selects option and executes action

### SUB-PAGE 8.2: Multiple Boarding Passes
- Tabbed interface for multiple flights in itinerary
- Individual QR codes for each segment
- Timeline view of entire journey
- **User Action:** Navigates between flight segments

## SCREEN 9: Manage Booking Screen
Design booking management with:
- Header with booking reference and status indicator
- Flight details and timeline view
- Passenger list with status
- Booking status indicators (confirmed, paid, etc.)
- Options: "Change Flight", "Request Refund", "Add Services", "Cancel Booking"
- Payment history and receipts
- Contact customer service option
- **User Action:** Can modify booking or contact support

### SUB-PAGE 9.1: Change Flight Options
- Available alternative flights
- Price difference calculation
- Change fee information
- "Confirm Change" button
- **User Action:** Selects new flight and confirms change

### SUB-PAGE 9.2: Refund Request Form
- Refund reason selection
- Supporting documentation upload
- Refund policy information
- "Submit Request" button
- **User Action:** Submits refund request

### SUB-PAGE 9.3: Additional Services
- Extra baggage purchase
- Seat upgrade options
- Lounge access
- Travel insurance
- **User Action:** Selects services and adds to booking

## ADDITIONAL SCREENS
- **Login/Registration Screens** for user account management
- **Forgot Password Flow** with email verification
- **Account Settings** with profile management
- **Flight Status Screen** for real-time updates
- **Baggage Information Screen** for baggage allowance details
- **Airport Information Screen** with terminal/gate details
- **Customer Support Chat** for real-time assistance
- **FAQ Screen** for common questions

## INTERACTION PATTERNS
- **Loading States:** Show progress indicators during search/payment processes
- **Error States:** Clear error messages with recovery options and input validation
- **Success States:** Confirmation messages with clear next steps
- **Empty States:** Helpful messages when no results or bookings exist
- **Offline States:** Graceful degradation with cached information
- **Modal Interactions:** Proper overlay behavior and dismissal options
- **Form Validation:** Real-time validation with helpful error messages
- **Touch Targets:** Minimum 44px for all interactive elements
- **Accessibility:** Proper semantic structure and screen reader support

## ADDITIONAL REQUIREMENTS
- All screens should be mobile-first with 375px width
- Use appropriate spacing and visual hierarchy
- Ensure accessibility with proper contrast ratios (minimum 4.5:1)
- Include appropriate placeholder text in form fields
- Use subtle shadows and elevation for depth
- Maintain consistent color usage throughout
- Include proper form validation states with helpful messages
- Bottom navigation should be fixed at the bottom of screens that need it
- Use intuitive icons for navigation elements with proper labeling
- Implement proper user flow progression with clear action buttons
- Include back navigation options where appropriate
- Design for various loading states and error conditions
- Ensure all interactive elements have proper touch targets (44px minimum)
- Include proper keyboard navigation for accessibility
- Optimize for scanning: QR codes should be large, high contrast, and centered
- Boarding passes should be printable with proper formatting
- Support multiple languages (English and Thai for Thai destinations)