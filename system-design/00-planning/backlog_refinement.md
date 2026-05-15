# QOOMLEE AIRLINE SYSTEM - PRODUCT BACKLOG REFINEMENT

## OVERVIEW
This document contains detailed backlog refinement for all MVP epics and stories. Each item includes acceptance criteria, technical specifications, dependencies, and test scenarios to ensure clear understanding and successful implementation.

## EPIC 01: AUTHENTICATION SYSTEM (AUTH)

### Story #AUTH-001: User Registration & Account Creation
- **Story Points:** 5
- **Priority:** High
- **Sprint:** Sprint 1
- **Dependencies:** None
- **Story Definition:** As a new staff member, I want to register an account so that I can access the Qoomlee system securely.

#### Acceptance Criteria:
- User can create account with email and password
- Password must meet security requirements (min 8 chars, special char, uppercase, lowercase)
- Email verification required before activation
- Account creation triggers welcome email with login instructions
- System validates email format and uniqueness
- User receives confirmation of successful registration
- Password policies meet or exceed industry security standards (aligns with operational requirements)
- Cross-functional: Meet performance requirements (registration <2s response time)

#### Technical Specifications:
- API endpoint: POST /api/auth/register (see API Documentation: Authentication Section)
- Password hashing using bcrypt with salt rounds = 12
- Email verification token expiration: 24 hours, stored in Redis with TTL
- Rate limiting: Max 5 registrations per IP per hour using sliding window counter in Redis
- Input validation: Email format (RFC 5322), password strength (regex pattern), rate limiting with HTTP 429
- Database: PostgreSQL with unique constraint on email field, optimistic locking
- Cross-functional: Structured logging with correlation IDs, audit trail in database

#### Business Scenarios:

**Normal Case:**
Given: A new staff member has been hired and needs system access
When: They visit the registration page and enter valid email and strong password
Then: System creates account, sends verification email, and displays success message

**Positive Case:**
Given: User enters all required fields correctly with strong password
When: They submit the registration form
Then: Account is created, verification email is sent, and user sees confirmation

**Negative Case:**
Given: User enters invalid email format
When: They submit the registration form
Then: System shows error message indicating invalid email format

**Edge Case:**
Given: Multiple users attempt registration with same email simultaneously
When: Both submissions occur at nearly the same time
Then: System accepts first registration and rejects second with duplicate email error

#### Test Scenarios:
- Valid registration data creates account and sends verification email
- Invalid email format shows appropriate error message
- Weak password shows strength requirements
- Duplicate email shows error message
- Rate limit exceeded shows appropriate message
- Email verification link activates account successfully

#### Out of Scope:
- Social login integration
- Password recovery during registration
- Bulk account creation

---

### Story #AUTH-002: User Login & Session Management
- **Story Points:** 8
- **Priority:** High
- **Sprint:** Sprint 1
- **Dependencies:** Story #AUTH-001
- **Story Definition:** As a registered user, I want to securely log in to the system so that I can access authorized features.

#### Acceptance Criteria:
- User can log in with email/password
- JWT token generated upon successful login with 30-minute expiration
- Session expires after 30 minutes of inactivity
- Failed login attempts trigger account lockout after 5 attempts for 30 minutes
- Successful login redirects to appropriate dashboard based on role
- Logout functionality clears session and redirects to login page
- Cross-functional: Meet performance requirements (login <1s response time)

#### Technical Specifications:
- API endpoint: POST /api/auth/login (see API Documentation: Authentication Section)
- JWT token with refresh mechanism: access token 30min TTL, refresh token 7 days TTL
- Session management using secure, HTTP-only cookies with SameSite=Lax
- Login attempt logging for security auditing: IP, timestamp, username, success/failure
- Password comparison using bcrypt hash verification with constant-time comparison
- Account lockout: Redis-based counter with 30-minute TTL per user
- Cross-functional: Structured logging with correlation IDs, audit trail in database
- Cross-functional: Rate limiting on login attempts (max 10 attempts per minute per IP)

#### Business Scenarios:

**Normal Case:**
Given: A registered user with valid credentials
When: They enter correct email and password and submit login form
Then: System authenticates user, generates JWT token, and redirects to appropriate dashboard

**Positive Case:**
Given: User has active session and is inactive for 25 minutes
When: They perform an action before 30-minute timeout
Then: Session remains active and user continues without interruption

