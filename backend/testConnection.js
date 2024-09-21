import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000, // Increase timeout to 10s
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
  .then(() => {
    console.log('MongoDB connected');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });