import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
// Prevent OverwriteModelError in Serverless environments
const MailingList = mongoose.models.Mailing_list || mongoose.model('Mailing_list', mailingListSchema, 'Mailing_list');

// Maintain connection state for Serverless
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    throw new Error('Database configuration missing');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// API Routes
app.post('/api/waitlist', async (req, res) => {
  try {
    // Ensure database is connected before saving
    await connectDB();
    
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const newEntry = new MailingList({ email });
    await newEntry.save();
    
    res.status(201).json({ message: 'Successfully joined the waitlist' });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ error: error.message || 'Internal server error', stack: error.stack });
  }
});

if (process.env.NODE_ENV !== 'production') {
  // Connect immediately in local development
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(console.error);
}

export default app;