**Negative Case:**
Given: User enters incorrect password
When: They attempt to log in with wrong credentials
Then: System shows generic error message and logs failed attempt

**Edge Case:**
Given: User has 4 failed login attempts
When: They make a 5th failed attempt
Then: Account is locked for 30 minutes and user sees lockout notification

#### Test Scenarios:
- Valid credentials grant access and generate JWT token
- Invalid credentials show error message without revealing account existence
- Locked account shows appropriate message with unlock time
- Session timeout works as expected with automatic redirect
- Logout clears session and redirects to login page
- Multiple concurrent sessions handled properly

#### Out of Scope:
- Biometric authentication
- Social login integration
- Remember me functionality

---

### Story #AUTH-003: Role-Based Access Control
- **Story Points:** 8
- **Priority:** High
- **Sprint:** Sprint 1
- **Dependencies:** Story #AUTH-002
- **Story Definition:** As a system administrator, I want to assign roles to users so that they can access only authorized functionality.

#### Acceptance Criteria:
- Different roles have different permissions (Ground Agent, Gate Officer, Admin, Super Admin)
- Unauthorized access attempts redirect to permission denied page
- Role assignments can be modified by administrators with audit trail
- Permissions are enforced at both UI and API levels
- Role-based navigation menus display only authorized options
- Cross-functional: Meet performance requirements (authorization checks <100ms)

#### Technical Specifications:
- Role-based middleware for API endpoints: validates JWT role claims against permission matrix
- Permission matrix stored in database: role_resource_action table with CRUD operations mapping
- JWT token includes role information: roles array in claims with standard role identifiers
- Audit logging for role changes: who, when, what changed, previous/new values in audit_log table
- RBAC implementation with hierarchical permissions: Admin inherits from Ground Agent permissions
- Cross-functional: Caching of permission matrices in Redis for performance
- Cross-functional: Structured logging with correlation IDs for authorization decisions

#### Business Scenarios:

**Normal Case:**
Given: A user with Ground Agent role is logged in
When: They navigate to the flight management section
Then: System displays only authorized features (flight search, booking creation)

**Positive Case:**
Given: An Admin user attempts to access user management
When: They navigate to the user management page
Then: System grants access and displays full user management features

**Negative Case:**
Given: A Ground Agent attempts to access admin-only features
When: They try to navigate to system configuration
Then: System redirects to permission denied page with explanation

**Edge Case:**
Given: A user's role is changed from Ground Agent to Admin while logged in
When: They attempt to access Admin features
Then: System recognizes new role and grants appropriate access after token refresh

#### Test Scenarios:
- Ground Agent can access booking and flight search features only
- Gate Officer can access check-in and manifest features only
- Admin can access all features including user management
- User with no role has limited access to basic information
- Attempting unauthorized access redirects appropriately
- Role changes are reflected immediately in access permissions

#### Out of Scope:
- Advanced permission matrix customization
- Custom role creation by non-administrators
- Temporary role assignments

---

## EPIC 02: FLIGHT MANAGEMENT SYSTEM (FLIGHT)

### Story #FLIGHT-001: Flight Creation Interface
- **Story Points:** 8
- **Priority:** Highest
- **Sprint:** Sprint 1
- **Dependencies:** Story #AUTH-002
- **Story Definition:** As an operations admin, I want to create flights with all necessary details so that passengers can book them.

#### Acceptance Criteria:
- Admin can create flight with flight number, origin, destination, aircraft assignment
- Scheduled departure and arrival times with timezone handling
- Route information validated against airport database
- Aircraft availability checked during assignment
- Flight created with appropriate status (Scheduled, Active, etc.)
- Flight creation triggers notification to relevant teams
- Cross-functional: Meet performance requirements (flight creation <2s response time)

#### Technical Specifications:
- API endpoint: POST /api/flights (see API Documentation: Flight Management Section)
- Database validation for airport IATA codes: 3-letter format, exists in airports table
- Aircraft availability check: query existing flights for same aircraft during overlapping time periods
- Timezone handling: store all times in UTC, display in local timezone based on airport location
- Flight number uniqueness validation: case-insensitive unique constraint with proper locking
- Cross-functional: Distributed locking mechanism using Redis to prevent race conditions
- Cross-functional: Structured logging with correlation IDs for audit trail
- Cross-functional: Validation pipeline with comprehensive error messaging

#### Business Scenarios:

