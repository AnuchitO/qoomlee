import { Client } from '@elastic/elasticsearch';
import { Airport, FlightSearchParams, FlightOption, FlightSegment } from '../types/flight.types';

export class FlightSearchService {
  private esClient: Client;

  constructor() {
    this.esClient = new Client({
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
      auth: {
        username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
        password: process.env.ELASTICSEARCH_PASSWORD || 'changeme'
      }
    });
  }

  async searchFlights(params: FlightSearchParams): Promise<FlightOption[]> {
    try {
      // In a real implementation, this would query Elasticsearch
      // For now, we'll return mock data that matches the search criteria

      // Create mock flight data
      const mockFlights: FlightOption[] = [
        {
          id: 'flight-1',
          segments: [
            {
              id: 'seg-1',
              flightNumber: 'QL101',
              airline: 'Qoomlee Air',
              aircraftType: 'Boeing 787',
              origin: { code: params.origin, name: 'Airport Name', city: 'Origin City', country: 'Origin Country' },
              destination: { code: params.destination, name: 'Airport Name', city: 'Destination City', country: 'Destination Country' },
              departureTime: `${params.departureDate}T08:30:00`,
              arrivalTime: `${params.departureDate}T12:45:00`,
              duration: 4 * 60 + 15, // 4h 15m in minutes
              stops: 0,
            }
          ],
          totalPrice: 450 * params.passengers.adults, // Base price multiplied by number of adults
          currency: 'USD',
          fareClass: params.cabinClass,
          availableSeats: 5,
          amenities: ['Meal included', 'Entertainment', 'Wi-Fi'],
        },
        {
          id: 'flight-2',
          segments: [
            {
              id: 'seg-2',
              flightNumber: 'QL202',
              airline: 'Qoomlee Air',
              aircraftType: 'Airbus A350',
              origin: { code: params.origin, name: 'Airport Name', city: 'Origin City', country: 'Origin Country' },
              destination: { code: params.destination, name: 'Airport Name', city: 'Destination City', country: 'Destination Country' },
              departureTime: `${params.departureDate}T14:20:00`,
              arrivalTime: `${params.departureDate}T18:35:00`,
              duration: 4 * 60 + 15, // 4h 15m in minutes
              stops: 0,
            }
          ],
          totalPrice: 520 * params.passengers.adults,
          currency: 'USD',
          fareClass: params.cabinClass,
          availableSeats: 3,
          amenities: ['Meal included', 'Entertainment'],
        },
        {
          id: 'flight-3',
          segments: [
            {
              id: 'seg-3a',
              flightNumber: 'QL301',
              airline: 'Qoomlee Air',
              aircraftType: 'Boeing 777',
              origin: { code: params.origin, name: 'Airport Name', city: 'Origin City', country: 'Origin Country' },
              destination: { code: 'HKG', name: 'Hong Kong Airport', city: 'Hong Kong', country: 'China' },
              departureTime: `${params.departureDate}T09:15:00`,
              arrivalTime: `${params.departureDate}T12:00:00`,
              duration: 2 * 60 + 45, // 2h 45m in minutes
              stops: 0,
            },
            {
              id: 'seg-3b',
              flightNumber: 'QL302',
              airline: 'Qoomlee Air',
              aircraftType: 'Airbus A330',
              origin: { code: 'HKG', name: 'Hong Kong Airport', city: 'Hong Kong', country: 'China' },
              destination: { code: params.destination, name: 'Airport Name', city: 'Destination City', country: 'Destination Country' },
              departureTime: `${params.departureDate}T14:30:00`,
              arrivalTime: `${params.departureDate}T17:15:00`,
              duration: 2 * 60 + 45, // 2h 45m in minutes
              stops: 0,
              layoverDuration: 150, // 2h 30m layover in minutes
            }
          ],
          totalPrice: 380 * params.passengers.adults,
          currency: 'USD',
          fareClass: params.cabinClass,
          availableSeats: 8,
          amenities: ['Meal included'],
        }
      ];

      // Apply basic filtering based on search params
      // In a real implementation, this would be done via Elasticsearch queries
      return mockFlights;
    } catch (error) {
      console.error('Error searching flights:', error);
      throw error;
    }
  }

  async searchAirports(query: string): Promise<Airport[]> {
    try {
      // In a real implementation, this would query Elasticsearch
      // For now, we'll return mock data that matches the query

      const mockAirports: Airport[] = [
        { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
        { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
        { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
        { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' },
        { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
        { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'China' },
        { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
      ];

      // Filter airports based on the query
      const filteredAirports = mockAirports.filter(airport =>
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.code.toLowerCase().includes(query.toLowerCase())
      );

      return filteredAirports.slice(0, 10); // Return top 10 matches
    } catch (error) {
      console.error('Error searching airports:', error);
      throw error;
    }
  }
}