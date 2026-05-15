# QOOMLEE AIRLINE SYSTEM - API DOCUMENTATION

## OVERVIEW
This document describes all API endpoints for the Qoomlee Airline System, following the C4 architecture model. All endpoints are versioned under `/api/v1` prefix.

## AUTHENTICATION
All API requests require authentication via Bearer JWT token in the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

## BASE RESPONSE FORMAT
All responses follow this structure:
```json
{
  "data": {}, // Response data
  "success": true,
  "message": "Success description",
  "correlationId": "uuid"
}
```

Error responses:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": [] // Optional array of field-specific errors
  },
  "success": false,
  "correlationId": "uuid"
}
```

---

# EPIC 1: AUTHENTICATION API

## POST /api/v1/auth/register
User registration endpoint.

### Request
```json
{
  "email": "john.doe@airline.com",
  "password": "Str0ngP@ssw0rd!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "ground_agent"
}
```

### Validation
- `email`: Required, must be valid RFC 5322 format, unique
- `password`: Required, min 8 chars with uppercase, lowercase, number, special char
- `firstName`: Required, max 50 chars, international characters allowed
- `lastName`: Required, max 50 chars, international characters allowed
- `role`: Required, must be one of: `ground_agent`, `gate_officer`, `admin`

### Response (Success 201)
```json
{
  "data": {
    "userId": "usr_123456",
    "email": "john.doe@airline.com",
    "statusCode": "PENDING_VERIFICATION"
  },
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "correlationId": "abc-123-def"
}
```

---

## POST /api/v1/auth/login
User login endpoint.

### Request
```json
{
  "email": "john.doe@airline.com",
  "password": "Str0ngP@ssw0rd!"
}
```

### Response (Success 200)
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 1800,
    "user": {
      "userId": "usr_123456",
      "email": "john.doe@airline.com",
      "firstName": "John",
      "lastName": "Doe",
      "roles": ["ground_agent"]
    }
  },
  "success": true,
  "message": "Login successful",
  "correlationId": "abc-123-def"
}
```

---

## POST /api/v1/auth/logout
User logout endpoint. Clears session and invalidates refresh token.

### Request
```json
{}
```

### Response (Success 200)
```json
{
  "data": {},
  "success": true,
  "message": "Logged out successfully",
  "correlationId": "abc-123-def"
}
```

---

## POST /api/v1/auth/refresh
Refresh access token using refresh token.