**Normal Case:**
Given: An operations admin is logged in with flight creation permissions
When: They enter flight details including origin, destination, aircraft, and times
Then: System creates flight record, validates against constraints, and notifies relevant teams

**Positive Case:**
Given: Admin enters valid flight information with available aircraft
When: They submit the flight creation form
Then: Flight is created successfully with status "Scheduled" and notifications sent

**Negative Case:**
Given: Admin attempts to assign aircraft that is already scheduled during requested time
When: They submit the flight creation with conflicting aircraft assignment
Then: System shows conflict error and suggests alternative aircraft

**Edge Case:**
Given: Multiple admins attempt to create flights with same flight number simultaneously
When: Both submissions occur at nearly the same time
Then: System accepts first flight number and rejects second with uniqueness error

#### Test Scenarios:
- Valid flight data creates flight record successfully
- Invalid IATA codes show validation errors
- Aircraft not available shows conflict error with suggested alternatives
- Duplicate flight numbers show appropriate error
- Timezone conversion displays correctly for local times
- Aircraft assignment validates capacity against route requirements

#### Out of Scope:
- Dynamic pricing based on demand
- Seasonal scheduling automation
- International route permit validation

---

### Story #FLIGHT-002: Flight Search Functionality
- **Story Points:** 8
- **Priority:** Highest
- **Sprint:** Sprint 1
- **Dependencies:** Story #FLIGHT-001
- **Story Definition:** As a passenger, I want to search for flights so that I can find suitable travel options.

#### Acceptance Criteria:
- Search by origin/destination with autocomplete suggestions
- Filter by date and time with calendar widget
- Display flight availability and pricing with tax breakdown
- Sort by price, duration, departure time, and aircraft type
- Results show layover information if applicable
- Cross-functional: Meet performance requirements (search results <500ms)

#### Technical Specifications:
- API endpoint: GET /api/flights/search (see API Documentation: Flight Management Section)
- Query parameters: origin, destination, departure_date, return_date (optional), passengers
- Caching strategy: Redis cache for popular routes with 15-minute TTL, invalidate on flight updates
- Pagination: 10 results per page, cursor-based pagination to handle large datasets
- Database indexing: Composite indexes on (origin, destination, departure_time), (departure_time, flight_status)
- Real-time availability: Join with seat_inventory table, calculate available seats per fare class
- Cross-functional: Performance benchmarking with SLA of 95% requests <500ms
- Cross-functional: Circuit breaker pattern for external service dependencies

#### Business Scenarios:

**Normal Case:**
Given: A passenger wants to fly from Bangkok to Chiang Mai
When: They enter origin/destination and select travel dates
Then: System displays available flights with pricing and layover information

**Positive Case:**
Given: Multiple flights are available for selected route and dates
When: Passenger applies filters for price and departure time
Then: Results are refined to match selected criteria with updated availability

**Negative Case:**
Given: No flights are available for selected route and dates
When: Passenger submits search for unavailable flights
Then: System shows "No flights available" message with alternative suggestions

**Edge Case:**
Given: Search is performed for same origin and destination
When: Passenger enters identical cities for origin and destination
Then: System shows validation error preventing invalid search

#### Test Scenarios:
- Valid search returns matching flights with accurate availability
- No availability shows appropriate message with alternatives
- Filters work correctly to narrow results
- Sort options function as expected
- Search handles edge cases (same origin/destination, invalid dates)
- Results display accurate pricing including all taxes and fees

#### Out of Scope:
- Multi-city search
- Advanced flexible date algorithms
- Integration with external flight comparison sites

---

### Story #FLIGHT-003: Flight Search Filtering & Sorting
- **Story Points:** 5
- **Priority:** High
- **Sprint:** Sprint 1
- **Dependencies:** Story #FLIGHT-002
- **Story Definition:** As a passenger, I want to filter and sort flight search results so that I can find the most suitable options.

#### Acceptance Criteria:
- Filter by price range, departure time, duration, and aircraft type
- Sort by price, duration, departure time, and arrival time
- Flexible date search shows nearby dates with price comparison
- Results update dynamically as filters are applied
- Cross-functional: Meet performance requirements (filtering <300ms)

