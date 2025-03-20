import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import sectionRoutes from './routes/sectionRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import mpesaRoutes from './routes/payments/mpesaRoutes.js';
import paypalRoutes from './routes/payments/paypalRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant API');
});

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });

app.use('/api/sections', sectionRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payments', mpesaRoutes);
app.use('/api/payments', paypalRoutes)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});