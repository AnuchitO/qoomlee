import type { CheckinPayload } from '../components/CheckinForm';
import type { Booking } from '../types/checkin';
import { PaxType } from '../types/checkin';

export class ApiError extends Error {
  code: string;
  status: number;
  userMessage: string;
  details?: unknown;

  constructor({ code, status, message, userMessage, details }: { code: string; status: number; message: string; userMessage: string; details?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.userMessage = userMessage;
    this.details = details;
  }
}

export function findBooking(payload: CheckinPayload): Promise<Booking> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.bookingRef === 'ABC123' && payload.lastName === 'HUUM') {
        resolve({
          checkinKey: 'CHK-ABC123-001',
          isEligible: true,
          bookingRef: payload.bookingRef,
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
              firstName: 'ALEX',
              lastName: 'HUUM',
              paxType: PaxType.ADT,
              seat: '12A',
              boardingZone: '1',
              boardingSequence: '023',
              checkedIn: true,
            },
            {
              firstName: 'Somsee',
              lastName: 'Kuum',
              paxType: PaxType.ADT,
              seat: '12B',
              boardingZone: '1',
              boardingSequence: '022',
              checkedIn: true,
            }
          ],
        });
      } else {
        reject(
          new ApiError({
            code: 'BOOKING_NOT_FOUND',
            status: 404,
            message: 'Booking not found',
            userMessage: 'We couldn’t find your booking. Check your details and try again.',
            details: {
              bookingRef: payload.bookingRef,
              lastName: payload.lastName,
              timestamp: new Date().toISOString(),
              correlationId: `mock-${Math.random().toString(36).slice(2, 10)}`,
            },
          })
        );
      }
    }, 300);
  });
}
