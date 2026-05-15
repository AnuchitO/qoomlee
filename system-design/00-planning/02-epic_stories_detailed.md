# QOOMLEE AIRLINE SYSTEM - EPIC LEVEL BREAKDOWN

## EPIC 01: AUTHENTICATION SYSTEM
**Business Value:** Secure user access control enabling staff operations and passenger self-service
**ROI:** Prevents unauthorized access, ensures compliance with airline regulations, enables role-based functionality
**Goals:** Implement secure authentication system supporting staff login and role-based access control

### Sprint 1 Goals:
- Establish secure user authentication
- Implement role-based access control
- Create user session management

### Stories:
**Story #AUTH-001: User Registration & Account Creation**
- **INVEST:** Independent, Negotiable, Valuable, Estimable, Small, Testable
- **Description:** As a staff member, I want to register/create an account so that I can access the Qoomlee system securely
- **Acceptance Criteria:**
  - User can create account with email and password
  - Password must meet security requirements (min 8 chars, special char, etc.)
  - Email verification required before activation
  - Account creation triggers welcome email
- **Test Scenarios:**
  - Valid registration data creates account
  - Invalid email format shows error
  - Weak password shows strength requirements
  - Duplicate email shows error
- **Out of Scope:** Social login, password recovery
- **Dependencies:** None
- **Vertical Slice:** UI Form → API Endpoint → Database → Email Service
- **Size:** 5 points

**Story #AUTH-002: User Login & Session Management**
- **INVEST:** Independent, Negotiable, Valuable, Estimable, Small, Testable
- **Description:** As a registered user, I want to securely log in to the system so that I can access authorized features
- **Acceptance Criteria:**
  - User can log in with email/password
  - JWT token generated upon successful login
  - Session expires after 30 minutes of inactivity
  - Failed login attempts trigger lockout after 5 attempts
- **Test Scenarios:**
  - Valid credentials grant access
  - Invalid credentials show error message
  - Locked account shows appropriate message
  - Session timeout works as expected
- **Out of Scope:** Biometric authentication, social login
- **Dependencies:** Story #AUTH-001
- **Vertical Slice:** UI Form → API Endpoint → Authentication Service → Session Management
- **Size:** 8 points

**Story #AUTH-003: Role-Based Access Control**
- **INVEST:** Independent, Negotiable, Valuable, Estimable, Small, Testable
- **Description:** As a system administrator, I want to assign roles to users so that they can access only authorized functionality
- **Acceptance Criteria:**
  - Different roles have different permissions (Ground Agent, Gate Officer, Admin)
  - Unauthorized access attempts redirect to permission denied page
  - Role assignments can be modified by administrators
  - Audit trail maintained for role changes
- **Test Scenarios:**
  - Ground Agent can access booking features
  - Gate Officer can access check-in features
  - Admin can access all features
  - User with no role has limited access
- **Out of Scope:** Advanced permission matrix, custom roles
- **Dependencies:** Story #AUTH-002
- **Vertical Slice:** Role Assignment UI → API → Permission Service → UI Enforcement
- **Size:** 8 points

## EPIC 02: FLIGHT MANAGEMENT SYSTEM
**Business Value:** Core airline operations enabling flight creation, scheduling, and aircraft assignment
**ROI:** Enables revenue generation, operational efficiency, regulatory compliance
**Goals:** Implement flight creation, scheduling, and aircraft management capabilities

### Sprint 1 Goals:
- Enable flight creation and management
- Implement flight search functionality
- Create flight scheduling capabilities

### Stories:
**Story #FLIGHT-001: Flight Creation Interface**
- **INVEST:** Independent, Negotiable, Valuable, Estimable, Small, Testable
- **Description:** As an operations admin, I want to create flights with all necessary details so that passengers can book them
- **Acceptance Criteria:**
  - Admin can create flight with flight number, origin, destination
  - Aircraft assignment capability
  - Scheduled departure and arrival times
  - Route information stored and validated
- **Test Scenarios:**
  - Valid flight data creates flight record
  - Invalid IATA codes show validation errors
  - Aircraft not available shows conflict error
  - Duplicate flight numbers handled appropriately
- **Out of Scope:** Dynamic pricing, seasonal scheduling
- **Dependencies:** None
- **Vertical Slice:** Flight Creation UI → Flight API → Flight Service → Database Storage
- **Size:** 8 points

**Story #FLIGHT-002: Flight Search Functionality**
- **Description:** As a passenger, I want to search for flights so that I can find suitable travel options
- **Acceptance Criteria:**
  - Search by origin/destination
  - Filter by date and time
  - Display flight availability and pricing
  - Sort by price, duration, departure time
- **Test Scenarios:**
  - Valid search returns matching flights
  - No availability shows appropriate message
  - Filters work correctly
  - Sort options function as expected
- **Out of Scope:** Advanced filters, flexible dates
- **Dependencies:** Story #FLIGHT-001
- **Vertical Slice:** Search UI → Search API → Flight Service → Database Query → Results Display
- **Size:** 13 points

## EPIC 03: BOOKING SYSTEM
**Business Value:** Core revenue generation through passenger bookings
**ROI:** Direct revenue impact, customer acquisition, competitive advantage
**Goals:** Enable passenger booking creation, management, and payment processing

