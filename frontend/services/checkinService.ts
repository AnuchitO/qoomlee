import apiClient from './api';
import { CheckInRequest, CheckInResponse, BoardingPass, Seat, BaggageOption } from '@/types';

export const checkinService = {
  // Start the check-in process
  startCheckIn: async (request: CheckInRequest): Promise<CheckInResponse> => {
    const response = await apiClient.post('/checkin/start', request);
    return response.data;
  },

  // Get available seats for a flight
  getAvailableSeats: async (pnr: string, flightId: string): Promise<Seat[]> => {
    const response = await apiClient.get(`/checkin/${pnr}/flights/${flightId}/seats`);
    return response.data;
  },

  // Select a seat during check-in
  selectSeat: async (pnr: string, flightId: string, seatId: string): Promise<void> => {
    await apiClient.post(`/checkin/${pnr}/flights/${flightId}/seats/${seatId}/select`);
  },

  // Add baggage during check-in
  addBaggage: async (pnr: string, baggageData: BaggageOption[]): Promise<void> => {
    await apiClient.post(`/checkin/${pnr}/baggage`, baggageData);
  },

  // Complete the check-in process
  completeCheckIn: async (pnr: string, passengerIds: string[]): Promise<BoardingPass[]> => {
    const response = await apiClient.post(`/checkin/${pnr}/complete`, { passengerIds });
    return response.data;
  },

  // Get boarding pass by PNR
  getBoardingPass: async (pnr: string, passengerId: string): Promise<BoardingPass> => {
    const response = await apiClient.get(`/checkin/${pnr}/boarding-pass/${passengerId}`);
    return response.data;
  },

  // Get check-in eligibility status
  getCheckInEligibility: async (pnr: string): Promise<CheckInResponse> => {
    const response = await apiClient.get(`/checkin/${pnr}/eligibility`);
    return response.data;
  },
};