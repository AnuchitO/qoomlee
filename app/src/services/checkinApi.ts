import { v4 as uuidv4 } from 'uuid';
import { ApiError } from './checkin';
import { PaxType } from '../types/checkin';

// Types
export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  paxType: PaxType;
  seat?: string;
  boardingZone?: string;
  boardingSequence?: string;
  checkedIn: boolean;
  phoneNumber?: string;
  nationality?: string;
  documentNumber?: string;
}

export interface FlightSegment {
  departure: {
    airport: string;
    time: string;
    terminal: string;
  };
  arrival: {
    airport: string;
    time: string;
    terminal: string;
  };
  flightNumber: string;
  segmentStatus: string;
  marketingCarrier: string;
  operatingCarrier: string;
  terminal: string;
  gate: string;
}

export interface BookingDetails {
  checkinKey: string;
  bookingRef: string;
  isEligible: boolean;
  journeys: FlightSegment[];
  passengers: Passenger[];
  dgAcknowledged?: boolean;
  checkinCompleted?: boolean;
  boardingPassUrl?: string;
}

// Mock data store
const mockDb: Record<string, BookingDetails> = {
  'ABC123': {
    checkinKey: 'CHK-ABC123-001',
    isEligible: true,
    bookingRef: 'ABC123',
    journeys: [
      {
        departure: {
          airport: 'BKK',
          time: '2025-11-05T21:03:00+07:00',
          terminal: '1'
        },
        arrival: {
          airport: 'SIN',
          time: '2025-11-06T00:02:00+08:00',
          terminal: '1'
        },
        flightNumber: 'QL123',
        segmentStatus: 'CHECKIN_OPEN',
        marketingCarrier: 'QL',
        operatingCarrier: 'QL',
        terminal: '1',
        gate: '40'
      },
    ],
    passengers: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        firstName: 'ALEX',
        lastName: 'HUUM',
        paxType: PaxType.ADT,
        seat: '12A',
        boardingZone: '1',
        boardingSequence: '012',
        checkedIn: true,
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        firstName: 'Somsee',
        lastName: 'Kuum',
        paxType: PaxType.ADT,
        seat: '12B',
        boardingZone: '1',
        boardingSequence: '013',
        checkedIn: true,
      }
    ]
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Service
export const checkinApi = {
  // Initial check-in with PNR and Surname
  async startCheckin(bookingRef: string, lastName: string): Promise<BookingDetails> {
    await delay(300);

    const booking = mockDb[bookingRef];
    if (!booking || !booking.passengers.some(p => p.lastName === lastName)) {
      throw new ApiError({
        code: 'BOOKING_NOT_FOUND',
        status: 404,
        message: 'Booking not found',
        userMessage: 'We couldn\'t find your booking. Check your details and try again.',
      });
    }

    // Return booking data with all passenger details
    return {
      ...booking,
      passengers: booking.passengers.map(p => ({
        id: p.id,
        firstName: p.firstName,
        lastName: p.lastName,
        paxType: p.paxType,
        seat: p.seat,
        boardingZone: p.boardingZone,
        boardingSequence: p.boardingSequence,
        checkedIn: p.checkedIn
      }))
    };
  },

  // Update passenger details
  async updatePassengerDetails(
    bookingRef: string,
    passengerId: string,
    details: {
      phoneNumber: string;
      nationality: string;
      documentNumber?: string;
    }
  ): Promise<Passenger> {
    await delay(300);

    const booking = mockDb[bookingRef];
    if (!booking) {
      throw new Error('Booking not found');
    }

    const passenger = booking.passengers.find(p => p.id === passengerId);
    if (!passenger) {
      throw new Error('Passenger not found');
    }

    // Update passenger details
    Object.assign(passenger, details);
    return passenger;
  },

  // Acknowledge dangerous goods
  async acknowledgeDangerousGoods(bookingRef: string): Promise<void> {
    await delay(200);
    const booking = mockDb[bookingRef];
    if (booking) {
      booking.dgAcknowledged = true;
    }
  },

  // Complete check-in and get boarding pass
  async completeCheckin(bookingRef: string, passengerIds: string[]): Promise<BookingDetails> {
    await delay(500);

    const booking = mockDb[bookingRef];
    if (!booking) {
      throw new Error('Booking not found');
    }

    // Update check-in status for selected passengers
    booking.passengers.forEach(passenger => {
      if (passengerIds.includes(passenger.id)) {
        passenger.checkedIn = true;
        // Assign random seat and boarding details
        if (!passenger.seat) {
          const row = Math.floor(Math.random() * 30) + 1;
          const seatLetter = String.fromCharCode(65 + Math.floor(Math.random() * 6)); // A-F
          passenger.seat = `${row}${seatLetter}`;
          passenger.boardingZone = String(Math.ceil(Math.random() * 4));
          passenger.boardingSequence = String(100 + Math.floor(Math.random() * 400)).padStart(3, '0');
        }
      }
    });

    // Mark check-in as completed
    booking.checkinCompleted = true;
    booking.boardingPassUrl = `/api/v1/boarding-pass/${bookingRef}`;

    return booking;
  }
};

// Export types for use in components
export type { BookingDetails as CheckinResponse };
