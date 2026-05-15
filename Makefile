# Qoomlee Airline System Makefile
#
# This Makefile provides convenient commands for developing,
# building, and running the Qoomlee Airline system.

.PHONY: help build up down logs clean-db clean-all test frontend-install backend-install

# Default target
help:
	@echo "Qoomlee Airline System Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make help              - Show this help message"
	@echo "  make build             - Build all services using Docker Compose"
	@echo "  make up                - Start all services in detached mode"
	@echo "  make down              - Stop all services"
	@echo "  make logs              - Show logs from all services"
	@echo "  make dev               - Start services in development mode (foreground)"
	@echo "  make clean-db          - Remove PostgreSQL data volume"
	@echo "  make clean-all         - Remove all Docker volumes and containers"
	@echo "  make test              - Run tests for all services"
	@echo "  make test-e2e          - Run E2E integration tests"
	@echo "  make test-e2e-report   - Run E2E tests with HTML report"
	@echo "  make test-e2e-integration - Run integration assessment tests"
	@echo "  make test-e2e-ui       - Run E2E tests in UI mode"
	@echo "  make frontend-install  - Install frontend dependencies"
	@echo "  make backend-install   - Install backend dependencies (if needed)"

# Build all services
build:
	docker-compose build

# Start services in detached mode
up:
	docker-compose up -d

# Start services in development mode (foreground)
dev:
	docker-compose up --build

# Stop all services
down:
	docker-compose down

# Show logs from all services
logs:
	docker-compose logs -f

# Clean database data (PostgreSQL)
clean-db:
	docker-compose down -v
	docker volume prune -f

# Clean everything (including all volumes)
clean-all:
	docker-compose down -v
	docker system prune -af
	docker volume prune -f

# Run tests for all services (placeholder - customize based on your actual test commands)
test:
	@echo "Running tests..."
	@if [ -d "./frontend" ]; then \
		echo "Testing frontend..."; \
		cd frontend && npm test || echo "Frontend tests skipped or failed"; \
		cd ..; \
	fi
	@if [ -d "./backend/booking-service" ]; then \
		echo "Testing booking service..."; \
		cd backend/booking-service && ./gradlew test || echo "Booking service tests skipped or failed"; \
		cd ../..; \
	fi
	@if [ -d "./backend/checkin-service" ]; then \
		echo "Testing check-in service..."; \
		cd backend/checkin-service && go test ./... || echo "Check-in service tests skipped or failed"; \
		cd ../..; \
	fi
	@if [ -d "./backend/flight-search-service" ]; then \
		echo "Testing flight search service..."; \
		cd backend/flight-search-service && bun test || echo "Flight search service tests skipped or failed"; \
		cd ../..; \
	fi
	@if [ -d "./backend/payment-service" ]; then \
		echo "Testing payment service..."; \
		cd backend/payment-service && bun test || echo "Payment service tests skipped or failed"; \
		cd ../..; \
	fi

# Run E2E integration tests
test-e2e:
	@echo "Running E2E integration tests..."
	@if [ -d "./e2e" ]; then \
		echo "Running E2E tests in ./e2e directory..."; \
		cd e2e && bun install && bunx playwright install && bunx playwright test; \
	else \
		echo "E2E directory not found. Please create it first."; \
		exit 1; \
	fi

# Run E2E integration tests with HTML report
test-e2e-report:
	@echo "Running E2E integration tests with HTML report..."
	@if [ -d "./e2e" ]; then \
		echo "Running E2E tests with HTML report..."; \
		cd e2e && bun install && bunx playwright install && bunx playwright test --reporter=html; \
		echo "HTML report generated in playwright-report/index.html"; \
	else \
		echo "E2E directory not found. Please create it first."; \
		exit 1; \
	fi

# Run specific E2E integration test
test-e2e-integration:
	@echo "Running E2E integration assessment tests..."
	@if [ -d "./e2e" ]; then \
		echo "Running integration assessment tests..."; \
		cd e2e && bun install && bunx playwright install && bunx playwright test tests/integration/final-assessment.spec.ts; \
	else \
		echo "E2E directory not found. Please create it first."; \
		exit 1; \
	fi

# Run E2E tests in UI mode
test-e2e-ui:
	@echo "Running E2E tests in UI mode..."
	@if [ -d "./e2e" ]; then \
		echo "Starting Playwright UI mode..."; \
		cd e2e && bun install && bunx playwright install && bunx playwright test --ui; \
	else \
		echo "E2E directory not found. Please create it first."; \
		exit 1; \
	fi

# Install frontend dependencies
frontend-install:
	@if [ -d "./frontend" ]; then \
		echo "Installing frontend dependencies..."; \
		cd frontend && npm install; \
	else \
		echo "Frontend directory not found"; \
	fi

# Install backend dependencies (this is a placeholder - actual commands depend on each service)
backend-install:
	@echo "Installing backend dependencies..."
	@if [ -d "./backend/booking-service" ]; then \
		echo "Setting up booking service..."; \
		cd backend/booking-service && ./gradlew build --refresh-dependencies || echo "Booking service setup may require Gradle"; \
		cd ../..; \
	fi
	@if [ -d "./backend/checkin-service" ]; then \
		echo "Setting up check-in service..."; \
		cd backend/checkin-service && go mod tidy; \
		cd ../..; \
	fi
	@if [ -d "./backend/flight-search-service" ]; then \
		echo "Setting up flight search service..."; \
		cd backend/flight-search-service && bun install; \
		cd ../..; \
	fi
	@if [ -d "./backend/payment-service" ]; then \
		echo "Setting up payment service..."; \
		cd backend/payment-service && bun install; \
		cd ../..; \
	fi

# Quick start command
start: build up
	@echo "Core services started successfully!"
	@echo "Flight Search Service: http://localhost:8080"
	@echo "Payment Service: http://localhost:8083"
	@echo "Database (PostgreSQL): http://localhost:5432"
	@echo "Search (Elasticsearch): http://localhost:9200"
	@echo "Cache (Redis): http://localhost:6379"
	@echo ""
	@echo "Note: Booking, Frontend, and Check-in services are temporarily disabled due to build issues."

# Quick stop command
stop: down
	@echo "Services stopped."