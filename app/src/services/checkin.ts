import type { CheckinPayload } from '../components/CheckinForm';
import type { FindBookingResponse } from '../types/checkin';
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

export function findBooking(payload: CheckinPayload): Promise<FindBookingResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.bookingRef === 'ABC123' && payload.lastName === 'HUUM') {
        resolve({
          checkinKey: 'CHK-ABC123-001',
          isEligible: true,
          bookingRef: payload.bookingRef,
          journeys: [
            {
              flightNumber: 'QL123',
              departure: { airport: 'BKK', time: new Date(Date.now() + 24 * 3600 * 1000).toISOString() },
              arrival: { airport: 'SIN', time: new Date(Date.now() + 26 * 3600 * 1000).toISOString() },
              segmentStatus: 'CHECKIN_OPEN',
              marketingCarrier: 'QL',
              operatingCarrier: 'QL',
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