#### Technical Specifications:
- API endpoint: GET /api/flights/search (see API Documentation: Flight Management Section)
- Query parameters: price_min, price_max, departure_from, departure_to, duration_max, aircraft_types
- Client-side filtering: JavaScript implementation for immediate UX feedback, server-side validation
- Server-side filtering: SQL WHERE clauses with proper indexing, cache invalidation on filter changes
- Sorting: Multiple sort criteria supported (e.g., sort by price then duration), database ORDER BY with composite indexes
- Cross-functional: Performance monitoring with metrics for filter/sort operations
- Cross-functional: Caching strategy updates when filters change, invalidate on new search

#### Business Scenarios:

**Normal Case:**
Given: Multiple flights are available for selected route and dates
When: Passenger applies filters for price and departure time
Then: Results are refined to match selected criteria with updated availability

**Positive Case:**
Given: Passenger wants to sort flights by lowest price
When: They select price sorting option
Then: Results display in ascending order by total price

**Negative Case:**
Given: No flights match selected filter criteria
When: Passenger applies restrictive filters
Then: System shows "No flights match your filters" with option to reset

**Edge Case:**
Given: Passenger applies multiple filters simultaneously
When: They select price range, time range, and aircraft type
Then: System applies all filters and shows matching results

#### Test Scenarios:
- Filter combinations work correctly together
- Sorting options function as expected
- Performance remains acceptable with multiple filters
- Reset filters functionality works properly
- Filter validation prevents invalid combinations

#### Out of Scope:
- Advanced flexible date algorithms
- Machine learning-based recommendations
- Dynamic pricing based on filter selection

---

## EPIC 03: BOOKING SYSTEM (BOOK)

### Story #BOOK-001: Passenger Information Collection
- **Story Points:** 5
- **Priority:** Highest
- **Sprint:** Sprint 2
- **Dependencies:** Story #FLIGHT-002
- **Story Definition:** As a passenger, I want to provide my personal information so that I can complete my booking.

#### Acceptance Criteria:
- Collect passenger name (first, last, middle), contact information (email, phone)
- Validate required fields and format (email, phone number)
- Store passenger data securely with encryption at rest
- Link passenger to booking with unique identifier
- Support for multiple passengers in single booking
- Special requirements section for accessibility needs
- Cross-functional: Meet performance requirements (passenger creation <1s)

#### Technical Specifications:
- API endpoint: POST /api/passengers, POST /api/passengers/batch (see API Documentation: Passenger Section)
- Field validation: name (max 50 chars per field, international charset), email (RFC 5322), phone (E.164 format)
- PII encryption: AES-256-GCM for sensitive fields (names, contact info), envelope encryption pattern
- Database: Separate encrypted fields for PII, audit trail for access, soft deletes
- GDPR compliance: Right to deletion, data portability, consent tracking
- Cross-functional: Structured logging with data minimization for PII
- Cross-functional: Rate limiting to prevent spam (max 10 requests per minute per IP)

#### Business Scenarios:

**Normal Case:**
Given: A passenger is creating a booking for themselves
When: They enter their complete name, contact information, and special requirements
Then: System validates data, stores encrypted information, and links to booking

**Positive Case:**
Given: Passenger is booking for multiple people
When: They add information for each passenger in the booking
Then: System validates and stores all passenger information with unique identifiers

**Negative Case:**
Given: Passenger enters invalid email format
When: They submit passenger information with incorrect email
Then: System shows validation error requesting correct email format

**Edge Case:**
Given: Passenger has a very long name with international characters
When: They enter their name in the passenger information form
Then: System accepts and stores the name correctly with proper encoding

#### Test Scenarios:
- Valid passenger data accepted and stored securely
- Required fields validation works with clear error messages
- Invalid data formats show appropriate errors
- Data stored securely and retrievable for authorized access
- Multiple passengers in booking handled correctly
- International names and characters handled properly

#### Out of Scope:
- Passenger profile management
- Loyalty program integration
- Government ID verification

---

### Story #BOOK-002: Booking Creation Process
- **Story Points:** 8
- **Priority:** Highest
- **Sprint:** Sprint 2
- **Dependencies:** Story #BOOK-001, Story #FLIGHT-002
- **Story Definition:** As a passenger, I want to create a booking so that I can secure my flight seat.

#### Acceptance Criteria:
- Booking created with selected flight and passenger information
- Seat inventory updated to reflect availability changes
- Booking reference (PNR) generated following IATA standards (6 alphanumeric characters)
- Booking status set to "Pending Payment" initially, then "Confirmed" after payment
- Passenger notification sent with booking details
- Cross-functional: Meet performance requirements (booking creation <2s)