### Request
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Response (Success 200)
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 1800
  },
  "success": true,
  "message": "Token refreshed",
  "correlationId": "abc-123-def"
}
```

---

## PATCH /api/v1/auth/password
Change password for authenticated user.

### Request
```json
{
  "currentPassword": "OldPassw0rd!",
  "newPassword": "NewStr0ngP@ssw0rd!"
}
```

### Response (Success 200)
```json
{
  "data": {},
  "success": true,
  "message": "Password changed successfully",
  "correlationId": "abc-123-def"
}
```

---

# EPIC 2: FLIGHT MANAGEMENT API

## POST /api/v1/flights
Create a new flight.

### Request
```json
{
  "flightNumber": "QM123",
  "originAirportCode": "BKK",
  "destinationAirportCode": "CEI",
  "aircraftId": "act_789",
  "scheduledDepartureTime": "2026-06-15T08:00:00+07:00",
  "scheduledArrivalTime": "2026-06-15T09:30:00+07:00",
  "flightType": "domestic",
  "fareClasses": [
    {
      "className": "ECONOMY",
      "capacity": 150,
      "basePrice": 1500
    },
    {
      "className": "PREMIUM",
      "capacity": 20,
      "basePrice": 2500
    }
  ]
}
```

### Validation
- `flightNumber`: Required, 2-4 letters + 1-4 digits, unique
- `originAirportCode`: Required, 3-letter IATA code
- `destinationAirportCode`: Required, 3-letter IATA code
- `aircraftId`: Required, must exist in aircraft table
- `scheduledDepartureTime`: Required, must be in future
- `scheduledArrivalTime`: Required, must be after departure
- `flightType`: Required, `domestic` or `international`
- `fareClasses`: At least one required, total capacity must not exceed aircraft capacity

### Response (Success 201)
```json
{
  "data": {
    "flightId": "flt_123456",
    "flightNumber": "QM123",
    "status": "SCHEDULED",
    "createdAt": "2026-05-15T10:00:00Z"
  },
  "success": true,
  "message": "Flight created successfully",
  "correlationId": "abc-123-def"
}
```

---

## GET /api/v1/flights/search
Search for available flights with optional filters.

### Query Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| origin | Yes | 3-letter IATA origin code |
| destination | Yes | 3-letter IATA destination code |
| departureDate | Yes | YYYY-MM-DD format |
| passengers | No | Number of passengers (default: 1) |
| fareClass | No | Filter by fare class |
| sort | No | `price`, `duration`, `departureTime` |
| page | No | Page number (default: 1) |
| pageSize | No | Results per page (default: 10, max: 50) |

### Response (Success 200)
```json
{
  "data": {
    "flights": [
      {
        "flightId": "flt_123456",
        "flightNumber": "QM123",
        "aircraft": {
          "id": "act_789",
          "name": "Boeing 737-800",
          "config": "150Y"
        },
        "origin": "BKK",
        "destination": "CEI",
        "scheduledDeparture": "2026-06-15T08:00:00+07:00",
        "scheduledArrival": "2026-06-15T09:30:00+07:00",
        "durationMinutes": 90,
        "availableSeats": {
          "ECONOMY": 45,
          "PREMIUM": 12
        },
        "fareClasses": [
          {
            "className": "ECONOMY",
            "basePrice": 1500,
            "taxes": 300,
            "totalPrice": 1800,
            "available": 45
          },
          {
            "className": "PREMIUM",
            "basePrice": 2500,
            "taxes": 500,
            "totalPrice": 3000,
            "available": 12
          }
        ],
        "airline": "QOOMLEE"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalResults": 125,
      "totalPages": 13
    }
  },
  "success": true,
  "message": "Flights found",
  "correlationId": "abc-123-def"
}
```

---

## GET /api/v1/flights/{flightId}
Get flight details.

### Response (Success 200)
```json
{
  "data": {
    "flightId": "flt_123456",
    "flightNumber": "QM123",
    "status": "SCHEDULED",
    "origin": "BKK",
    "destination": "CEI",
    "scheduledDeparture": "2026-06-15T08:00:00+07:00",
    "scheduledArrival": "2026-06-15T09:30:00+07:00",
    "aircraft": {
      "id": "act_789",
      "name": "Boeing 737-800",
      "registration": "HS-ABC"
    },
    "fareClasses": [
      {
        "className": "ECONOMY",
        "capacity": 150,
        "available": 45,
        "basePrice": 1500,
        "taxRate": 0.2
      }
    ],
    "routeMap": [
      {
        "stopNumber": 1,
        "airportCode": "BKK",
        "type": "origin",
        "departureTime": "2026-06-15T08:00:00+07:00"
      },
      {
        "stopNumber": 2,
        "airportCode": "CEI",
        "type": "destination",
        "arrivalTime": "2026-06-15T09:30:00+07:00"
      }
    ]
  },
  "success": true,
  "message": "Flight details retrieved",
  "correlationId": "abc-123-def"
}
```

---

# EPIC 3: BOOKING API

## POST /api/v1/bookings
Create a new booking.

### Request
```json
{
  "flightId": "flt_123456",
  "fareClass": "ECONOMY",
  "passengers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+66812345678",
      "dateOfBirth": "1990-01-15",
      "nationality": "TH",
      "specialRequirements": {
        "meal": "None",
        " wheelchair": false,
        "accompaniedByServiceAnimal": false
      }
    }
  ],
  "seatNumber": "12A"
}
```

### Validation
- `flightId`: Required, must be valid flight
- `fareClass`: Required, must be available for flight
- `passengers`: Required, at least 1, max 9 per booking
- Each passenger: firstName (max 50), lastName (max 50), email (valid format), phone (E.164 format)
- `seatNumber`: Optional, must be available in selected fare class

### Response (Success 201)
```json
{
  "data": {
    "bookingId": "bkg_123456",
    "pnr": "XJ9K2M",
    "status": "PENDING_PAYMENT",
    "totalAmount": 1800,
    "fareBreakdown": {
      "basePrice": 1500,
      "taxes": 300,
      "fees": 0
    },
    "passengers": [
      {
        "passengerId": "pax_789",
        "firstName": "John",
        "lastName": "Doe",
        "seatNumber": "12A"
      }
    ],
    "flight": {
      "flightId": "flt_123456",
      "flightNumber": "QM123",
      "origin": "BKK",
      "destination": "CEI",
      "scheduledDeparture": "2026-06-15T08:00:00+07:00"
    }
  },
  "success": true,
  "message": "Booking created successfully. Please complete payment.",
  "correlationId": "abc-123-def"
}
```

---

## GET /api/v1/bookings/{bookingId}
Get booking details by ID.

### Response (Success 200)
```json
{
  "data": {
    "bookingId": "bkg_123456",
    "pnr": "XJ9K2M",
    "status": "PENDING_PAYMENT",
    "createdAt": "2026-05-15T10:00:00Z",
    "totalAmount": 1800,
    "passengers": [
      {
        "passengerId": "pax_789",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+66812345678",
        "seatNumber": "12A",
        "checkInStatus": "NOT_CHECKED_IN"
      }
    ],
    "flight": {
      "flightId": "flt_123456",
      "flightNumber": "QM123",
      "origin": "BKK",
      "destination": "CEI",
      "scheduledDeparture": "2026-06-15T08:00:00+07:00",
      "scheduledArrival": "2026-06-15T09:30:00+07:00",
      "aircraft": {
        "name": "Boeing 737-800",
        "registration": "HS-ABC"
      }
    },
    "fareBreakdown": {
      "basePrice": 1500,
      "taxes": 300,
      "fees": 0
    }
  },
  "success": true,
  "message": "Booking details retrieved",
  "correlationId": "abc-123-def"
}
```

---

## PATCH /api/v1/bookings/{bookingId}/confirm
Confirm booking payment (called from Payment Service).

### Request
```json
{
  "paymentId": "pay_123",
  "paymentMethod": "CREDIT_CARD",
  "paymentReference": "OMISE_CH_123456"
}
```

### Response (Success 200)
```json
{
  "data": {
    "bookingId": "bkg_123456",
    "pnr": "XJ9K2M",
    "status": "CONFIRMED",
    "confirmedAt": "2026-05-15T10:05:00Z"
  },
  "success": true,
  "message": "Booking confirmed",
  "correlationId": "abc-123-def"
}
```

---

## GET /api/v1/bookings/retrieve
Retrieve booking by last name and PNR (check-in flow).

### Query Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| pnr | Yes | 6-character booking reference |
| lastName | Yes | Passenger last name |
| email | No | Alternative to last name |

### Response (Success 200)
```json
{
  "data": {
    "bookingId": "bkg_123456",
    "pnr": "XJ9K2M",
    "status": "PENDING_PAYMENT",
    "flight": {
      "flightId": "flt_123456",
      "flightNumber": "QM123",
      "origin": "BKK",
      "destination": "CEI",
      "scheduledDeparture": "2026-06-15T08:00:00+07:00",
      "checkInOpensAt": "2026-06-14T08:00:00+07:00",
      "checkInClosesAt": "2026-06-15T07:00:00+07:00"
    },
    "passengers": [
      {
        "passengerId": "pax_789",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "checkInStatus": "NOT_CHECKED_IN",
        "seatNumber": null
      }
    ]
  },
  "success": true,
  "message": "Booking retrieved",
  "correlationId": "abc-123-def"
}
```

---

# EPIC 4: PASSENGER API

## POST /api/v1/passengers
Create passenger information (single passenger).

### Request
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+66812345678",
  "dateOfBirth": "1990-01-15",
  "nationality": "TH",
  "gender": "M",
  "specialRequirements": {
    "meal": "None",
    "wheelchair": false,
    "accompaniedByServiceAnimal": false
  }
}
```

