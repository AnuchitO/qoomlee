# Qoomlee Airline API Documentation

This document provides comprehensive API documentation for all services in the Qoomlee Airline system.

## Flight Search Service (Port 8080)

### Search Flights
- **Endpoint**: `POST /api/v1/flights/search`
- **Description**: Search for available flights based on origin, destination, and dates
- **Request Body**:
```json
{
  "origin": "BKK",
  "destination": "SIN",
  "departureDate": "2023-12-25",
  "returnDate": "2023-12-30",
  "passengers": {
    "adults": 1,
    "children": 0,
    "infants": 0
  },
  "cabinClass": "economy"
}
```
- **Response**:
```json
[
  {
    "id": "flight-123",
    "segments": [
      {
        "id": "seg-1",
        "flightNumber": "QL101",
        "airline": "Qoomlee Air",
        "aircraftType": "Boeing 787",
        "origin": {
          "code": "BKK",
          "name": "Suvarnabhumi Airport",
          "city": "Bangkok",
          "country": "Thailand"
        },
        "destination": {
          "code": "SIN",
          "name": "Changi Airport",
          "city": "Singapore",
          "country": "Singapore"
        },
        "departureTime": "2023-12-25T08:30:00",
        "arrivalTime": "2023-12-25T12:45:00",
        "duration": 255,
        "stops": 0
      }
    ],
    "totalPrice": 450,
    "currency": "USD",
    "fareClass": "economy",
    "availableSeats": 5,
    "amenities": ["Meal included", "Entertainment", "Wi-Fi"]
  }
]
```

### Search Airports
- **Endpoint**: `GET /api/v1/flights/airports/search?q=bangkok`
- **Description**: Search for airports by name, city, or code
- **Response**:
```json
[
  {
    "code": "BKK",
    "name": "Suvarnabhumi Airport",
    "city": "Bangkok",
    "country": "Thailand"
  }
]
```

### Get Popular Routes
- **Endpoint**: `GET /api/v1/flights/popular-routes`
- **Description**: Get popular flight routes
- **Response**:
```json
[
  {
    "origin": {
      "code": "BKK",
      "name": "Suvarnabhumi Airport",
      "city": "Bangkok",
      "country": "Thailand"
    },
    "destination": {
      "code": "SIN",
      "name": "Changi Airport",
      "city": "Singapore",
      "country": "Singapore"
    }
  }
]
```

## Booking Service (Port 8081)

### Create Booking
- **Endpoint**: `POST /api/v1/bookings`
- **Description**: Create a new booking
- **Request Body**:
```json
{
  "outboundFlightId": "flight-123",
  "returnFlightId": "flight-456",
  "passengers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-01-01",
      "gender": "male",
      "contactInfo": {
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "countryCode": "+1"
      }
    }
  ],
  "fareClass": "economy",
  "specialRequests": "Vegetarian meal"
}
```
- **Response**:
```json
{
  "id": "uuid-string",
  "pnr": "ABC123",
  "createdAt": "2023-10-15T10:30:00",
  "passengers": [...],
  "itinerary": {
    "outbound": {...},
    "return": {...}
  },
  "totalPrice": 900,
  "currency": "USD",
  "status": "CONFIRMED",
  "paymentStatus": "PAID"
}
```

### Get Booking by PNR
- **Endpoint**: `GET /api/v1/bookings/{pnr}?lastName=Doe`
- **Description**: Retrieve booking details using PNR and last name
- **Response**: Same as create booking response

## Check-in Service (Port 8082)

### Start Check-in
- **Endpoint**: `POST /api/v1/checkin/start`
- **Description**: Initiate the check-in process
- **Request Body**:
```json
{
  "pnr": "ABC123",
  "lastName": "Doe"
}
```
- **Response**:
```json
{
  "booking": {...},
  "eligiblePassengers": [...],
  "checkInStatus": "eligible",
  "availableServices": [
    {
      "type": "seat",
      "cost": 0,
      "active": true
    }
  ]
}
```

### Get Available Seats
- **Endpoint**: `GET /api/v1/checkin/{pnr}/flights/{flightId}/seats`
- **Description**: Get available seats for a specific flight
- **Response**:
```json
[
  {
    "id": 1,
    "number": "12A",
    "type": "window",
    "price": 0,
    "available": true
  }
]
```

### Select Seat
- **Endpoint**: `POST /api/v1/checkin/{pnr}/flights/{flightId}/seats/{seatId}/select`
- **Description**: Assign a seat to a passenger
- **Request Body**:
```json
{
  "passengerId": "uuid"
}
```

### Complete Check-in
- **Endpoint**: `POST /api/v1/checkin/{pnr}/complete`
- **Description**: Complete the check-in process and generate boarding passes
- **Request Body**:
```json
[1, 2]  // Array of passenger IDs to check in
```
- **Response**:
```json
[
  {
    "id": "uuid",
    "pnr": "ABC123",
    "passengerName": "John Doe",
    "flightNumber": "QL101",
    "origin": "BKK",
    "destination": "SIN",
    "departureTime": "2023-12-25T08:30:00",
    "gate": "A12",
    "boardingTime": "2023-12-25T07:30:00",
    "seatNumber": "12A",
    "qrCodeData": "qrcode-string",
    "status": "active"
  }
]
```

## Payment Service (Port 8083)

### Create Payment Intent
- **Endpoint**: `POST /api/v1/payments/intents`
- **Description**: Create a payment intent for a booking
- **Request Body**:
```json
{
  "amount": 90000,
  "currency": "USD",
  "bookingId": "booking-uuid"
}
```
- **Response**:
```json
{
  "id": "pi_uuid",
  "amount": 90000,
  "currency": "USD",
  "status": "created",
  "bookingId": "booking-uuid"
}
```

### Process Payment
- **Endpoint**: `POST /api/v1/payments/{paymentIntentId}/process`
- **Description**: Process a payment using card details
- **Request Body**:
```json
{
  "cardNumber": "4242424242424242",
  "expiryMonth": "12",
  "expiryYear": "25",
  "cvv": "123",
  "cardholderName": "John Doe",
  "billingAddress": {
    "street": "123 Main St",
    "city": "Bangkok",
    "state": "Bangkok",
    "zipCode": "10110",
    "country": "TH"
  }
}
```
- **Response**:
```json
{
  "id": "pi_uuid",
  "amount": 90000,
  "currency": "USD",
  "status": "succeeded",
  "bookingId": "booking-uuid"
}
```

## Frontend API Integration

The frontend uses custom hooks for API communication. Key services include:

- `services/flightService.ts` - Flight search functionality
- `services/bookingService.ts` - Booking operations
- `services/checkinService.ts` - Check-in operations
- `services/paymentService.ts` - Payment processing

Each service follows the same pattern with proper error handling and loading states.

## Error Handling

All services return consistent error responses:

```json
{
  "error": "Descriptive error message"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 404: Not Found
- 500: Internal Server Error

## Authentication

Currently, the system uses session-based authentication for protected endpoints. In production, JWT-based authentication would be implemented with proper token refresh mechanisms.