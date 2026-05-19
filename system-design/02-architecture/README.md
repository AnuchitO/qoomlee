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

- **Qoomlee_C4_L2_Container.d2** - Original Container diagram source code (D2 format)
- **Qoomlee_C4_L2_Container.svg** - Original Container diagram visualization
  - Shows the high-level technology decisions
  - Displays major applications, services, and databases
  - Illustrates communication protocols and data exchange

- **Qoomlee_C4_L2_Container_Enhanced.d2** - Enhanced Container diagram with missing components (D2 format)
  - Includes additional components identified from technical review
  - Adds observability, secrets management, and monitoring services

- **Qoomlee_C4_L3_Component.d2** - Component diagram source code (D2 format)
- **Qoomlee_C4_L3_Component.svg** - Component diagram visualization
  - Shows detailed internal structure of containers
  - Details component responsibilities and relationships
  - Highlights internal data flows and dependencies

## Updated Architecture Components

Based on the technical review and system requirements, the following components have been integrated into all C4 diagrams to provide a complete and production-ready architecture:

### 1. Observability Stack
- **Monitoring & Observability Service**: Prometheus + Grafana + Jaeger for metrics collection, visualization, and distributed tracing across all services
- **Health Checks**: Service-level health endpoints and dependency monitoring
- **Alerting Framework**: Critical and warning alerts for system operations

### 2. Security & Infrastructure
- **Secrets Management Service**: HashiCorp Vault for secure storage and retrieval of API keys, database passwords, and other sensitive configuration
- **Service Mesh**: Istio for traffic management and security (recommended in technical review)
- **DDoS Protection**: Additional security layer not originally addressed

### 3. Resilience & Fault Tolerance
- **Circuit Breaker Pattern**: For external service calls (especially Omise API)
- **Retry Logic**: Explicit implementation for external service failures
- **Graceful Degradation**: Fallback strategies for service failures

### 4. Passenger Module
- **Passenger Service**: Java/Kotlin service for managing passenger profiles, data validation, and special requirements
- **Passenger Data Management**: Comprehensive handling of passenger information, documents, and travel requirements
- **Integration Points**: Connected to Booking, Check-in, and other services for passenger data needs

## Architecture Consistency

All C4 diagrams have been updated to maintain consistency:
- **Level 1 (Context)**: Now includes infrastructure components at the system boundary
- **Level 2 (Container)**: Contains all services including infrastructure components, and the Passenger service with their connections
- **Level 3 (Component)**: Details internal components of all services, including resilience patterns, infrastructure integration, and the Passenger service components

## How to Navigate
1. **Start with:** `Qoomlee_C4_L1_Context.svg` to understand system boundaries
2. **Technology overview:** `Qoomlee_C4_L2_Container.svg` to see the original technology stack
3. **Enhanced view:** `Qoomlee_C4_L2_Container_Enhanced.d2` to see the complete architecture with missing components
4. **Detailed design:** `Qoomlee_C4_L3_Component.svg` for internal component details
5. **Modify diagrams:** Use `.d2` files with D2 diagramming tool

## Architecture Components

### Core Services
- **Identity Service** - Authentication and user management
- **Flight Service** - Flight creation, scheduling, and aircraft management
- **Booking Service** - Reservation and booking management
- **Payment Service** - Payment processing and transaction handling
- **Check-in Service** - Online and offline check-in functionality
- **Notification Service** - Communication with passengers

### Infrastructure Services (Added in Enhancement)
- **Monitoring & Observability** - Metrics, tracing, and alerting
- **Secrets Management** - Secure storage and retrieval of sensitive data

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
- **Production Ready** - Enhanced with observability, security, and resilience features

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