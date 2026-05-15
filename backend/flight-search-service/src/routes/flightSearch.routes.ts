import { Router } from 'express';
import { FlightSearchController } from '../controllers/flightSearch.controller';

const router = Router();
const controller = new FlightSearchController();

router.post('/search', (req, res) => controller.searchFlights(req, res));
router.get('/airports/search', (req, res) => controller.searchAirports(req, res));

export { router as flightSearchRouter };