### Validation
- `firstName`: Required, max 50 chars, international characters allowed
- `lastName`: Required, max 50 chars, international characters allowed
- `email`: Required, RFC 5322 format
- `phone`: Required, E.164 format
- `dateOfBirth`: Required, must be in past
- `nationality`: Required, 2-letter ISO 3166-1 alpha-2 code

### Response (Success 201)
```json
{
  "data": {
    "passengerId": "pax_789",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "createdAt": "2026-05-15T10:00:00Z"
  },
  "success": true,
  "message": "Passenger information saved",
  "correlationId": "abc-123-def"
}
```

---

## POST /api/v1/passengers/batch
Create multiple passengers in one request.

### Request
```json
{
  "passengers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+66812345678",
      "dateOfBirth": "1990-01-15",
      "nationality": "TH"
    },
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com",
      "phone": "+66812345679",
      "dateOfBirth": "1992-03-20",
      "nationality": "TH"
    }
  ]
}
```

### Response (Success 201)
```json
{
  "data": {
    "createdCount": 2,
    "passengers": [
      {
        "passengerId": "pax_789",
        "firstName": "John",
        "lastName": "Doe"
      },
      {
        "passengerId": "pax_790",
        "firstName": "Jane",
        "lastName": "Doe"
      }
    ]
  },
  "success": true,
  "message": "Passengers saved successfully",
  "correlationId": "abc-123-def"
}
```

