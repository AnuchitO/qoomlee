'use client';

import { useState } from 'react';
import { FlightOption } from '@/types';
import { formatCurrency, formatDuration, formatDate, formatTime } from '@/utils/formatters';

// Mock data for demonstration
const mockFlightResults: FlightOption[] = [
  {
    id: 'flight-1',
    segments: [
      {
        id: 'seg-1',
        flightNumber: 'QL101',
        airline: 'Qoomlee Air',
        aircraftType: 'Boeing 787',
        origin: { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
        destination: { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
        departureTime: '2023-10-15T08:30:00',
        arrivalTime: '2023-10-15T12:45:00',
        duration: 4 * 60 + 15, // 4h 15m in minutes
        stops: 0,
      }
    ],
    totalPrice: 450,
    currency: 'USD',
    fareClass: 'economy',
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
        origin: { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
        destination: { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
        departureTime: '2023-10-15T14:20:00',
        arrivalTime: '2023-10-15T18:35:00',
        duration: 4 * 60 + 15, // 4h 15m in minutes
        stops: 0,
      }
    ],
    totalPrice: 520,
    currency: 'USD',
    fareClass: 'economy',
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
        origin: { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
        destination: { code: 'HKG', name: 'Hong Kong Airport', city: 'Hong Kong', country: 'China' },
        departureTime: '2023-10-15T09:15:00',
        arrivalTime: '2023-10-15T12:00:00',
        duration: 2 * 60 + 45, // 2h 45m in minutes
        stops: 0,
      },
      {
        id: 'seg-3b',
        flightNumber: 'QL302',
        airline: 'Qoomlee Air',
        aircraftType: 'Airbus A330',
        origin: { code: 'HKG', name: 'Hong Kong Airport', city: 'Hong Kong', country: 'China' },
        destination: { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
        departureTime: '2023-10-15T14:30:00',
        arrivalTime: '2023-10-15T17:15:00',
        duration: 2 * 60 + 45, // 2h 45m in minutes
        stops: 0,
        layoverDuration: 150, // 2h 30m layover in minutes
      }
    ],
    totalPrice: 380,
    currency: 'USD',
    fareClass: 'economy',
    availableSeats: 8,
    amenities: ['Meal included'],
  },
];

export default function SearchResultsPage() {
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(null);
  const [filters, setFilters] = useState({
    maxPrice: 1000,
    maxStops: 1,
    departureTime: 'any',
    sortBy: 'price',
  });

  const handleSelectFlight = (flight: FlightOption) => {
    setSelectedFlight(flight);
  };

  const handleContinueBooking = () => {
    if (selectedFlight) {
      // In a real app, this would navigate to the booking page
      console.log('Selected flight:', selectedFlight);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="lg:w-1/4 bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price: ${filters.maxPrice}
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Stops
                </label>
                <select
                  value={filters.maxStops}
                  onChange={(e) => setFilters({...filters, maxStops: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="0">Direct only</option>
                  <option value="1">1 stop or fewer</option>
                  <option value="2">2 stops or fewer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Time
                </label>
                <select
                  value={filters.departureTime}
                  onChange={(e) => setFilters({...filters, departureTime: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="any">Any time</option>
                  <option value="morning">Morning (5AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 11PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="price">Price (Low to High)</option>
                  <option value="duration">Duration (Shortest)</option>
                  <option value="departure">Departure Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
              <p className="text-gray-600">{mockFlightResults.length} flights found</p>
            </div>

            <div className="space-y-4">
              {mockFlightResults.map((flight) => (
                <div
                  key={flight.id}
                  className={`bg-white rounded-lg shadow p-6 border-2 ${
                    selectedFlight?.id === flight.id ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="text-center">
                          <div className="font-semibold text-lg">
                            {formatTime(flight.segments[0].departureTime)}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {flight.segments[0].origin.code}
                          </div>
                        </div>

                        <div className="flex-1 min-w-[120px]">
                          <div className="flex items-center">
                            <div className="flex-1 border-t border-gray-300 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white px-2 text-xs text-gray-500">
                                  {formatDuration(flight.segments[0].duration)}
                                  {flight.segments.length > 1 && (
                                    <span className="block mt-1">
                                      + layover {formatDuration(flight.segments[1]?.layoverDuration || 0)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center text-xs text-gray-500 mt-1">
                            {flight.segments[0].airline} • {flight.segments[0].aircraftType}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="font-semibold text-lg">
                            {formatTime(flight.segments[flight.segments.length - 1].arrivalTime)}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {flight.segments[flight.segments.length - 1].destination.code}
                          </div>
                        </div>
                      </div>

                      {flight.segments.length > 1 && (
                        <div className="text-center text-sm text-gray-600 mb-2">
                          Layover in {flight.segments[1].origin.city}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {flight.amenities.map((amenity, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatCurrency(flight.totalPrice, flight.currency)}
                      </div>
                      <div className="text-sm text-gray-600">per person</div>

                      <button
                        onClick={() => handleSelectFlight(flight)}
                        className={`mt-4 px-6 py-2 rounded-md font-medium ${
                          selectedFlight?.id === flight.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {selectedFlight?.id === flight.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedFlight && (
              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Selected Flight</h2>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {selectedFlight.segments[0].origin.city} to {selectedFlight.segments[selectedFlight.segments.length - 1].destination.city}
                    </p>
                    <p className="text-gray-600">
                      {formatDate(selectedFlight.segments[0].departureTime)} • {selectedFlight.segments.length} segment(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(selectedFlight.totalPrice, selectedFlight.currency)}
                    </p>
                    <button
                      onClick={handleContinueBooking}
                      className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                    >
                      Continue Booking
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}