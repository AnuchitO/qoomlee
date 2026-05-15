# Use the official Golang image as a parent image
FROM golang:1.23-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the application
RUN go build -o main cmd/api/main.go

# Production stage
FROM alpine:latest

# Install ca-certificates for SSL connections
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from builder stage
COPY --from=builder /app/main .

# Expose the port the app runs on
EXPOSE 8082

# Command to run the executable
CMD ["./main"]