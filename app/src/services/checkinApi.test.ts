import { describe, it, expect } from 'vitest';
import { checkinApi } from './checkinApi';

describe('checkinApi', () => {
  const mockBookingRef = 'ABC123';
  const mockLastName = 'HUUM';

  describe('startCheckin', () => {
    it('should return booking details for valid booking reference and last name', async () => {
      const result = await checkinApi.startCheckin(mockBookingRef, mockLastName);

      expect(result).toBeDefined();
      expect(result.bookingRef).toBe(mockBookingRef);
      expect(result.passengers).toBeInstanceOf(Array);
      expect(result.passengers.length).toBeGreaterThan(0);
    });

    it('should throw an error for invalid booking reference', async () => {
      await expect(checkinApi.startCheckin('INVALID', mockLastName))
        .rejects
        .toThrow('Unable to retrieve booking');
    });
  });

  describe('updatePassengerDetails', () => {
    const updates = [{
      passengerId: '123e4567-e89b-12d3-a456-426614174000',
      phoneNumber: '+1234567890',
      nationality: 'TH',
      documentNumber: 'A12345678'
    }];

    it('should update passenger details', async () => {
      const result = await checkinApi.updatePassengerDetails(mockBookingRef, updates);

      expect(result).toBeInstanceOf(Array);
      expect(result[0].phoneNumber).toBe(updates[0].phoneNumber);
      expect(result[0].nationality).toBe(updates[0].nationality);
      expect(result[0].documentNumber).toBe(updates[0].documentNumber);
    });

    it('should throw an error for invalid booking reference', async () => {
      await expect(checkinApi.updatePassengerDetails('INVALID', updates))
        .rejects
        .toThrow('Booking not found');
    });
  });

  describe('acknowledgeDangerousGoods', () => {
    it('should acknowledge dangerous goods', async () => {
      await expect(checkinApi.acknowledgeDangerousGoods(mockBookingRef))
        .resolves
        .not.toThrow();
    });
  });

  describe('completeCheckin', () => {
    const passengerIds = ['123e4567-e89b-12d3-a456-426614174000'];

    it('should complete check-in and return boarding pass', async () => {
      const result = await checkinApi.completeCheckin(mockBookingRef, passengerIds);

      expect(result).toBeDefined();
      expect(result.checkinCompleted).toBe(true);
      expect(result.boardingPassUrl).toBeDefined();

      // Verify the passenger is checked in
      const passenger = result.passengers.find(p => p.id === passengerIds[0]);
      expect(passenger?.checkedIn).toBe(true);
    });

    it('should throw an error for invalid booking reference', async () => {
      await expect(checkinApi.completeCheckin('INVALID', passengerIds))
        .rejects
        .toThrow('Booking not found');
    });
  });
});
