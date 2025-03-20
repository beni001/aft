import express from 'express';
import { initiateMpesaPayment } from '../../controllers/payments/mpesaController.js';

const router = express.Router();

router.post('/mpesa', initiateMpesaPayment);

export default router;