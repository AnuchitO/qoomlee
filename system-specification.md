# Qoomlee Airline System Specification

## Overview
Complete airline booking and check-in system with modern architecture, supporting flight search, booking, payment processing, and online check-in with boarding pass generation.

## Technology Stack
- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS
- **Flight Search Service**: Bun + Elasticsearch
- **Booking Service**: Kotlin Spring Boot + PostgreSQL
- **Check-in Service**: Go + PostgreSQL
- **Payment Service**: Bun + Stripe/Omise
- **Caching**: Redis
- **Database**: PostgreSQL (main), Elasticsearch (search)
- **Infrastructure**: Docker Compose for local development

## Phase 0: User Stories and Technical Specifications

### User Stories Principles (INVEST)
- **Independent**: Each story should be self-contained and not dependent on others
- **Negotiable**: Stories should be flexible and open to discussion
- **Valuable**: Each story must deliver value to the end user
- **Estimable**: Stories should be sized appropriately for estimation
- **Small**: Stories should be small enough to complete in a single iteration
- **Testable**: Stories must have clear acceptance criteria

### Epic 1: Flight Search & Discovery

#### Story 1.1: Flight Search
**As a** user
**I want** to search for flights by origin, destination, and dates
**So that** I can find available flight options

**Acceptance Criteria:**
- User can enter origin airport/city
- User can enter destination airport/city
- User can select departure date (and return date for round trips)
- System returns available flights within 5 seconds
- Results show flight number, departure/arrival times, duration, and price

**Definition of Done:**
- [ ] Search form implemented with proper validation
- [ ] Backend API endpoint created for flight search
- [ ] Elasticsearch integration for fast search results
- [ ] Unit tests cover all search scenarios (100% coverage)
- [ ] Integration tests verify API functionality
- [ ] Error handling for invalid inputs implemented
- [ ] Loading states displayed during search
- [ ] Responsive design works on all device sizes

#### Story 1.2: Flight Results Display
**As a** user
**I want** to see flight prices, duration, and layovers
**So that** I can make an informed decision

**Acceptance Criteria:**
- Flight results show price clearly
- Duration of each flight is displayed
- Number of layovers and layover duration shown
- Aircraft type and airline displayed
- Option to sort by price, duration, or departure time

**Definition of Done:**
- [ ] Flight results table/card designed and implemented
- [ ] All required flight information displayed clearly
- [ ] Sorting functionality implemented
- [ ] Filtering options available
- [ ] Responsive layout for different screen sizes
- [ ] Unit tests for sorting/filtering logic
- [ ] Performance optimized for large result sets

#### Story 1.3: Flight Filters
**As a** user
**I want** to filter search results by price, duration, and departure time
**So that** I can narrow down options

**Acceptance Criteria:**
- Price range slider available
- Maximum duration filter
- Departure time range selector
- Direct flight only option
- Airline preference filter

**Definition of Done:**
- [ ] Filter controls implemented in UI
- [ ] Backend supports filtering parameters
- [ ] Real-time filtering without page reload
- [ ] Clear filters option available
- [ ] Filtered results update correctly
- [ ] Unit tests for filter logic
- [ ] Performance optimized for filtered queries

#### Story 1.4: Real-time Availability
**As a** user
**I want** to see real-time availability
**So that** I know if seats are still available

**Acceptance Criteria:**
- Available seats updated in real-time
- Visual indicator for low availability
- "Book now" urgency messaging when seats are limited
- Inventory locked temporarily during booking process

**Definition of Done:**
- [ ] Real-time availability data displayed
- [ ] Inventory management system integrated
- [ ] Seat locking mechanism during booking
- [ ] WebSocket connection for real-time updates (if applicable)
- [ ] Cache invalidation strategy implemented
- [ ] Load testing performed for availability endpoints

### Epic 2: Booking Process

#### Story 2.1: Flight Selection
**As a** user
**I want** to select a flight and proceed to booking
**So that** I can reserve my seat

**Acceptance Criteria:**
- User can select outbound flight
- User can select return flight (for round trips)
- Selected flight details displayed in summary
- User can modify selection before proceeding
- Fare class selection available

**Definition of Done:**
- [ ] Flight selection UI implemented
- [ ] Fare class selection available
- [ ] Summary panel shows selected flights
- [ ] Navigation to passenger details page
- [ ] Selected flight data persisted in session
- [ ] Undo/modify options available
- [ ] Unit tests for selection logic

#### Story 2.2: Passenger Details
**As a** user
**I want** to add passenger details (name, DOB, contact)
**So that** I can complete my booking

**Acceptance Criteria:**
- First name and last name fields (required)
- Date of birth with validation
- Contact email and phone number
- Gender and special assistance requirements
- Ability to add multiple passengers

**Definition of Done:**
- [ ] Passenger details form created with validation
- [ ] Multi-passenger support implemented
- [ ] Input validation for all fields
- [ ] Special assistance accommodation options
- [ ] Data encryption for sensitive information
- [ ] Unit tests for validation logic
- [ ] Accessibility compliance (WCAG AA)

