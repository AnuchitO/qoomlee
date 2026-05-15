import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import Joi from 'joi';

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async createPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const schema = Joi.object({
        amount: Joi.number().positive().required(),
        currency: Joi.string().length(3).uppercase().default('USD'),
        bookingId: Joi.string().required()
      });

      const { error, value } = schema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details?.[0]?.message || 'Validation error' });
        return;
      }

      const paymentIntent = await this.paymentService.createPaymentIntent(value.amount, value.currency, value.bookingId);

      res.status(201).json(paymentIntent);
    } catch (error) {
      console.error('Error in createPaymentIntent:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async processPayment(req: Request, res: Response): Promise<void> {
    try {
      const { paymentIntentId } = req.params;

      // Validate paymentIntentId
      if (!paymentIntentId) {
        res.status(400).json({ error: 'Payment intent ID is required' });
        return;
      }

      // Validate request body
      const schema = Joi.object({
        cardNumber: Joi.string().required().pattern(/^[\d\s-]+$/).min(13).max(19),
        expiryMonth: Joi.string().required().pattern(/^\d{2}$/),
        expiryYear: Joi.string().required().pattern(/^\d{2}$/),
        cvv: Joi.string().required().pattern(/^\d{3,4}$/),
        cardholderName: Joi.string().required().min(1),
        billingAddress: Joi.object({
          street: Joi.string().required(),
          city: Joi.string().required(),
          state: Joi.string().required(),
          zipCode: Joi.string().required(),
          country: Joi.string().required()
        }).required()
      });

      const { error, value } = schema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details?.[0]?.message || 'Validation error' });
        return;
      }

      const paymentResult = await this.paymentService.processPayment(paymentIntentId, {
        ...value,
        cardholderName: value.cardholderName || '',
        billingAddress: {
          ...value.billingAddress,
          street: value.billingAddress.street || '',
          city: value.billingAddress.city || '',
          state: value.billingAddress.state || '',
          zipCode: value.billingAddress.zipCode || '',
          country: value.billingAddress.country || ''
        }
      });

      res.status(200).json(paymentResult);
    } catch (error) {
      console.error('Error in processPayment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getPaymentStatus(req: Request, res: Response): Promise<void> {
    try {
      const { paymentIntentId } = req.params;

      if (!paymentIntentId) {
        res.status(400).json({ error: 'Payment intent ID is required' });
        return;
      }

      const paymentStatus = await this.paymentService.getPaymentStatus(paymentIntentId);

      if (!paymentStatus) {
        res.status(404).json({ error: 'Payment intent not found' });
        return;
      }

      res.status(200).json(paymentStatus);
    } catch (error) {
      console.error('Error in getPaymentStatus:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async cancelPayment(req: Request, res: Response): Promise<void> {
    try {
      const { paymentIntentId } = req.params;

      if (!paymentIntentId) {
        res.status(400).json({ error: 'Payment intent ID is required' });
        return;
      }

      const paymentResult = await this.paymentService.cancelPayment(paymentIntentId);

      if (!paymentResult) {
        res.status(404).json({ error: 'Payment intent not found' });
        return;
      }

      res.status(200).json(paymentResult);
    } catch (error) {
      console.error('Error in cancelPayment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}