#### Technical Specifications:
- API endpoint: POST /api/bookings (see API Documentation: Booking Section)
- Payload: flight_id, passenger_ids, seat_selection, fare_class
- Distributed locking: Redis-based lock with 8-minute TTL for seat reservation
- PNR generation: Random 6-character alphanumeric string with collision detection and retry
- Database transaction: Atomic operation for booking creation, passenger association, and seat lock
- Inventory update: Decrement available seats in seat_inventory table, update with optimistic locking
- Event publishing: Publish booking.created event to Redis Streams for notification service
- Cross-functional: Circuit breaker for external dependencies, structured logging with correlation IDs
- Cross-functional: Idempotency keys to handle duplicate requests safely

#### Business Scenarios:

**Normal Case:**
Given: Passenger has selected a flight and entered passenger information
When: They submit the booking creation request
Then: System reserves seat, generates PNR, sets status to "Pending Payment", and sends confirmation

**Positive Case:**
Given: Multiple passengers are booking the same flight but different seats
When: Both bookings are submitted simultaneously
Then: System successfully reserves different seats for each booking without conflict

**Negative Case:**
Given: Passenger attempts to book a flight that is now sold out
When: They submit booking request after last seat is taken
Then: System shows "No seats available" error and prevents booking

**Edge Case:**
Given: System experiences high load with many simultaneous booking requests
When: Multiple users try to book the same last seat
Then: System processes requests sequentially and only accepts first valid booking

#### Test Scenarios:
- Valid booking creates reservation with unique PNR
- Double booking prevented with appropriate error handling
- PNR generated correctly following IATA standards
- Booking status updates appropriately
- Multiple passengers in single booking handled correctly
- Inventory updates prevent overbooking scenarios

#### Out of Scope:
- Payment processing
- Waitlisting functionality
- Dynamic pricing during booking

---

### Story #BOOK-003: Booking Payment Integration
- **Story Points:** 5
- **Priority:** Highest
- **Sprint:** Sprint 2
- **Dependencies:** Story #BOOK-002, Story #PAY-001
- **Story Definition:** As a passenger, I want to complete payment for my booking so that it becomes confirmed.

#### Acceptance Criteria:
- Payment processed through secure gateway after booking creation
- Booking status updated to "Confirmed" after successful payment
- Payment confirmation notification sent to passenger
- Failed payment keeps booking in "Pending Payment" status
- Cross-functional: Meet PCI DSS compliance requirements

#### Technical Specifications:
- API integration: POST /api/payments/charge (see API Documentation: Payment Section)
- Payment status synchronization: Listen for payment.success events from Redis Streams, update booking status via PATCH /api/bookings/{id}/confirm
- Transaction rollback: Compensation logic to revert booking if payment fails after partial processing
- Retry mechanism: Exponential backoff for payment confirmation (5 attempts, 1s, 2s, 4s, 8s, 16s)
- Cross-functional: PCI DSS Level 1 compliance, no raw card data storage, tokenization
- Cross-functional: Circuit breaker for payment service calls, structured logging with payment correlation

#### Business Scenarios:

**Normal Case:**
Given: Passenger has a booking in "Pending Payment" status
When: They complete payment through secure gateway
Then: Booking status updates to "Confirmed" and confirmation is sent

**Positive Case:**
Given: Payment processing takes longer than usual
When: System waits for payment confirmation
Then: Booking status updates once payment is confirmed

**Negative Case:**
Given: Payment fails due to insufficient funds
When: Payment gateway returns failure status
Then: Booking remains in "Pending Payment" status with payment retry option

**Edge Case:**
Given: Network connectivity issues during payment processing
When: Payment confirmation is delayed
Then: System eventually updates booking status once confirmation received

#### Test Scenarios:
- Successful payment updates booking status to confirmed
- Failed payment keeps booking in pending status
- Payment retry functionality works properly
- Payment gateway timeouts handled gracefully
- Booking status synchronization works correctly

