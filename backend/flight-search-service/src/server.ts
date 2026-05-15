import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { flightSearchRouter } from './routes/flightSearch.routes';
import { popularRoutesRouter } from './routes/popularRoutes.routes';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/flights', flightSearchRouter);
app.use('/api/v1/flights', popularRoutesRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Flight Search Service is running on port ${PORT}`);
});

export { app };