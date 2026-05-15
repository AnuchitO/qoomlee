export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string; // ISO date string
  returnDate?: string; // ISO date string
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: 'economy' | 'premium-economy' | 'business' | 'first';
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

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