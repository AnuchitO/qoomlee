import apiClient from './api';
import { BookingRequest, Booking, Passenger } from '@/types';

export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData: BookingRequest): Promise<Booking> => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  },

  // Get booking details by PNR
  getBookingByPNR: async (pnr: string, lastName: string): Promise<Booking> => {
    const response = await apiClient.get(`/bookings/${pnr}`, {
      params: { lastName }
    });
    return response.data;
  },

  // Update a booking
  updateBooking: async (pnr: string, updateData: Partial<Booking>): Promise<Booking> => {
    const response = await apiClient.put(`/bookings/${pnr}`, updateData);
    return response.data;
  },

  // Cancel a booking
  cancelBooking: async (pnr: string): Promise<void> => {
    await apiClient.delete(`/bookings/${pnr}`);
  },

  // Add passenger to existing booking
  addPassenger: async (pnr: string, passenger: Passenger): Promise<Booking> => {
    const response = await apiClient.post(`/bookings/${pnr}/passengers`, passenger);
    return response.data;
  },

  // Get booking history for a user
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    const response = await apiClient.get(`/users/${userId}/bookings`);
    return response.data;
  },
};