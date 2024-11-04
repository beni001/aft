import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  id: String,
  name: String,
  foodItems: [
    {
      id: String,
      name: String,
      price: Number,
      image: String,
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
          image: String,
        },
      ],
    },
  ],
});

const Section = mongoose.model('Section', sectionSchema);

export default Section;