#### Out of Scope:
- Booking creation (handled in Story #BOOK-002)
- Refund processing (future story)
- Partial payment options

---

## EPIC 04: PAYMENT PROCESSING (PAY)

### Story #PAY-001: Payment Processing Integration
- **Story Points:** 8
- **Priority:** High
- **Sprint:** Sprint 3
- **Dependencies:** Story #BOOK-002
- **Story Definition:** As a passenger, I want to securely process my payment so that I can complete my booking.

#### Acceptance Criteria:
- Accept major credit cards (Visa, Mastercard, Amex) and debit cards
- Process payment through secure gateway (Omise as primary, with fallback option)
- Handle payment success/failure scenarios with appropriate user feedback
- Generate payment receipt with booking details and payment reference
- Support for multiple currencies with accurate conversion
- PCI DSS compliance for all payment handling
- Cross-functional: Meet performance requirements (payment processing <3s)

#### Technical Specifications:
- API endpoints: POST /api/payments/charge, POST /api/payments/refund, POST /api/payments/promptpay (see API Documentation: Payment Section)
- Integration with Omise payment gateway API: charge creation, refund processing, webhook handling
- Payment tokenization: Use Omise tokens, never store raw card data, masked display for last 4 digits
- Webhook handling: HTTPS POST endpoint with HMAC signature validation, idempotency handling
- Retry mechanism: Exponential backoff for webhook delivery (max 5 attempts over 24 hours)
- Database: Encrypted payment records with Omise charge IDs, transaction status tracking
- Cross-functional: Circuit breaker pattern for external API calls, structured logging with payment correlation
- Cross-functional: Rate limiting to prevent payment spam (max 3 attempts per booking)

#### Business Scenarios:

**Normal Case:**
Given: Passenger has a valid credit card and booking pending payment
When: They enter card details and submit payment
Then: System processes payment, updates booking status to "Confirmed", and sends receipt

**Positive Case:**
Given: Payment gateway is temporarily slow to respond
When: System makes payment request and waits for response
Then: System retries appropriately and processes payment when gateway becomes available

**Negative Case:**
Given: Passenger enters expired credit card
When: They submit payment with invalid card
Then: System shows payment declined error and allows retry with different card

**Edge Case:**
Given: Payment gateway is completely down
When: Passenger attempts to make payment
Then: System shows service unavailable message and allows retry later

#### Test Scenarios:
- Successful payment completes booking and updates status
- Failed payment shows appropriate error and allows retry
- Card validation works correctly with format and expiration checks
- Receipt generated and sent to passenger with booking details
- Multiple payment attempts handled without double-charging
- Payment gateway downtime handled with graceful fallback

#### Out of Scope:
- Cryptocurrency payments
- Buy-now-pay-later financing options
- Split payment across multiple cards

---

## EPIC 05: CHECK-IN SYSTEM (CHECK)

### Story #CHECK-001: Online Check-in Process
- **Story Points:** 8
- **Priority:** Medium
- **Sprint:** Sprint 4
- **Dependencies:** Story #BOOK-002
- **Story Definition:** As a passenger, I want to check in online so that I can save time at the airport.

#### Acceptance Criteria:
- Retrieve booking using last name and PNR with email as alternative
- Verify check-in eligibility (within allowed timeframe: 24h before to 1h before domestic, 48h before to 2h before international)
- Allow seat selection or confirmation of assigned seat
- Update booking status to "Checked In" with timestamp
- Handle multiple passengers in single booking
- Provide option to skip check-in for some passengers
- Cross-functional: Meet performance requirements (check-in <2s response time)

#### Technical Specifications:
- API endpoint: POST /api/checkin (see API Documentation: Check-in Section)
- Payload: last_name, pnr, email (alternative), passenger_ids
- Time window validation: flight.flight_type (domestic/international), check_in_open_before (24h/48h), check_in_close_before (1h/2h)
- Real-time seat availability: lock selected seats temporarily during check-in process (5-minute TTL in Redis)
- Database: Update booking status, create checkin records, update passenger check-in timestamps
- Audit trail: Log check-in actions with user IP, timestamp, passenger details
- Bulk operations: Support for checking in multiple passengers in single request
- Cross-functional: Caching of flight time windows in Redis, structured logging with correlation IDs

#### Business Scenarios:

**Normal Case:**
Given: Passenger has valid booking and is within check-in window
When: They enter last name and PNR to retrieve booking
Then: System displays eligible passengers and allows check-in with seat selection

**Positive Case:**
Given: Passenger has booked multiple seats in same booking
When: They initiate check-in for the booking
Then: System allows individual check-in for each passenger with seat selection

**Negative Case:**
Given: Passenger attempts check-in outside allowed time window
When: They enter booking details before check-in opens
Then: System shows "Check-in not available yet" with countdown timer

**Edge Case:**
Given: Check-in window is closing in 5 minutes
When: Passenger starts check-in process but takes longer than remaining time
Then: System allows current check-in to complete but prevents new check-ins after deadline

#### Test Scenarios:
- Valid booking allows check-in within time window
- Outside check-in window shows restriction with clear timing
- Seat assignment works correctly with availability checking
- Status updates appropriately to checked-in
- Multiple passengers in booking handled individually
- Check-in deadline enforcement works accurately

#### Out of Scope:
- Special assistance check-in
- Pet travel check-in procedures
- Unaccompanied minor check-in

---

## EPIC 06: BOARDING PASS SYSTEM (BPASS)

### Story #BPASS-001: Boarding Pass Generation
- **Story Points:** 8
- **Priority:** Medium
- **Sprint:** Sprint 4
- **Dependencies:** Story #CHECK-001
- **Story Definition:** As a passenger who has checked in, I want a digital boarding pass so that I can board my flight.

#### Acceptance Criteria:
- Generate boarding pass with IATA-compliant QR code after check-in
- Include flight information, passenger name, seat, and PNR
- QR code follows IATA Barcoded Boarding Pass (BCBP) standards
- Pass downloadable in multiple formats (PDF, image) and shareable
- Real-time updates if flight information changes after generation
- Offline access capability for boarding pass
- Cross-functional: Meet performance requirements (boarding pass generation <1s)

#### Technical Specifications:
- API endpoints: GET /api/boarding-pass/{bookingId}, GET /api/boarding-pass/{bookingId}/pdf (see API Documentation: Boarding Pass Section)
- IATA BCBP standard compliant QR code generation:严格按照 IATA Res 792标准, 20-character alphanumeric string with checksum
- PDF generation: A7 format (105mm x 148mm) with proper margins for airport scanners, embedded fonts
- Mobile optimization: Responsive design with zoom capability, touch-friendly controls
- Offline access: Progressive Web App caching with Service Worker, IndexedDB storage
- Real-time updates: WebSocket connection or periodic polling for flight changes
- Database: Boarding pass records with TTL for cleanup, foreign key to check-in records
- Cross-functional: Image optimization for mobile delivery, structured logging with correlation IDs

#### Business Scenarios:

**Normal Case:**
Given: Passenger has successfully completed online check-in
When: They view their boarding pass
Then: System displays properly formatted pass with scannable QR code and all required information

**Positive Case:**
Given: Flight information changes after boarding pass generation
When: Airport operations update gate assignment
Then: System updates boarding pass with new gate information for passenger

**Negative Case:**
Given: Passenger attempts to access boarding pass without completing check-in
When: They try to view boarding pass
Then: System shows "Passenger not checked in" message with check-in instructions

**Edge Case:**
Given: Passenger has multiple flights in itinerary
When: They access their boarding passes
Then: System displays tabbed interface with individual passes for each flight segment

#### Test Scenarios:
- Successful check-in generates properly formatted boarding pass
- QR code scans correctly with standard airport scanners
- All required IATA BCBP fields present in QR code
- Download and sharing functions work across devices
- Flight changes update boarding pass information appropriately
- Offline access works without internet connection

#### Out of Scope:
- Physical printing station integration
- Custom branding on boarding passes
- Multi-segment itinerary combination

---

## BACKLOG REFINEMENT SUMMARY

### Priority Ranking:
1. **Highest Priority:** FLIGHT-001, FLIGHT-002 (Foundation for all other features)
2. **High Priority:** AUTH-001, AUTH-002, AUTH-003, BOOK-002, PAY-001, FLIGHT-003, BOOK-003
3. **Medium Priority:** BOOK-001, CHECK-001, BPASS-001

### Technical Dependencies:
- Authentication system must be functional before other modules
- Flight management must be operational before booking
- Booking system required before payment and check-in
- Check-in required before boarding pass generation
- FLIGHT-002 required before FLIGHT-003
- BOOK-002 required before BOOK-003

### Risk Assessment:
- **High Risk:** Payment integration (PCI compliance, gateway failures)
- **Medium Risk:** Check-in timing validation, seat inventory management
- **Low Risk:** Authentication, basic flight/booking functionality

### Effort Estimation:
- Total Story Points: 76
- Estimated Development Time: 8-9 sprints (8-9 weeks)
- Team Velocity Assumption: 8-9 points per sprint per team