#### Story 2.3: Fare Class Selection
**As a** user
**I want** to select fare class (economy, business)
**So that** I can choose my service level

**Acceptance Criteria:**
- Economy, premium economy, business, first class options
- Price differences clearly displayed
- Included amenities for each class shown
- Upgrade options available

**Definition of Done:**
- [ ] Fare class selection UI implemented
- [ ] Price comparison matrix displayed
- [ ] Amenities information shown for each class
- [ ] Upgrade path calculations accurate
- [ ] Dynamic pricing reflected in UI
- [ ] Unit tests for pricing calculations

#### Story 2.4: Secure Payment
**As a** user
**I want** to make a secure payment
**So that** I can confirm my booking

**Acceptance Criteria:**
- Credit/debit card payment accepted
- PCI DSS compliant payment form
- Multiple payment methods supported
- Payment confirmation received
- Receipt sent via email

**Definition of Done:**
- [ ] Secure payment form implemented
- [ ] PCI DSS compliance achieved
- [ ] Multiple payment gateways integrated
- [ ] Payment confirmation handling
- [ ] Email receipt system implemented
- [ ] Error handling for failed payments
- [ ] Security testing performed
- [ ] Payment data encrypted

#### Story 2.5: Booking Confirmation
**As a** user
**I want** to receive a booking confirmation with PNR
**So that** I have proof of booking

**Acceptance Criteria:**
- Unique 6-character PNR generated
- Confirmation email sent immediately
- Booking summary displayed on screen
- Option to view booking later using PNR
- Itinerary details included

**Definition of Done:**
- [ ] PNR generation algorithm implemented
- [ ] Confirmation page designed and implemented
- [ ] Email notification system working
- [ ] Booking retrieval functionality
- [ ] Itinerary PDF generation
- [ ] Unit tests for PNR generation
- [ ] Integration tests for confirmation flow

#### Story 2.6: Booking Management
**As a** user
**I want** to manage my booking (view, cancel, modify)
**So that** I can handle changes

**Acceptance Criteria:**
- View existing booking using PNR and last name
- Cancel booking with refund calculation
- Modify passenger details (before cutoff)
- Change flight dates (with fees)
- Download updated itinerary

**Definition of Done:**
- [ ] Booking management UI implemented
- [ ] View booking functionality
- [ ] Cancel booking with refund processing
- [ ] Modify booking options
- [ ] Change flight functionality
- [ ] Audit trail for all changes
- [ ] Unit tests for management operations

### Epic 3: Online Check-in

#### Story 3.1: Check-in Access
**As a** passenger
**I want** to check in online using my PNR and last name
**So that** I can get my boarding pass

**Acceptance Criteria:**
- PNR and last name input fields
- Validation against existing booking
- Check-in eligibility verification
- Access to check-in process if eligible

**Definition of Done:**
- [ ] Check-in access form implemented
- [ ] PNR validation against booking system
- [ ] Eligibility checking logic
- [ ] Error handling for invalid PNR/last name
- [ ] Security measures to prevent unauthorized access
- [ ] Unit tests for validation logic

#### Story 3.2: Seat Selection During Check-in
**As a** passenger
**I want** to select my seat during check-in
**So that** I can choose my preferred location

**Acceptance Criteria:**
- Interactive seat map displayed
- Available seats highlighted
- Seat selection and confirmation
- Previous seat assignment shown if applicable
- Premium seat options available

**Definition of Done:**
- [ ] Interactive seat map component
- [ ] Real-time seat availability
- [ ] Seat selection and confirmation
- [ ] Previous assignment visualization
- [ ] Premium seat upselling
- [ ] Unit tests for seat availability logic
- [ ] Integration tests for seat assignment

#### Story 3.3: International Document Verification
**As an** international passenger
**I want** to provide passport and visa information
**So that** I can comply with regulations

**Acceptance Criteria:**
- Passport number and expiry date input
- Country of issuance selection
- Visa information (if required)
- Document validation against government databases
- APIS (Advance Passenger Information System) submission

**Definition of Done:**
- [ ] Document information form created
- [ ] Input validation for document formats
- [ ] Government database integration
- [ ] APIS submission functionality
- [ ] Data encryption for document info
- [ ] Unit tests for validation logic
- [ ] Compliance with international regulations

#### Story 3.4: Baggage Addition During Check-in
**As a** passenger
**I want** to add baggage during check-in
**So that** I can handle my luggage needs

**Acceptance Criteria:**
- Baggage type selection (carry-on, checked, special items)
- Quantity input for each baggage type
- Fee calculation for additional baggage
- Weight restrictions enforcement
- Baggage tag generation

**Definition of Done:**
- [ ] Baggage selection UI implemented
- [ ] Fee calculation engine
- [ ] Weight restriction validation
- [ ] Baggage tag generation system
- [ ] Integration with baggage handling systems
- [ ] Unit tests for fee calculations

