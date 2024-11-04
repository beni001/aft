import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Section from './Section.js';
import Cart from './Cart.js';



dotenv.config();
const mongoDbUrl = process.env.MONGODB_URL;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant API');
});

app.get('/api/sections', async (req, res) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sections', async (req, res) => {
  const { id, name, foodItems, subSections } = req.body;
  const newSection = new Section({ id, name, foodItems, subSections });

  try {
    const savedSection = await newSection.save();
    res.json(savedSection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/sections/:id', async (req, res) => {
  try {
    const section = await Section.findOneAndDelete({ id: req.params.id });
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json({ message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cart API Routes
app.post('/api/cart', async (req, res) => {
  const { userId, foodItemId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.foodItemId.toString() === foodItemId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ foodItemId, quantity });
      }
      await cart.save();
    } else {
      const newCart = new Cart({ userId, items: [{ foodItemId, quantity }] });
      await newCart.save();
    }
    res.json({ message: 'Cart updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cart', async (req, res) => {
  const userId = req.query.userId;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await Cart.findOneAndDelete({ userId });
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});