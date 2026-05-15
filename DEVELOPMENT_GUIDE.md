# Qoomlee Airline Development Guide

This guide provides comprehensive information for developers working on the Qoomlee Airline system, particularly for bootcamp participants who will be extending the check-in functionality.

## Project Overview

Qoomlee Airline is a complete airline booking and check-in system with the following core services:

1. **Frontend**: Next.js 14+ application with TypeScript
2. **Flight Search Service**: Bun/TypeScript service with Elasticsearch
3. **Booking Service**: Kotlin Spring Boot service with PostgreSQL
4. **Check-in Service**: Go service with PostgreSQL
5. **Payment Service**: Bun/TypeScript service with Stripe/Omise integration

## Architecture

### Frontend Architecture

The frontend follows modern React best practices:

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks and Zustand
- **Form Handling**: React Hook Form with Zod validation
- **API Calls**: Custom hooks with proper loading/error states

### Backend Services Architecture

Each backend service follows the microservices pattern with consistent design principles:

- **API**: RESTful APIs with consistent error handling
- **Database**: PostgreSQL for relational data, Elasticsearch for search
- **Caching**: Redis for performance optimization
- **Security**: Input validation, authentication, and authorization

## Running the System Locally

### Prerequisites

- Docker and Docker Compose
- Bun runtime
- Java 17+ (for Kotlin services)
- Go 1.21+ (for Go services)

### Setup Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd qoomlee
```

2. Build and start all services:
```bash
docker-compose up --build
```

3. Access the services:
   - Frontend: http://localhost:3000
   - Flight Search Service: http://localhost:8080
   - Booking Service: http://localhost:8081
   - Check-in Service: http://localhost:8082
   - Payment Service: http://localhost:8083

## Extending Check-in Functionality

Bootcamp participants will work on extending the check-in service. Here's what you need to know:

### Current Check-in Features

1. **PNR Lookup**: Search for bookings using PNR and last name
2. **Eligibility Check**: Verify if booking is eligible for check-in
3. **Seat Selection**: Allow passengers to select seats during check-in
4. **Baggage Addition**: Add baggage during check-in process
5. **Boarding Pass Generation**: Create and distribute boarding passes

### Key Components to Extend

#### 1. Go Models (`/backend/checkin-service/models/checkin.go`)
- `Booking`: Main booking entity
- `Passenger`: Passenger information
- `FlightSegment`: Flight details
- `BoardingPass`: Boarding pass data
- `Seat`: Seat availability and assignment
- `BaggageAllowance`: Baggage allowance details

#### 2. Go Services (`/backend/checkin-service/services/`)
- `checkin_service.go`: Core check-in business logic
- `boarding_pass_service.go`: Boarding pass generation

#### 3. Go Handlers (`/backend/checkin-service/handlers/`)
- `checkin_handler.go`: API endpoints for check-in functionality

#### 4. Frontend Components (`/frontend/`)
- `app/checkin/page.tsx`: Main check-in page
- `services/checkinService.ts`: API client for check-in service

### Example Extension Ideas

#### 1. International Document Verification
- Add passport/visa input forms
- Integrate with APIS (Advanced Passenger Information System)
- Validate travel documents against country requirements

#### 2. Enhanced Seat Selection
- Interactive seat map visualization
- Premium seat upselling
- Group seating coordination

#### 3. Meal Preference Selection
- Add meal preference options
- Integrate with catering systems
- Dietary requirement handling

#### 4. Notification System
- SMS/email notifications for check-in status
- Flight delay/cancellation alerts
- Gate change notifications

## Development Best Practices

### Frontend Best Practices

1. **Component Organization**:
   - Group components by feature in the `/components` directory
   - Use descriptive names that reflect the component's purpose
   - Separate presentational and container components

2. **Type Safety**:
   - Define TypeScript interfaces for all data structures
   - Use strict typing for props and state
   - Leverage Zod for runtime validation

3. **API Integration**:
   - Create custom hooks for data fetching
   - Implement proper error handling and loading states
   - Use consistent naming patterns for API calls

4. **Testing**:
   - Write unit tests for utility functions
   - Create component tests for UI interactions
   - Implement integration tests for API flows

### Backend Best Practices

1. **API Design**:
   - Follow RESTful conventions
   - Use consistent error response formats
   - Implement proper HTTP status codes

2. **Database Operations**:
   - Use ORM/Query Builder consistently
   - Implement proper transaction management
   - Optimize queries for performance

3. **Security**:
   - Validate all inputs
   - Implement authentication/authorization
   - Protect against common vulnerabilities

4. **Testing**:
   - Write unit tests for business logic
   - Create integration tests for API endpoints
   - Use test databases for isolation

## Code Quality Standards

### Frontend Standards
- Use ESLint with TypeScript rules
- Follow Airbnb or Google TypeScript style guide
- Maintain 80%+ test coverage
- Use semantic HTML and ARIA attributes
- Implement responsive design

### Backend Standards
- Write comprehensive API documentation
- Use consistent logging patterns
- Implement proper error handling
- Follow SOLID principles
- Maintain high test coverage

## Troubleshooting

### Common Issues

1. **Docker Container Failures**:
   - Check logs: `docker-compose logs <service-name>`
   - Verify environment variables
   - Ensure ports are not in use

2. **Database Connection Issues**:
   - Verify database service is running
   - Check connection strings and credentials
   - Ensure network connectivity between services

3. **API Communication Problems**:
   - Verify service endpoints
   - Check CORS configurations
   - Confirm request/response formats

## Contribution Guidelines

1. Create feature branches from `main`
2. Write comprehensive tests for new functionality
3. Follow the existing code style and patterns
4. Update documentation for new features
5. Submit pull requests with clear descriptions

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Kotlin Documentation](https://kotlinlang.org/docs/home.html)
- [Go Documentation](https://golang.org/doc/)
- [Docker Documentation](https://docs.docker.com/)
- [REST API Best Practices](https://restfulapi.net/)

This system provides a solid foundation for learning modern software development practices while working on a realistic airline booking and check-in application. Focus on understanding the existing patterns before extending functionality, and always prioritize code quality and maintainability.