#### Story 3.5: Boarding Pass Delivery
**As a** passenger
**I want** to receive my boarding pass via email/PDF
**So that** I can access it easily

**Acceptance Criteria:**
- Digital boarding pass generation
- PDF download option
- Email delivery option
- Mobile wallet integration (Apple Wallet, Google Pay)
- QR code for airport scanning

**Definition of Done:**
- [ ] Boarding pass template designed
- [ ] PDF generation functionality
- [ ] Email delivery system
- [ ] Mobile wallet integration
- [ ] QR code generation
- [ ] Unit tests for generation logic
- [ ] Accessibility compliance for digital passes

#### Story 3.6: Check-in Eligibility Status
**As a** passenger
**I want** to see check-in eligibility status
**So that** I know if I can check in

**Acceptance Criteria:**
- Check-in window opening notification
- Eligibility verification based on flight time
- Restrictions displayed (special service requests, etc.)
- Alternative check-in instructions if not eligible

**Definition of Done:**
- [ ] Eligibility checking algorithm
- [ ] Check-in window management
- [ ] Restriction identification system
- [ ] Alternative instructions display
- [ ] Notification system for check-in opening
- [ ] Unit tests for eligibility logic

### Technical Stories

#### Backend Architecture
- **Tech Story 1.1**: Implement microservices architecture with API gateway pattern
- **Tech Story 1.2**: Design RESTful APIs with OpenAPI/Swagger documentation
- **Tech Story 1.3**: Implement service-to-service communication with proper error handling
- **Tech Story 1.4**: Set up distributed logging and monitoring across services
- **Tech Story 1.5**: Implement circuit breaker pattern for service resilience

#### Database Design
- **Tech Story 2.1**: Design normalized database schema for flights, bookings, and passengers
- **Tech Story 2.2**: Implement database migrations with rollback capability
- **Tech Story 2.3**: Set up database indexing for optimal search performance
- **Tech Story 2.4**: Implement database connection pooling and optimization
- **Tech Story 2.5**: Design backup and recovery procedures

#### Search Service
- **Tech Story 3.1**: Implement Elasticsearch integration for flight search
- **Tech Story 3.2**: Design search indexing strategy for real-time availability
- **Tech Story 3.3**: Implement caching layer (Redis) for frequent searches
- **Tech Story 3.4**: Optimize search queries for performance
- **Tech Story 3.5**: Implement search result ranking algorithm

#### Security & Authentication
- **Tech Story 4.1**: Implement JWT-based authentication across services
- **Tech Story 4.2**: Secure payment processing with PCI compliance considerations
- **Tech Story 4.3**: Implement rate limiting and DDoS protection
- **Tech Story 4.4**: Encrypt sensitive passenger data at rest and in transit
- **Tech Story 4.5**: Implement proper input validation and sanitization

#### Testing Strategy
- **Tech Story 5.1**: Implement unit testing for all services (target 80% coverage)
- **Tech Story 5.2**: Implement integration testing for service communication
- **Tech Story 5.3**: Implement end-to-end testing for complete user flows
- **Tech Story 5.4**: Set up automated testing pipeline
- **Tech Story 5.5**: Implement contract testing between services

#### Frontend Architecture
- **Tech Story 6.1**: Implement Next.js app router with proper page organization
- **Tech Story 6.2**: Design reusable component library with proper accessibility
- **Tech Story 6.3**: Implement state management with proper error handling
- **Tech Story 6.4**: Implement responsive design for all device sizes
- **Tech Story 6.5**: Set up internationalization (i18n) framework

#### Deployment & Infrastructure
- **Tech Story 7.1**: Create Docker Compose setup for local development
- **Tech Story 7.2**: Implement environment configuration management
- **Tech Story 7.3**: Set up health checks and monitoring endpoints
- **Tech Story 7.4**: Implement CI/CD pipeline
- **Tech Story 7.5**: Document deployment and scaling procedures

## Phase 1: Foundation Setup
- Next.js project with TypeScript and Tailwind CSS
- Component architecture and folder structure
- API integration patterns with custom hooks
- Testing setup (Jest/Vitest, React Testing Library)
- Basic routing and navigation

## Phase 2: Core Backend Services
- Booking Service (Kotlin Spring Boot + PostgreSQL)
- Basic database schema and migrations
- REST API endpoints for booking operations
- Authentication and authorization setup

## Phase 3: Integration Layer
- Connect frontend to booking service
- Implement complete booking flow
- Add basic payment processing (mock initially)
- End-to-end testing for booking flow

## Phase 4: Additional Services
- Flight Search Service (Bun + Elasticsearch)
- Check-in Service (Go + PostgreSQL)
- Payment Service (Bun + payment gateway)
- Service communication and orchestration

## Phase 5: Complete Flow Implementation
- Integrate all services for complete search → book → check-in flow
- Real payment processing integration
- Advanced features (seat selection, baggage, etc.)
- Comprehensive testing and documentation