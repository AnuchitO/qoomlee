# QOOMLEE - Architecture Directory

## Overview
This directory contains all system architecture diagrams and design documents for the Qoomlee Airline System. These diagrams visualize the system structure at different levels of abstraction using the C4 model.

## File Structure

### C4 Model Levels
- **Qoomlee_C4_L1_Context.d2** - System Context diagram source code (D2 format)
- **Qoomlee_C4_L1_Context.svg** - System Context diagram visualization
  - Shows the Qoomlee system in relation to external actors and systems
  - Defines system boundaries and external dependencies
  - Identifies key external interfaces and data flows

- **Qoomlee_C4_L2_Container.d2** - Container diagram source code (D2 format)
- **Qoomlee_C4_L2_Container.svg** - Container diagram visualization
  - Shows the high-level technology decisions
  - Displays major applications, services, and databases
  - Illustrates communication protocols and data exchange

- **Qoomlee_C4_L3_Component.d2** - Component diagram source code (D2 format)
- **Qoomlee_C4_L3_Component.svg** - Component diagram visualization
  - Shows detailed internal structure of containers
  - Details component responsibilities and relationships
  - Highlights internal data flows and dependencies

## How to Navigate
1. **Start with:** `Qoomlee_C4_L1_Context.svg` to understand system boundaries
2. **Technology overview:** `Qoomlee_C4_L2_Container.svg` to see the technology stack
3. **Detailed design:** `Qoomlee_C4_L3_Component.svg` for internal component details
4. **Modify diagrams:** Use `.d2` files with D2 diagramming tool

## Architecture Components

### Core Services
- **Identity Service** - Authentication and user management
- **Flight Service** - Flight creation, scheduling, and aircraft management
- **Booking Service** - Reservation and booking management
- **Payment Service** - Payment processing and transaction handling
- **Check-in Service** - Online and offline check-in functionality
- **Notification Service** - Communication with passengers

### Data Stores
- **PostgreSQL** - Primary relational database
- **Redis** - In-memory caching and session management

### External Systems
- **Omise Payment Gateway** - Payment processing
- **Email/SMS Providers** - Communication services

## Key Concepts
- **Microservices Architecture** - Loosely coupled services with well-defined APIs
- **Event-Driven** - Asynchronous communication between services
- **API Gateway** - Single entry point for all client requests
- **C4 Model** - Context, Containers, Components, and Code level diagrams

## Navigation Links
- [Main Project README](../README.md) - Overall project structure and overview
- [00-planning/](../00-planning/) - Project planning and management documents
- [01-documentation/](../01-documentation/) - Business requirements and technical specifications
- [03-database/](../03-database/) - Database schema and seed data
- [04-ui-ux/](../04-ui-ux/) - UI/UX design and specifications

## Next Steps
After reviewing architecture, proceed to:
- [03-database/](../03-database/) for database schema details
- [04-ui-ux/](../04-ui-ux/) for user interface design