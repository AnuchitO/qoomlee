import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = Router();
const controller = new PaymentController();

router.post('/intents', controller.createPaymentIntent);
router.post('/:paymentIntentId/process', controller.processPayment);
router.get('/:paymentIntentId', controller.getPaymentStatus);
router.post('/:paymentIntentId/cancel', controller.cancelPayment);

export { router as paymentRouter };