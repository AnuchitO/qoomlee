import type { Booking, Passenger } from '../../types/checkin';

export interface BoardingPassProps {
  booking: Booking;
  passengers: Passenger[];
}

export interface AirportInfo {
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
}

export interface FlightSegmentProps {
  departure: {
    time: string;
    airport: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    time: string;
    airport: string;
    terminal?: string;
    gate?: string;
  };
  flightNumber: string;
  aircraft: string;
  duration: number;
  cabinClass: string;
  bookingClass: string;
  seat?: string;
  boardingTime?: string;
}
