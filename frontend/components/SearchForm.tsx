'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { flightService } from '@/services/flightService';
import { useRouter } from 'next/navigation';

// Define the schema for form validation
const searchSchema = z.object({
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  departureDate: z.string().refine(date => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: 'Departure date must be today or in the future',
  }),
  returnDate: z.string().optional(),
  passengers: z.object({
    adults: z.number().min(1, 'At least 1 adult is required').max(9, 'Maximum 9 adults'),
    children: z.number().min(0).max(9, 'Maximum 9 children'),
    infants: z.number().min(0).max(9, 'Maximum 9 infants'),
  }),
  cabinClass: z.enum(['economy', 'premium-economy', 'business', 'first']),
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function SearchForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      origin: '',
      destination: '',
      departureDate: '',
      returnDate: '',
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      cabinClass: 'economy',
    },
  });

  const origin = watch('origin');
  const destination = watch('destination');
  const departureDate = watch('departureDate');
  const returnDate = watch('returnDate');

  const onSubmit = async (data: SearchFormData) => {
    setIsLoading(true);
    setSearchError(null);

    try {
      // Validate that origin and destination are different
      if (origin.toLowerCase() === destination.toLowerCase()) {
        throw new Error('Origin and destination cannot be the same');
      }

      // Validate return date if it's a round trip
      if (returnDate && departureDate && new Date(returnDate) < new Date(departureDate)) {
        throw new Error('Return date must be after departure date');
      }

      // Call the search API
      const searchResults = await flightService.searchFlights({
        origin: data.origin,
        destination: data.destination,
        departureDate: data.departureDate,
        returnDate: data.returnDate || undefined,
        passengers: data.passengers,
        cabinClass: data.cabinClass,
      });

      // Navigate to results page with search data
      // In a real app, we would pass the search results or store them in state/context
      router.push('/search/results');
    } catch (error: any) {
      console.error('Search error:', error);
      setSearchError(error.message || 'An error occurred during search');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Flight</h2>

      {searchError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {searchError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <input
              id="origin"
              {...register('origin')}
              placeholder="City or airport"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.origin ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.origin && (
              <p className="mt-1 text-sm text-red-600">{errors.origin.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              id="destination"
              {...register('destination')}
              placeholder="City or airport"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.destination ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.destination && (
              <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
              Departure
            </label>
            <input
              id="departureDate"
              type="date"
              {...register('departureDate')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.departureDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.departureDate && (
              <p className="mt-1 text-sm text-red-600">{errors.departureDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
              Return (Optional)
            </label>
            <input
              id="returnDate"
              type="date"
              {...register('returnDate')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passengers
            </label>
            <div className="flex space-x-4">
              <div>
                <label htmlFor="adults" className="block text-xs text-gray-500">
                  Adults
                </label>
                <select
                  id="adults"
                  {...register('passengers.adults', { valueAsNumber: true })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(9)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="children" className="block text-xs text-gray-500">
                  Children
                </label>
                <select
                  id="children"
                  {...register('passengers.children', { valueAsNumber: true })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="infants" className="block text-xs text-gray-500">
                  Infants
                </label>
                <select
                  id="infants"
                  {...register('passengers.infants', { valueAsNumber: true })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="cabinClass" className="block text-sm font-medium text-gray-700 mb-1">
              Cabin Class
            </label>
            <select
              id="cabinClass"
              {...register('cabinClass')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isLoading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
      </form>
    </div>
  );
}