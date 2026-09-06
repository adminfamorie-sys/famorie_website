import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const mailingListSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  }
});

// Explicitly setting collection name to 'Mailing_list' as requested
const MailingList = mongoose.model('Mailing_list', mailingListSchema, 'Mailing_list');

// API Routes
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const newEntry = new MailingList({ email });
    await newEntry.save();
    
    res.status(201).json({ message: 'Successfully joined the waitlist' });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