### Sprint 2 Goals:
- Implement booking creation and management
- Enable passenger information collection
- Integrate with flight and payment systems

### Stories:
**Story #BOOK-001: Passenger Information Collection**
- **INVEST:** Independent, Negotiable, Valuable, Estimable, Small, Testable
- **Description:** As a passenger, I want to provide my personal information so that I can complete my booking
- **Acceptance Criteria:**
  - Collect passenger name, contact information
  - Validate required fields
  - Store passenger data securely
  - Link passenger to booking
- **Test Scenarios:**
  - Valid passenger data accepted
  - Required fields validation works
  - Invalid data shows appropriate errors
  - Data stored securely and retrievable
- **Out of Scope:** Passenger profile management, loyalty integration
- **Dependencies:** Story #FLIGHT-002
- **Vertical Slice:** Passenger Form UI → Passenger API → Passenger Service → Secure Database Storage
- **Size:** 5 points

**Story #BOOK-002: Booking Creation Process**
- **INVEST:** Independent, Negotiable, Valuable, Estimable, Small, Testable
- **Description:** As a passenger, I want to create a booking so that I can secure my flight seat
- **Acceptance Criteria:**
  - Booking created with selected flight
  - Passenger information linked to booking
  - Booking reference (PNR) generated
  - Booking status set to pending
- **Test Scenarios:**
  - Valid booking creates reservation
  - Double booking prevented
  - PNR generated correctly
  - Booking status updates appropriately
- **Out of Scope:** Group bookings, complex itineraries
- **Dependencies:** Story #BOOK-001, Story #FLIGHT-002
- **Vertical Slice:** Booking UI → Booking API → Booking Service → Database → Confirmation
- **Size:** 13 points

## EPIC 04: PAYMENT PROCESSING
**Business Value:** Revenue collection and financial transaction processing
**ROI:** Direct revenue impact, financial compliance, customer trust
**Goals:** Implement secure payment processing and transaction management

### Sprint 3 Goals:
- Integrate payment gateway
- Process payments securely
- Handle payment confirmations and failures

### Stories:
**Story #PAY-001: Payment Processing Integration**
- **INVEST:** Independent, Negotiable, Valuable, Estimable, Small, Testable
- **Description:** As a passenger, I want to securely process my payment so that I can complete my booking
- **Acceptance Criteria:**
  - Accept major credit cards (Visa, Mastercard, Amex)
  - Process payment through secure gateway (Omise)
  - Handle payment success/failure scenarios
  - Generate payment receipt
- **Test Scenarios:**
  - Successful payment completes booking
  - Failed payment shows appropriate error
  - Card validation works correctly
  - Receipt generated and sent
- **Out of Scope:** Cryptocurrency, buy-now-pay-later
- **Dependencies:** Story #BOOK-002
- **Vertical Slice:** Payment Form → Payment API → Payment Gateway → Booking Update → Receipt Generation
- **Size:** 13 points

## EPIC 05: CHECK-IN SYSTEM
**Business Value:** Operational efficiency and passenger convenience
**ROI:** Reduced airport processing time, improved passenger satisfaction, operational cost reduction
**Goals:** Enable online and offline check-in with seat assignment

### Sprint 4 Goals:
- Implement online check-in functionality
- Enable seat assignment
- Generate boarding passes

### Stories:
**Story #CHECK-001: Online Check-in Process**
- **INVEST:** Independent, Negotiable, Valuable, Estimable, Small, Testable
- **Description:** As a passenger, I want to check in online so that I can save time at the airport
- **Acceptance Criteria:**
  - Retrieve booking using last name and PNR
  - Verify check-in eligibility (within allowed timeframe)
  - Assign or confirm seat
  - Update booking status to checked-in
- **Test Scenarios:**
  - Valid booking allows check-in
  - Outside check-in window shows restriction
  - Seat assignment works correctly
  - Status updates appropriately
- **Out of Scope:** Group check-in, special assistance
- **Dependencies:** Story #BOOK-002
- **Vertical Slice:** Check-in UI → Check-in API → Check-in Service → Booking Update → Seat Assignment
- **Size:** 8 points

## EPIC 06: BOARDING PASS SYSTEM
**Business Value:** Passenger identification and flight authorization
**ROI:** Operational efficiency, regulatory compliance, passenger convenience
**Goals:** Generate, manage, and validate digital boarding passes

### Sprint 4 Goals:
- Generate digital boarding passes
- Enable pass validation
- Implement pass distribution

### Stories:
**Story #BPASS-001: Boarding Pass Generation**
- **INVEST:** Independent, Negotiable, Valuable, Estimable, Small, Testable
- **Description:** As a passenger who has checked in, I want a digital boarding pass so that I can board my flight
- **Acceptance Criteria:**
  - Generate boarding pass with QR code after check-in
  - Include flight information, passenger name, seat
  - Barcode follows IATA BCBP standards
  - Pass downloadable and shareable
- **Test Scenarios:**
  - Successful check-in generates boarding pass
  - QR code scans correctly
  - All required information present
  - Download and sharing functions work
- **Out of Scope:** Physical printing, custom branding
- **Dependencies:** Story #CHECK-001
- **Vertical Slice:** Check-in Confirmation → Boarding Pass API → Pass Generator → QR Code → Distribution
- **Size:** 8 points