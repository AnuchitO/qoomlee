import apiClient from './api';
import { FlightOption, Airport } from '@/types';

interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string; // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: 'economy' | 'premium-economy' | 'business' | 'first';
}

export const flightService = {
  // Search for available flights
  searchFlights: async (params: SearchParams): Promise<FlightOption[]> => {
    const response = await apiClient.post('/flights/search', params);
    return response.data;
  },

  // Get popular routes
  getPopularRoutes: async (): Promise<{ origin: Airport; destination: Airport }[]> => {
    const response = await apiClient.get('/flights/popular-routes');
    return response.data;
  },

  // Get flight details by ID
  getFlightDetails: async (flightId: string): Promise<FlightOption> => {
    const response = await apiClient.get(`/flights/${flightId}`);
    return response.data;
  },

  // Get airport autocomplete suggestions
  getAirportSuggestions: async (query: string): Promise<Airport[]> => {
    const response = await apiClient.get(`/flights/airports/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};