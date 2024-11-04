import mongoose from 'mongoose';
import Section from './Section.js';

const cartSchema = new mongoose.Schema({
  userId: { type: String },
  items: [
    {
      foodItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;