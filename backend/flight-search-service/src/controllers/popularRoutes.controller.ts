import { Request, Response } from 'express';
import { PopularRoutesService } from '../services/popularRoutes.service';

export class PopularRoutesController {
  private popularRoutesService: PopularRoutesService;

  constructor() {
    this.popularRoutesService = new PopularRoutesService();
  }

  async getPopularRoutes(req: Request, res: Response): Promise<void> {
    try {
      const routes = await this.popularRoutesService.getPopularRoutes();

      res.status(200).json(routes);
    } catch (error) {
      console.error('Error in getPopularRoutes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}