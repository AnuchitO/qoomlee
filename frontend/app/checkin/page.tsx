'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { checkinService } from '@/services/checkinService';
import { isValidPNR } from '@/utils/validation';

// Define the schema for check-in validation
const checkinSchema = z.object({
  pnr: z.string().refine(isValidPNR, { message: 'Invalid PNR format (6 alphanumeric characters)' }),
  lastName: z.string().min(1, 'Last name is required'),
});

type CheckInFormData = z.infer<typeof checkinSchema>;

export default function CheckInPage() {
  const [checkinStep, setCheckinStep] = useState<'lookup' | 'details' | 'seats' | 'complete'>('lookup');
  const [bookingData, setBookingData] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<Record<string, string>>({}); // passengerId: seatId
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckInFormData>({
    resolver: zodResolver(checkinSchema),
    defaultValues: {
      pnr: '',
      lastName: '',
    },
  });

  const onSubmit = async (data: CheckInFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call to start check-in
      // In a real app, we would call checkinService.startCheckIn(data)

      // Mock response for demo
      const mockResponse = {
        booking: {
          id: 'booking-123',
          pnr: data.pnr,
          passengers: [
            { id: 'passenger-1', firstName: 'John', lastName: data.lastName, seatNumber: '' },
            { id: 'passenger-2', firstName: 'Jane', lastName: data.lastName, seatNumber: '' },
          ],
          itinerary: {
            outbound: {
              flightNumber: 'QL101',
              origin: 'BKK',
              destination: 'SIN',
              departureTime: '2023-10-15T08:30:00',
            },
          },
        },
        eligiblePassengers: [
          { id: 'passenger-1', firstName: 'John', lastName: data.lastName },
          { id: 'passenger-2', firstName: 'Jane', lastName: data.lastName },
        ],
        checkInStatus: 'eligible' as const,
      };

      setBookingData(mockResponse);
      setCheckinStep('details');
    } catch (err: any) {
      setError(err.message || 'Failed to start check-in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSeat = (passengerId: string, seatId: string) => {
    setSelectedSeats(prev => ({
      ...prev,
      [passengerId]: seatId,
    }));
  };

  const handleCompleteCheckIn = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call to complete check-in
      // In a real app, we would call checkinService.completeCheckIn()

      // Mock response for demo
      setTimeout(() => {
        setCheckinStep('complete');
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to complete check-in. Please try again.');
      setLoading(false);
    }
  };

  const renderLookupStep = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Online Check-in</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="pnr" className="block text-sm font-medium text-gray-700 mb-1">
            Booking Reference (PNR) *
          </label>
          <input
            id="pnr"
            {...register('pnr')}
            placeholder="e.g., ABC123"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.pnr ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.pnr && (
            <p className="mt-1 text-sm text-red-600">{errors.pnr.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            id="lastName"
            {...register('lastName')}
            placeholder="e.g., Smith"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {loading ? 'Checking...' : 'Start Check-in'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>You can check in between 48 hours and 45 minutes before departure.</p>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Check-in Details</h2>
        <button
          onClick={() => setCheckinStep('lookup')}
          className="text-blue-600 hover:text-blue-800"
        >
          Change PNR
        </button>
      </div>

      <div className="border-b border-gray-200 pb-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Flight Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Flight</p>
            <p className="font-medium">{bookingData?.booking.itinerary.outbound.flightNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Route</p>
            <p className="font-medium">
              {bookingData?.booking.itinerary.outbound.origin} → {bookingData?.booking.itinerary.outbound.destination}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date & Time</p>
            <p className="font-medium">
              {new Date(bookingData?.booking.itinerary.outbound.departureTime).toLocaleDateString()}
              {' '}at {new Date(bookingData?.booking.itinerary.outbound.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Passengers</h3>
        <div className="space-y-4">
          {bookingData?.eligiblePassengers.map((passenger: any) => (
            <div key={passenger.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div>
                <p className="font-medium">{passenger.firstName} {passenger.lastName}</p>
                <p className="text-sm text-gray-600">Passenger ID: {passenger.id}</p>
              </div>
              <button
                onClick={() => setCheckinStep('seats')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                Select Seat
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCheckinStep('lookup')}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={() => setCheckinStep('seats')}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Select Seats
        </button>
      </div>
    </div>
  );

  const renderSeatsStep = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Select Seats</h2>
        <button
          onClick={() => setCheckinStep('details')}
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Details
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Seats</h3>

        {/* Simplified seat map for demo */}
        <div className="border border-gray-300 rounded-lg p-4 overflow-x-auto">
          <div className="min-w-max">
            {/* Demo seat map */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              {['A', 'B', '', 'C', 'D', 'E'].map((seat, idx) => (
                <div key={idx} className="text-center text-sm font-medium">
                  {seat}
                </div>
              ))}
            </div>

            {Array.from({ length: 20 }, (_, row) => (
              <div key={row} className="grid grid-cols-6 gap-2 mb-2">
                {['A', 'B', '', 'C', 'D', 'E'].map((seatLetter, colIdx) => {
                  if (seatLetter === '') return <div key={colIdx}></div>;

                  const seatId = `${row + 1}${seatLetter}`;
                  const isSelected = Object.values(selectedSeats).includes(seatId);

                  return (
                    <button
                      key={`${row}-${seatLetter}`}
                      onClick={() => {
                        // In a real app, we would associate this seat with a specific passenger
                        // For demo, just toggle the seat
                        handleSelectSeat('passenger-1', seatId);
                      }}
                      className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {seatId}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Seats</h3>
        <div className="space-y-2">
          {Object.entries(selectedSeats).map(([passengerId, seatId]) => (
            <div key={passengerId} className="flex justify-between items-center p-2 bg-blue-50 rounded-md">
              <span>Passenger: {passengerId}</span>
              <span className="font-medium">Seat: {seatId}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCheckinStep('details')}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleCompleteCheckIn}
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white font-medium ${
            loading
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Processing...' : 'Complete Check-in'}
        </button>
      </div>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Check-in Completed!</h2>
        <p className="mt-2 text-gray-600">Your boarding pass has been generated successfully.</p>
      </div>

      <div className="mt-8 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Boarding Pass</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Passenger</p>
            <p className="font-medium">John Smith</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Flight</p>
            <p className="font-medium">QL101</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Route</p>
            <p className="font-medium">BKK → SIN</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date & Time</p>
            <p className="font-medium">
              {new Date(bookingData?.booking.itinerary.outbound.departureTime).toLocaleDateString()}
              {' '}at {new Date(bookingData?.booking.itinerary.outbound.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Seat</p>
            <p className="font-medium">{Object.values(selectedSeats)[0] || 'TBD'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Boarding Pass</p>
            <p className="font-medium text-blue-600 underline cursor-pointer">Download PDF</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Download Boarding Pass
        </button>
        <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Email Boarding Pass
        </button>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => {
            setCheckinStep('lookup');
            setBookingData(null);
            setSelectedSeats({});
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          Check in another flight
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Online Check-in</h1>
          <p className="text-center text-gray-600 mb-8">Check in for your flight and get your boarding pass</p>

          {checkinStep === 'lookup' && renderLookupStep()}
          {checkinStep === 'details' && renderDetailsStep()}
          {checkinStep === 'seats' && renderSeatsStep()}
          {checkinStep === 'complete' && renderCompleteStep()}
        </div>
      </div>
    </div>
  );
}