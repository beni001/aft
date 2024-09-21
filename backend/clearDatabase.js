import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000, // Increase timeout to 10s
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
  .then(() => {
    console.log('MongoDB connected');
    return mongoose.connection.db.dropCollection('sections');
  })
  .then(() => {
    console.log('Sections collection removed');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error removing sections collection:', err);
    mongoose.connection.close();
  });
