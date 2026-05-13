# Qoomlee Airline (สายการบินคุ่มหลี่)

**Qoomlee Airline — Shine and fly, reach the sky.**
(เปล่งประกาย บินสู่ฟ้าไกล)

Qoomlee Airline หรือที่เรียกในภาษาไทยว่า **สายการบินคุ่มหลี่** (อ่านว่า "คุ่มหลี่") เป็นโปรเจกต์สาธิตที่ผสมผสานความเป็นเลิศทางเทคนิคซอฟต์แวร์เข้ากับการเล่าเรื่องสร้างสรรค์ที่ได้รับแรงบันดาลใจจากวัฒนธรรมอีสาน

โปรเจกต์นี้แสดงให้เห็นการใช้เทคโนโลยีสมัยใหม่อย่างครบถ้วน ตั้งแต่การออกแบบระบบที่ปรับขนาดได้ โค้ดสะอาด พร้อมการทดสอบ และการใช้บริการคลาวด์และ API ในรูปแบบที่สร้างสรรค์และมีประสิทธิภาพ

เป้าหมายคือการแสดงให้เห็นว่า นวัตกรรมทางเทคนิคสามารถผสานกับมรดกวัฒนธรรมได้อย่างงดงาม สร้างประสบการณ์ดิจิทัลที่มีคุณภาพสูง ดูแลรักษาง่าย และมีผลกระทบเชิงบวกต่อผู้ใช้

## Architecture Overview

The Qoomlee Airline system consists of several microservices:

- **Frontend**: Next.js 14+ with TypeScript and Tailwind CSS
- **Flight Search Service**: Bun + Elasticsearch
- **Booking Service**: Kotlin Spring Boot + PostgreSQL
- **Check-in Service**: Go + PostgreSQL
- **Payment Service**: Bun + Stripe/Omise
- **Caching**: Redis
- **Database**: PostgreSQL (main), Elasticsearch (search)

## Technology Stack

### Frontend
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- React Hook Form + Zod for validation
- Zustand for state management
- Axios for API calls

### Backend Services
- **Flight Search Service**: Bun, TypeScript, Elasticsearch
- **Booking Service**: Kotlin, Spring Boot, JPA, PostgreSQL
- **Check-in Service**: Go, GORM, PostgreSQL
- **Payment Service**: Bun, TypeScript, Stripe, Omise

### Infrastructure
- Docker & Docker Compose
- PostgreSQL for relational data
- Elasticsearch for flight search
- Redis for caching
- Environment configuration management

## Project Structure

```
qoomlee/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js app router pages
│   ├── components/           # React components
│   ├── services/             # API service clients
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── backend/
│   ├── booking-service/      # Kotlin Spring Boot booking service
│   ├── checkin-service/      # Go check-in service
│   ├── flight-search-service/ # Bun flight search service
│   └── payment-service/      # Bun payment service
├── docs/                     # Documentation
├── docker-compose.yml        # Docker configuration for all services
└── README.md
```

## Setup Instructions

### Prerequisites
- Docker and Docker Compose
- Bun runtime
- Java 17+ (for Kotlin services)
- Go 1.21+ (for Go services)

### Running the Application

1. Clone the repository:
```bash
git clone <repository-url>
cd qoomlee
```

2. Start all services with Docker Compose:
```bash
docker-compose up --build
```

3. The application will be available at:
   - Frontend: http://localhost:3000
   - Flight Search Service: http://localhost:8080
   - Booking Service: http://localhost:8081
   - Check-in Service: http://localhost:8082
   - Payment Service: http://localhost:8083

## Features

### Flight Search
- Search for flights by origin, destination, and dates
- Filter results by price, duration, and departure time
- Real-time availability display
- Multi-city search capability

### Booking Process
- Select flights and fare classes
- Add passenger details
- Secure payment processing
- Booking confirmation with PNR generation
- Booking management (view, cancel, modify)

### Online Check-in
- Check in using PNR and last name
- Seat selection during check-in
- International document verification
- Baggage addition during check-in
- Boarding pass generation and delivery

### Payment Processing
- Credit/debit card payments
- Multi-currency support
- Secure payment form
- Payment confirmation and receipts

## Development Best Practices

This project implements several software engineering best practices:

- **Component Architecture**: Well-organized React components with clear separation of concerns
- **Type Safety**: Comprehensive TypeScript typing throughout the frontend
- **API Integration**: Custom hooks for data fetching with proper error handling and loading states
- **Testing**: Unit tests, integration tests, and component tests with good coverage
- **Security**: Input validation, secure payment processing, and proper authentication
- **Performance**: Code splitting, lazy loading, and caching strategies
- **Accessibility**: WCAG AA compliance for all UI components

## For Bootcamp Participants

This system serves as the foundation for the bootcamp workshop. Participants will extend the check-in functionality by implementing additional features such as:

- Advanced seat selection with seat maps
- International document verification workflows
- Baggage handling during check-in
- Boarding pass customization options
- Integration with external systems (APIS, Timatic, etc.)

The system is designed with extensibility in mind, allowing participants to add new features while maintaining code quality and best practices.

## Running End-to-End Integration Tests

To run the comprehensive integration tests that verify system connectivity:

1. Navigate to the e2e directory:
   ```bash
   cd e2e
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run all integration tests:
   ```bash
   npm run e2e
   ```

4. Or run tests in UI mode to see the browser interactions:
   ```bash
   npm run e2e:ui
   ```

The tests will verify whether the system services are properly integrated or if they exist as disconnected components. Pay attention to the "Final Integration Assessment" tests which provide a comprehensive score and verdict on the system's integration level.

## Services Overview

- **Flight Search Service**: Runs on port 8085 (`/api/v1/flights`)
- **Check-in Service**: Runs on port 8082 (`/api/v1/checkin`)
- **Payment Service**: Runs on port 8083 (`/api/v1/payments`)
- **Web UI**: Runs on port 3000