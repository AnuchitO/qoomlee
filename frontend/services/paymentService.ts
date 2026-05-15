import apiClient from './api';
import { PaymentDetails, PaymentIntent } from '@/types';

export const paymentService = {
  // Create a payment intent
  createPaymentIntent: async (amount: number, currency: string, bookingId: string): Promise<PaymentIntent> => {
    const response = await apiClient.post('/payments/intents', {
      amount,
      currency,
      bookingId,
    });
    return response.data;
  },

  // Process a payment
  processPayment: async (paymentIntentId: string, paymentDetails: PaymentDetails): Promise<PaymentIntent> => {
    const response = await apiClient.post(`/payments/${paymentIntentId}/process`, paymentDetails);
    return response.data;
  },

  // Verify payment status
  verifyPayment: async (paymentIntentId: string): Promise<PaymentIntent> => {
    const response = await apiClient.get(`/payments/${paymentIntentId}`);
    return response.data;
  },

  // Cancel a payment
  cancelPayment: async (paymentIntentId: string): Promise<PaymentIntent> => {
    const response = await apiClient.post(`/payments/${paymentIntentId}/cancel`);
    return response.data;
  },

  // Get payment methods for a user
  getUserPaymentMethods: async (userId: string): Promise<any[]> => {
    const response = await apiClient.get(`/users/${userId}/payment-methods`);
    return response.data;
  },

  // Save a payment method for future use
  savePaymentMethod: async (userId: string, paymentDetails: PaymentDetails): Promise<any> => {
    const response = await apiClient.post(`/users/${userId}/payment-methods`, paymentDetails);
    return response.data;
  },
};