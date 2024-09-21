import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000, // Increase timeout to 10s
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const sectionSchema = new mongoose.Schema({
  id: String,
  name: String,
  foodItems: [
    {
      id: String,
      name: String,
      price: Number,
      image: String, // URL to the image
    },
  ],
  subSections: [
    {
      id: String,
      name: String,
      foodItems: [
        {
          id: String,
          name: String,
          price: Number,
          image: String, // URL to the image
        },
      ],
    },
  ],
});

const Section = mongoose.model('Section', sectionSchema);

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});