---

# EPIC 5: PAYMENT API

## POST /api/v1/payments/charge
Process payment for a booking.

### Request
```json
{
  "bookingId": "bkg_123456",
  "amount": 1800,
  "currency": "THB",
  "paymentMethod": {
    "type": "CREDIT_CARD",
    "token": "tok_visa_123456",
    "cardLastFour": "1234",
    "cardBrand": "Visa",
    "expiryMonth": 12,
    "expiryYear": 2025
  }
}
```

### Validation
- `bookingId`: Required, must be in PENDING_PAYMENT status
- `amount`: Required, must match booking total
- `currency`: Optional, defaults to THB
- `paymentMethod`: Required, valid token for payment gateway

### Response (Success 200)
```json
{
  "data": {
    "paymentId": "pay_123",
    "bookingId": "bkg_123456",
    "amount": 1800,
    "currency": "THB",
    "status": "SUCCESS",
    "transactionReference": "OMISE_CH_123456",
    "paymentMethod": {
      "type": "CREDIT_CARD",
      "cardLastFour": "1234",
      "cardBrand": "Visa"
    },
    "timestamp": "2026-05-15T10:05:00Z"
  },
  "success": true,
  "message": "Payment successful",
  "correlationId": "abc-123-def"
}
```

---

## POST /api/v1/payments/refund
Process refund for a booking.

### Request
```json
{
  "bookingId": "bkg_123456",
  "amount": 1800,
  "reason": "Passenger cancellation"
}
```

### Response (Success 200)
```json
{
  "data": {
    "refundId": "ref_123",
    "paymentId": "pay_123",
    "bookingId": "bkg_123456",
    "amount": 1800,
    "currency": "THB",
    "status": "PENDING",
    "reason": "Passenger cancellation",
    "timestamp": "2026-05-15T10:05:00Z"
  },
  "success": true,
  "message": "Refund request submitted",
  "correlationId": "abc-123-def"
}
```

---

## POST /api/v1/payments/promptpay
Generate PromptPay QR code for payment.

### Request
```json
{
  "bookingId": "bkg_123456",
  "amount": 1800
}
```

### Response (Success 200)
```json
{
  "data": {
    "paymentId": "pay_123",
    "bookingId": "bkg_123456",
    "qrPayload": "00020101021126580016A0000006999999990116513312345678901234567890010900000000003001010005011000010009TH5802TH5915THAI BANKING CORP6007Bangkok62070503***63041234",
    "qrImageBase64": "iVBORw0KG...==",
    "expiresAt": "2026-05-15T11:05:00Z",
    "amount": 1800
  },
  "success": true,
  "message": "PromptPay QR generated",
  "correlationId": "abc-123-def"
}
```

---

# EPIC 6: CHECK-IN API

## POST /api/v1/checkin
Process online check-in.

### Request
```json
{
  "pnr": "XJ9K2M",
  "lastName": "Doe",
  "passengerIds": ["pax_789"],
  "seatNumber": "12A"
}
```

### Validation
- `pnr`: Required, 6-character booking reference
- `lastName`: Required, must match booking last name
- `passengerIds`: Array of passenger IDs to check in
- `seatNumber`: Optional, must be available if provided

