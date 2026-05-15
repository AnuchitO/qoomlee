'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Passenger, ContactInfo } from '@/types';
import { isValidEmail, isValidPhoneNumber } from '@/utils/validation';

// Define the schema for passenger validation
const passengerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().refine(date => new Date(date) <= new Date(new Date().setFullYear(new Date().getFullYear() - 1)), {
    message: 'Passenger must be at least 1 year old',
  }),
  gender: z.enum(['male', 'female', 'other']),
  contactInfo: z.object({
    email: z.string().refine(isValidEmail, { message: 'Invalid email address' }),
    phone: z.string().refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
    countryCode: z.string().min(1, 'Country code is required'),
  }),
  specialAssistance: z.string().optional(),
});

type PassengerFormData = z.infer<typeof passengerSchema>;

export default function BookingPage() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);
  const [bookingStep, setBookingStep] = useState<'passenger-details' | 'review' | 'payment'>('passenger-details');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PassengerFormData>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'male',
      contactInfo: {
        email: '',
        phone: '',
        countryCode: '+1',
      },
      specialAssistance: '',
    },
  });

  const addPassenger = (data: PassengerFormData) => {
    const newPassenger: Passenger = {
      id: `passenger-${Date.now()}`,
      ...data,
      nationality: 'US', // Default for demo
    };

    const updatedPassengers = [...passengers];
    updatedPassengers[currentPassengerIndex] = newPassenger;
    setPassengers(updatedPassengers);

    // Move to next passenger or to review step
    if (currentPassengerIndex < 2) { // Assuming max 3 passengers for demo
      setCurrentPassengerIndex(currentPassengerIndex + 1);
      reset(); // Reset form for next passenger
    } else {
      setBookingStep('review');
    }
  };

  const removePassenger = (index: number) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);

    if (currentPassengerIndex >= updatedPassengers.length && updatedPassengers.length > 0) {
      setCurrentPassengerIndex(updatedPassengers.length - 1);
    } else if (updatedPassengers.length === 0) {
      setCurrentPassengerIndex(0);
    }
  };

  const renderPassengerForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Passenger {currentPassengerIndex + 1} Details
        </h2>
        <span className="text-gray-600">
          {currentPassengerIndex + 1} of {Math.max(passengers.length, currentPassengerIndex + 1)}
        </span>
      </div>

      <form onSubmit={handleSubmit(addPassenger)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              id="firstName"
              {...register('firstName')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              id="lastName"
              {...register('lastName')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              id="gender"
              {...register('gender')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register('contactInfo.email')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.contactInfo?.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.contactInfo?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.contactInfo.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 mb-1">
              Country Code *
            </label>
            <select
              id="countryCode"
              {...register('contactInfo.countryCode')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="+1">United States (+1)</option>
              <option value="+66">Thailand (+66)</option>
              <option value="+65">Singapore (+65)</option>
              <option value="+81">Japan (+81)</option>
              <option value="+852">Hong Kong (+852)</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              {...register('contactInfo.phone')}
              placeholder="123-456-7890"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.contactInfo?.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.contactInfo?.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.contactInfo.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="specialAssistance" className="block text-sm font-medium text-gray-700 mb-1">
            Special Assistance (Optional)
          </label>
          <textarea
            id="specialAssistance"
            {...register('specialAssistance')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Wheelchair assistance, dietary requirements, etc."
          ></textarea>
        </div>

        <div className="flex justify-between pt-4">
          {currentPassengerIndex > 0 && (
            <button
              type="button"
              onClick={() => {
                setCurrentPassengerIndex(currentPassengerIndex - 1);
                reset(); // Reset form when going back
              }}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
          )}

          <button
            type="submit"
            className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {currentPassengerIndex < 2 ? 'Add Another Passenger' : 'Continue to Review'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderReviewStep = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Booking</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Passenger Information</h3>
        {passengers.map((passenger, index) => (
          <div key={passenger.id} className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">
                  Passenger {index + 1}: {passenger.firstName} {passenger.lastName}
                </h4>
                <p className="text-gray-600 text-sm">
                  DOB: {new Date(passenger.dateOfBirth).toLocaleDateString()} • {passenger.gender}
                </p>
                <p className="text-gray-600 text-sm">
                  {passenger.contactInfo.email} • {passenger.contactInfo.countryCode} {passenger.contactInfo.phone}
                </p>
                {passenger.specialAssistance && (
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium">Special assistance:</span> {passenger.specialAssistance}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removePassenger(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              setBookingStep('passenger-details');
              setCurrentPassengerIndex(passengers.length > 0 ? passengers.length - 1 : 0);
            }}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back to Details
          </button>
          <button
            type="button"
            onClick={() => setBookingStep('payment')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h2>

      <div className="border-b border-gray-200 pb-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Booking Summary</h3>
        <div className="flex justify-between">
          <span className="text-gray-600">Passengers ({passengers.length})</span>
          <span className="font-medium">$450 × {passengers.length}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Taxes & Fees</span>
          <span className="font-medium">$120</span>
        </div>
        <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 font-bold">
          <span>Total Amount</span>
          <span>${(450 * passengers.length + 120).toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Method</h3>
        <div className="space-y-4">
          <div className="border border-gray-300 rounded-md p-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="credit-card"
                name="payment-method"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                Credit Card
              </label>
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="paypal"
                name="payment-method"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                PayPal
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            id="card-number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiry-date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM/YY"
            />
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123"
            />
          </div>
        </div>

        <div>
          <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
            Name on Card
          </label>
          <input
            type="text"
            id="card-name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setBookingStep('review')}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back to Review
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Complete Booking
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Complete Your Booking</h1>
          <div className="flex justify-center">
            <div className="flex space-x-4">
              <button
                onClick={() => setBookingStep('passenger-details')}
                className={`px-4 py-2 rounded-md ${
                  bookingStep === 'passenger-details'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Passenger Details
              </button>
              <button
                onClick={() => setBookingStep('review')}
                className={`px-4 py-2 rounded-md ${
                  bookingStep === 'review'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Review
              </button>
              <button
                onClick={() => setBookingStep('payment')}
                className={`px-4 py-2 rounded-md ${
                  bookingStep === 'payment'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Payment
              </button>
            </div>
          </div>
        </div>

        {bookingStep === 'passenger-details' && renderPassengerForm()}
        {bookingStep === 'review' && renderReviewStep()}
        {bookingStep === 'payment' && renderPaymentStep()}
      </div>
    </div>
  );
}