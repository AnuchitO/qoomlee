// Flight types
export interface FlightSegment {
  id: string;
  flightNumber: string;
  airline: string;
  aircraftType: string;
  origin: Airport;
  destination: Airport;
  departureTime: string; // ISO date string
  arrivalTime: string; // ISO date string
  duration: number; // in minutes
  stops: number;
  layoverDuration?: number; // in minutes
}

export interface FlightOption {
  id: string;
  segments: FlightSegment[];
  totalPrice: number;
  currency: string;
  fareClass: 'economy' | 'premium-economy' | 'business' | 'first';
  availableSeats: number;
  amenities: string[];
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

// Booking types
export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date string
  gender: 'male' | 'female' | 'other';
  nationality?: string;
  passportNumber?: string;
  passportExpiry?: string;
  contactInfo: ContactInfo;
  specialAssistance?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  countryCode: string;
}

export interface BookingRequest {
  outboundFlightId: string;
  returnFlightId?: string;
  passengers: Passenger[];
  fareClass: 'economy' | 'premium-economy' | 'business' | 'first';
  specialRequests?: string;
}

export interface Booking {
  id: string;
  pnr: string; // Passenger Name Record
  createdAt: string; // ISO date string
  passengers: Passenger[];
  itinerary: {
    outbound: FlightSegment;
    return?: FlightSegment;
  };
  totalPrice: number;
  currency: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
}

// Check-in types
export interface CheckInRequest {
  pnr: string;
  lastName: string;
}

export interface CheckInResponse {
  booking: Booking;
  eligiblePassengers: Passenger[];
  checkInStatus: 'eligible' | 'ineligible';
  ineligibleReasons?: string[];
  availableServices: AvailableService[];
}

export interface AvailableService {
  type: 'seat' | 'baggage' | 'meal' | 'wifi';
  available: boolean;
  cost?: number;
}

export interface Seat {
  id: string;
  number: string;
  type: 'standard' | 'exit-row' | 'aisle' | 'window' | 'extra-legroom';
  price: number;
  available: boolean;
  occupiedBy?: string; // passenger ID
}

export interface BaggageOption {
  id: string;
  type: 'carry-on' | 'checked' | 'extra-checked';
  weightLimit: number; // in kg
  price: number;
  quantity: number;
}

export interface BoardingPass {
  id: string;
  passengerName: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string; // ISO date string
  gate: string;
  boardingTime: string; // ISO date string
  seatNumber: string;
  pnr: string;
  qrCodeData: string;
  pdfUrl?: string;
}

// Payment types
export interface PaymentDetails {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  billingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'created' | 'processing' | 'succeeded' | 'failed';
  paymentMethod?: string;
}