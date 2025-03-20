import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
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
};

export const getCart = async (req, res) => {
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
};

export const deleteCart = async (req, res) => {
  const userId = req.params.id;
  try {
    await Cart.findOneAndDelete({ userId });
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
