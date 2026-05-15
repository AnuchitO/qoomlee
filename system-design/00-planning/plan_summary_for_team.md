# QOOMLEE AIRLINE SYSTEM - MVP PLAN SUMMARY
## For Team Review

### CORE GOAL
Qoomlee Airline System allows passengers to search flights, book tickets, check-in online, and manage airline operations for a hybrid (LCC comfort+) carrier connecting Southeast Asian tier-2 cities to Australian gateways.

### MAIN USERS (MVP)
- **Passenger**: Search, book flights, online check-in
- **Admin**: Manage flights, schedules, bookings

### MVP FEATURES

#### Passenger Features
- Search flights
- Book ticket
- View booking
- Cancel booking
- **Online check-in** (NEW - now part of MVP)
- Receive e-ticket/boarding pass

#### Admin Features
- Create flights
- Manage schedules
- Manage bookings
- Process payments
- Manage check-ins

### CORE FLOWS

#### Passenger Flow
```
Search Flight → Select Flight → Enter Passenger Info → Pay → Receive E-ticket → Online Check-in → Receive Boarding Pass
```

#### Admin Flow
```
Create Flight → Set Schedule → Manage Aircraft Assignment → Open Booking → Manage Bookings → Manage Check-ins
```

### MVP MODULES
1. **Authentication**: Staff login and role-based access control
2. **Flight Module**: Flight creation, schedules, aircraft management
3. **Booking Module**: Passenger reservations, seat selection
4. **Payment Module**: Payment processing, receipts, refunds
5. **Passenger Module**: Passenger profiles, data management
6. **Check-in Module**: Online/offline check-in
7. **Boarding Pass Module**: Generate, manage, and validate boarding passes

### MVP DATA ENTITIES
- User (Staff/Admin)
- Passenger
- Flight
- Booking
- Payment
- Check-in
- Boarding Pass

### RELATIONSHIPS
- User creates Booking
- Passenger associated with Booking
- Booking belongs to Flight
- Booking has Payment
- Check-in generates Boarding Pass
- Boarding Pass linked to Passenger and Flight

### DEVELOPMENT ROADMAP

#### Version 1 (MVP Core)
- User authentication system
- Flight creation and management
- Flight search functionality
- Basic booking creation

#### Version 2 (Payment & Confirmation)
- Payment processing system
- Booking confirmation workflow
- E-ticket generation

#### Version 3 (Check-in & Operations)
- Online check-in functionality
- Boarding pass generation
- Check-in management for staff

---

## KEY CHANGES FROM ORIGINAL PLAN
- ✅ **Online check-in is now part of MVP** (previously planned for post-MVP)
- ✅ Added Check-in Module as a core module
- ✅ Added Check-in entity to data model
- ✅ Updated passenger flow to include online check-in and boarding pass
- ✅ Added Online Check-in Page to the 3 essential UI screens