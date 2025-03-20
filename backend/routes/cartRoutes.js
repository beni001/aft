import express from 'express';
import { addToCart, getCart, deleteCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/', addToCart);
router.get('/', getCart);
router.delete('/:id', deleteCart);

export default router;