### Response (Success 200)
```json
{
  "data": {
    "bookingId": "bkg_123456",
    "pnr": "XJ9K2M",
    "status": "CHECKED_IN",
    "checkedInAt": "2026-06-14T14:00:00+07:00",
    "passengers": [
      {
        "passengerId": "pax_789",
        "firstName": "John",
        "lastName": "Doe",
        "seatNumber": "12A",
        "checkInStatus": "CHECKED_IN",
        "checkInAt": "2026-06-14T14:00:00+07:00"
      }
    ],
    "flight": {
      "flightId": "flt_123456",
      "flightNumber": "QM123",
      "origin": "BKK",
      "destination": "CEI",
      "scheduledDeparture": "2026-06-15T08:00:00+07:00",
      "checkInOpensAt": "2026-06-14T08:00:00+07:00",
      "checkInClosesAt": "2026-06-15T07:00:00+07:00"
    }
  },
  "success": true,
  "message": "Check-in completed",
  "correlationId": "abc-123-def"
}
```

---

## GET /api/v1/checkin/_details
Retrieve check-in details by PNR and last name.

### Query Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| pnr | Yes | 6-character booking reference |
| lastName | Yes | Passenger last name |

### Response (Success 200)
```json
{
  "data": {
    "bookingId": "bkg_123456",
    "pnr": "XJ9K2M",
    "flight": {
      "flightId": "flt_123456",
      "flightNumber": "QM123",
      "origin": "BKK",
      "destination": "CEI",
      "scheduledDeparture": "2026-06-15T08:00:00+07:00"
    },
    "passengers": [
      {
        "passengerId": "pax_789",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "checkInStatus": "NOT_CHECKED_IN",
        "seatNumber": null
      }
    ],
    "checkInWindow": {
      "opensAt": "2026-06-14T08:00:00+07:00",
      "closesAt": "2026-06-15T07:00:00+07:00",
      "isOpen": false
    }
  },
  "success": true,
  "message": "Check-in details retrieved",
  "correlationId": "abc-123-def"
}
```

---

# EPIC 7: BOARDING PASS API

## GET /api/v1/boarding-pass/{bookingId}
Retrieve boarding pass for a booking.

### Response (Success 200)
```json
{
  "data": {
    "boardingPassId": "bp_123",
    "bookingId": "bkg_123456",
    "pnr": "XJ9K2M",
    "flight": {
      "flightNumber": "QM123",
      "origin": "BKK",
      "destination": "CEI",
      "scheduledDeparture": "2026-06-15T08:00:00+07:00",
      "gate": "GATE-03",
      "terminal": "T1"
    },
    "passengers": [
      {
        "passengerId": "pax_789",
        "firstName": "John",
        "lastName": "Doe",
        "seatNumber": "12A",
        "boardingGroup": "C"
      }
    ],
    "boardingPassDetails": {
      "qrPayload": "BCBP:1:XJ9K2M:QM123:BKK:CEI:20260615:08:00:GATE-03:T1:PAX_789:12A:C:001",
      "barcodeData": "M1DOE/JOHN,,,,,XJ9K2MQM123BKKCEI202606150800GATE-03T1PAX_78912AC001",
      "issuingCarrier": "QM",
      "flightDate": "2026-06-15",
      "checkInTime": "2026-06-14T14:00:00+07:00"
    }
  },
  "success": true,
  "message": "Boarding pass retrieved",
  "correlationId": "abc-123-def"
}
```

---

## GET /api/v1/boarding-pass/{bookingId}/pdf
Download boarding pass as PDF.

### Response (Success 200)
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="boarding_pass_XJ9K2M.pdf"

<PDF_BINARY_DATA>
```

---

# ERROR CODES

| Code | HTTP Status | Description |
|------|-------------|-------------|
| INVALID_INPUT | 400 | Request validation failed |
| RESOURCE_NOT_FOUND | 404 | Requested resource does not exist |
| ALREADY_EXISTS | 409 | Resource already exists |
| UNAUTHORIZED | 401 | Authentication required |
| FORBIDDEN | 403 | Not authorized for this action |
| RATE_LIMITED | 429 | Too many requests |
| SERVICE_UNAVAILABLE | 503 | Service temporarily unavailable |
| GATEWAY_ERROR | 504 | External service timeout |

---

# API CHANGE LOG

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-05-15 | Initial API release |