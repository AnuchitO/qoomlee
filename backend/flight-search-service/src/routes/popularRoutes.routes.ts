import { Router } from 'express';
import { PopularRoutesController } from '../controllers/popularRoutes.controller';

const router = Router();
const controller = new PopularRoutesController();

router.get('/popular-routes', (req, res) => controller.getPopularRoutes(req, res));

export { router as popularRoutesRouter };