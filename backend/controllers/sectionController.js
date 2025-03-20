import Section from '../models/Section.js';

export const getSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addSection = async (req, res) => {
  const { id, name, foodItems, subSections } = req.body;
  const newSection = new Section({ id, name, foodItems, subSections });

  try {
    const savedSection = await newSection.save();
    res.json(savedSection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const section = await Section.findOneAndDelete({ id: req.params.id });
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json({ message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};