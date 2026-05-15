import Stripe from 'stripe';

export interface PaymentDetails {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'created' | 'processing' | 'succeeded' | 'failed';
  paymentMethod?: string;
  bookingId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PaymentService {
  private stripe: Stripe;
  private omise: any;

  constructor() {
    // Initialize payment providers
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
      apiVersion: '2023-10-16',
    });

    // Dynamically initialize Omise to avoid TypeScript issues
    this.initializeOmise();
  }

  private initializeOmise(): void {
    try {
      // Dynamically import Omise
      const omiseModule = require('omise');
      this.omise = omiseModule.default({
        publicKey: process.env.OMISE_PUBLIC_KEY || 'pkey_test_placeholder',
        secretKey: process.env.OMISE_SECRET_KEY || 'skey_test_placeholder',
      });
    } catch (error) {
      console.warn('Omise module not available:', error);
      this.omise = null;
    }
  }

  async createPaymentIntent(amount: number, currency: string, bookingId: string): Promise<PaymentIntent> {
    try {
      // In a real implementation, we would create a payment intent with the payment provider
      // For now, we'll create a mock payment intent

      const paymentIntent: PaymentIntent = {
        id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Generate a mock ID
        amount,
        currency,
        status: 'created',
        bookingId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Store in a mock database (in real app, use a real database)
      // For demo purposes, we'll just return the mock object

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async processPayment(paymentIntentId: string, paymentDetails: PaymentDetails): Promise<PaymentIntent> {
    try {
      // Validate card details
      if (!this.isValidCardNumber(paymentDetails.cardNumber)) {
        throw new Error('Invalid card number');
      }

      if (!this.isValidExpiryDate(paymentDetails.expiryMonth, paymentDetails.expiryYear)) {
        throw new Error('Invalid expiry date');
      }

      if (!this.isValidCVV(paymentDetails.cvv)) {
        throw new Error('Invalid CVV');
      }

      // In a real implementation, we would process the payment with the payment provider
      // For now, we'll simulate a successful payment

      // Mock updating the payment intent status
      const paymentIntent: PaymentIntent = {
        id: paymentIntentId,
        amount: 45000, // This would come from the stored payment intent
        currency: 'USD',
        status: 'processing',
        bookingId: 'booking_123', // This would come from the stored payment intent
        createdAt: new Date(Date.now() - 10000), // 10 seconds ago
        updatedAt: new Date(),
      };

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update status to succeeded
      paymentIntent.status = 'succeeded';
      paymentIntent.updatedAt = new Date();

      return paymentIntent;
    } catch (error) {
      console.error('Error processing payment:', error);

      // In a real app, we would update the payment intent to failed status
      const paymentIntent: PaymentIntent = {
        id: paymentIntentId,
        amount: 45000, // This would come from the stored payment intent
        currency: 'USD',
        status: 'failed',
        bookingId: 'booking_123', // This would come from the stored payment intent
        createdAt: new Date(Date.now() - 10000), // 10 seconds ago
        updatedAt: new Date(),
      };

      return paymentIntent;
    }
  }

  async getPaymentStatus(paymentIntentId: string): Promise<PaymentIntent | null> {
    try {
      // In a real implementation, we would fetch the payment intent from the payment provider
      // For now, we'll return a mock payment intent

      // This would normally fetch from database
      const paymentIntent: PaymentIntent = {
        id: paymentIntentId,
        amount: 45000,
        currency: 'USD',
        status: 'succeeded', // Could be different based on actual status
        bookingId: 'booking_123',
        createdAt: new Date(Date.now() - 60000), // 1 minute ago
        updatedAt: new Date(),
      };

      return paymentIntent;
    } catch (error) {
      console.error('Error getting payment status:', error);
      return null;
    }
  }

  async cancelPayment(paymentIntentId: string): Promise<PaymentIntent | null> {
    try {
      // In a real implementation, we would cancel the payment intent with the payment provider
      // For now, we'll return a mock canceled payment intent

      // This would normally fetch from database first, then update
      const paymentIntent: PaymentIntent = {
        id: paymentIntentId,
        amount: 45000,
        currency: 'USD',
        status: 'failed', // Canceling sets status to failed
        bookingId: 'booking_123',
        createdAt: new Date(Date.now() - 120000), // 2 minutes ago
        updatedAt: new Date(),
      };

      return paymentIntent;
    } catch (error) {
      console.error('Error canceling payment:', error);
      return null;
    }
  }

  private isValidCardNumber(cardNumber?: string): boolean {
    // Handle undefined input
    if (!cardNumber) {
      return false;
    }

    // Remove spaces and hyphens
    const cleanedCardNumber = cardNumber.replace(/[\s-]/g, '');

    // Basic length check (most cards are 13-19 digits)
    if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
      return false;
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;

    for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
      const char = cleanedCardNumber[i];
      if (!char) continue; // Skip if character is undefined

      let digit = parseInt(char, 10);
      if (isNaN(digit)) continue; // Skip if not a number

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  private isValidExpiryDate(month?: string, year?: string): boolean {
    if (!month || !year) return false;

    const currentYear = new Date().getFullYear() % 100; // Get last 2 digits
    const currentMonth = new Date().getMonth() + 1; // Month is 0-indexed

    const expYear = parseInt(year, 10);
    const expMonth = parseInt(month, 10);

    // Basic checks
    if (isNaN(expYear) || isNaN(expMonth)) return false;
    if (expMonth < 1 || expMonth > 12) return false;

    // Check if the card is expired
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
  }

  private isValidCVV(cvv?: string): boolean {
    if (!cvv) return false;

    const cvvRegex = /^\d{3,4}$/; // Most cards have 3-digit CVV, American Express has 4
    return cvvRegex.test(cvv);
  }
}