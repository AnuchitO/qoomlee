# QOOMLEE - Database Directory

## Overview
This directory contains all database-related schemas, seed data, and initialization scripts for the Qoomlee Airline System. These files define the data structure and provide initial data for the system.

## File Contents

### Schema and Seed Data
- **qoomlee_seeds.sql** - Comprehensive seed data for initial system setup
  - Airport data for Thai and international airports
  - Aircraft configurations and seat mappings
  - Staff user accounts and role definitions
  - Flight schedules and route information
  - Sample booking and passenger data
  - Check-in and boarding pass records

## Database Structure

### Core Tables
- **Users** - Staff accounts and authentication data
- **Passengers** - Passenger information and profiles
- **Airports** - Airport codes, names, and location data
- **Aircraft** - Aircraft types, seating configurations
- **Flights** - Flight schedules, routes, and status
- **Bookings** - Passenger reservations and booking details
- **Payments** - Payment transactions and processing records
- **Checkins** - Check-in records and passenger status
- **BoardingPasses** - Boarding pass generation and validation

### Key Relationships
- **Passenger ↔ Booking** - One-to-many relationship
- **Flight ↔ Booking** - One-to-many relationship
- **Booking ↔ Payment** - One-to-one relationship
- **Booking ↔ Checkin** - One-to-one relationship
- **Checkin ↔ BoardingPass** - One-to-one relationship

## How to Use

### Initial Setup
1. Run the seed script to populate the database with initial data
2. Verify all foreign key relationships are properly established
3. Validate that sample data represents realistic scenarios

### Development
- Use seed data as reference for realistic test scenarios
- Extend seed data as new features are developed
- Maintain referential integrity when modifying data

## Data Standards
- **IATA Codes** - Standard airport and airline codes
- **Time Zones** - Proper timezone handling for flight operations
- **Data Validation** - Constraints to ensure data integrity
- **Privacy** - Compliance with passenger data protection requirements

## Key Concepts
- **Normalization** - Properly normalized schema to reduce redundancy
- **Referential Integrity** - Foreign key constraints maintain data consistency
- **Seed Data Quality** - Realistic data that represents actual business scenarios
- **Scalability** - Schema designed to handle growth in bookings and operations

## Navigation Links
- [Main Project README](../README.md) - Overall project structure and overview
- [00-planning/](../00-planning/) - Project planning and management documents
- [01-documentation/](../01-documentation/) - Business requirements and technical specifications
- [02-architecture/](../02-architecture/) - System architecture diagrams and design
- [04-ui-ux/](../04-ui-ux/) - UI/UX design and specifications

## Next Steps
After reviewing database structure, proceed to:
- [02-architecture/](../02-architecture/) to understand how services interact with the database
- [01-documentation/Qoomlee_DB_Schema_API_Contract.docx](../01-documentation/Qoomlee_DB_Schema_API_Contract.docx) for API specifications