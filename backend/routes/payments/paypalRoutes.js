import express from 'express';
import { createPayPalOrder, capturePayPalOrder } from '../../controllers/payments/paypalController.js';

const router = express.Router();

router.post('/paypal/create', createPayPalOrder);
router.post('/paypal/capture', capturePayPalOrder);

export default router;