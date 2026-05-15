# End-to-End Integration Tests

This directory contains Playwright tests designed to verify the integration between different services in the Qoomlee system.

## Test Categories

### 1. Integration Issues Tests (`tests/integration/integration-issues.spec.ts`)
These tests specifically verify and document the lack of integration between services, proving that the system is not properly connected.

### 2. Individual Service Tests
- `tests/flight-search/flight-search.spec.ts` - Flight search service functionality
- `tests/payment/payment.spec.ts` - Payment service functionality
- `tests/checkin/checkin-integration.spec.ts` - Check-in service functionality

### 3. Complete End-to-End Tests (`tests/integration/end-to-end.spec.ts`)
Tests the complete user journey across all services: flight search → booking → payment → check-in

### 4. UI Integration Tests (`tests/ui/ui-integration.spec.ts`)
Verifies that UI components are properly integrated with backend services

### 5. Environment Verification (`tests/environment/env-verification.spec.ts`)
Checks service availability and configuration

### 6. Final Assessment (`tests/integration/final-assessment.spec.ts`)
Provides a comprehensive integration score and final verdict

## Running Tests

To run all tests:
```bash
npm run e2e
```

To run tests in UI mode:
```bash
npm run e2e:ui
```

To run tests with detailed debugging:
```bash
npm run e2e:debug
```

## Special Integration Verification Tests

The tests in `tests/integration/` are specifically designed to:
- Prove that services run independently without coordination
- Document lack of shared authentication/session management
- Verify absence of shared data/models between services
- Confirm lack of event-driven communication
- Identify inconsistent API contracts and error handling
- Check if UI is properly connected to backend services
- Verify absence of service discovery mechanisms
- Assess overall system integration level

These tests will highlight the integration gaps and confirm whether the system is properly connected or not.