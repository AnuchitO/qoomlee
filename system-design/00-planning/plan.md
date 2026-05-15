# QOOMLEE AIRLINE SYSTEM - MVP PLAN

## PROJECT STRUCTURE
This project follows a structured organization. For an overview of all files and their organization, see:
- **README.md** - Main project structure and navigation
- **00-planning/** - Planning and project management documents
- **01-documentation/** - Business and technical documentation
- **02-architecture/** - System architecture diagrams
- **03-database/** - Database schema and seeds
- **04-ui-ux/** - UI/UX design and mockups

## CORE GOAL
Qoomlee Airline System allows passengers to search flights, book tickets, check-in online, and manage airline operations for a hybrid (LCC comfort+) carrier connecting Southeast Asian tier-2 cities to Australian gateways.

## MAIN USERS (MVP)
| User      | What they do                          |
| --------- | ------------------------------------- |
| Passenger | Search, book flights, online check-in |
| Admin     | Manage flights, schedules, bookings   |

## MVP FEATURES

### Passenger Features
- Search flights
- Book ticket
- View booking
- Cancel booking
- **Online check-in**
- Receive e-ticket/boarding pass

### Admin Features
- Create flights
- Manage schedules
- Manage bookings
- Process payments
- Manage check-ins

## CORE FLOWS

### Passenger Flow
```
Search Flight
→ Select Flight
→ Enter Passenger Info
→ Pay
→ Receive E-ticket
→ Online Check-in
→ Receive Boarding Pass
```

### Admin Flow
```
Create Flight
→ Set Schedule
→ Manage Aircraft Assignment
→ Open Booking
→ Manage Bookings
→ Manage Check-ins
```

## MVP MODULES
| Module         | Purpose                                    |
| -------------- | ------------------------------------------ |
| Authentication | Staff login and role-based access control  |
| Flight Module  | Flight creation, schedules, aircraft mgmt  |
| Booking Module | Passenger reservations, seat selection     |
| Payment Module | Payment processing, receipts, refunds      |
| Passenger Module| Passenger profiles, data management       |
| Check-in Module| Online/offline check-in                    |
| Boarding Pass Module| Generate, manage, and validate boarding passes |

## MVP DATA ENTITIES
```text
User (Staff/Admin)
Passenger
Flight
Booking
Payment
Check-in
Boarding Pass
```

## RELATIONSHIPS
```text
User creates Booking
Passenger associated with Booking
Booking belongs to Flight
Booking has Payment
Check-in generates Boarding Pass
Boarding Pass linked to Passenger and Flight
```

## DEVELOPMENT ROADMAP

### Version 1 (MVP Core)
- User authentication system
- Flight creation and management
- Flight search functionality
- Basic booking creation

### Version 2 (Payment & Confirmation)
- Payment processing system
- Booking confirmation workflow
- E-ticket generation

### Version 3 (Check-in & Operations)
- Online check-in functionality
- Check-in management for staff
- Boarding pass generation and validation
- Boarding pass distribution

## IMPLEMENTATION PRIORITIES

### PRIORITY 1: DOCUMENTATION & DESIGN
1. Create 3 essential UI mockups
2. Simplify architecture for MVP focus
3. Define clear MVP scope boundaries

### PRIORITY 2: SETUP & FOUNDATION
4. Set up development environment
5. Create development roadmap
6. Define API contracts

### PRIORITY 3: IMPLEMENTATION
7. Build Authentication module
8. Build Flight module
9. Build Booking module
10. Build Passenger module
11. Integrate Payment module
12. Implement Check-in module
13. Implement Boarding Pass module

## IMPORTANT RULES
- Start with simple, working system
- Focus on end-to-end functionality first
- Add complexity incrementally
- Maintain clear separation between MVP and future features