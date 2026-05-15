import { Request, Response } from 'express';
import { FlightSearchService } from '../services/flightSearch.service';
import Joi from 'joi';

export class FlightSearchController {
  private flightSearchService: FlightSearchService;

  constructor() {
    this.flightSearchService = new FlightSearchService();
  }

  async searchFlights(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const schema = Joi.object({
        origin: Joi.string().required().min(3).max(3),
        destination: Joi.string().required().min(3).max(3),
        departureDate: Joi.string().isoDate().required(),
        returnDate: Joi.string().isoDate().optional(),
        passengers: Joi.object({
          adults: Joi.number().integer().min(1).max(9).required(),
          children: Joi.number().integer().min(0).max(9).required(),
          infants: Joi.number().integer().min(0).max(9).required()
        }).required(),
        cabinClass: Joi.string().valid('economy', 'premium-economy', 'business', 'first').default('economy')
      });

      const { error, value } = schema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details?.[0]?.message || 'Validation error' });
        return;
      }

      const searchParams = value;

      // Check that origin and destination are different
      if (searchParams.origin.toLowerCase() === searchParams.destination.toLowerCase()) {
        res.status(400).json({ error: 'Origin and destination cannot be the same' });
        return;
      }

      // Check that return date is after departure date if provided
      if (searchParams.returnDate && new Date(searchParams.returnDate) < new Date(searchParams.departureDate)) {
        res.status(400).json({ error: 'Return date must be after departure date' });
        return;
      }

      const flights = await this.flightSearchService.searchFlights(searchParams);

      res.status(200).json(flights);
    } catch (error) {
      console.error('Error in searchFlights:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async searchAirports(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string' || q.trim().length < 2) {
        res.status(400).json({ error: 'Query parameter "q" must be at least 2 characters' });
        return;
      }

      const airports = await this.flightSearchService.searchAirports(q.trim());

      res.status(200).json(airports);
    } catch (error) {
      console.error('Error in searchAirports:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}