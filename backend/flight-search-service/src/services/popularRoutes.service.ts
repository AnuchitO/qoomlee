import { Airport } from '../types/flight.types';

export class PopularRoutesService {
  async getPopularRoutes(): Promise<{ origin: Airport; destination: Airport }[]> {
    // In a real implementation, this would query data from a database
    // For now, we'll return mock data representing popular routes

    const mockPopularRoutes = [
      {
        origin: { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
        destination: { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' }
      },
      {
        origin: { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
        destination: { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' }
      },
      {
        origin: { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
        destination: { code: 'HKT', name: 'Phuket International Airport', city: 'Phuket', country: 'Thailand' }
      },
      {
        origin: { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
        destination: { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' }
      },
      {
        origin: { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
        destination: { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' }
      }
    ];

    return mockPopularRoutes;
  }
}