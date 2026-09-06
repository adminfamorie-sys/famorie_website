import mongoose from 'mongoose';

// Connect to MongoDB
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing in environment variables');
  }
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log('Connected to MongoDB in serverless function');
};

// Define Schema
const mailingListSchema = new mongoose.Schema({
  email: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now }
});

// Prevent OverwriteModelError in Serverless environments
const MailingList = mongoose.models.Mailing_list || mongoose.model('Mailing_list', mailingListSchema, 'Mailing_list');

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ensure it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connectDB();
    
    // In Vercel, req.body is already parsed if it's JSON
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const newEntry = new MailingList({ email });
    await newEntry.save();
    
    return res.status(201).json({ message: 'Successfully joined the waitlist' });
  } catch (error) {
    console.error('Error in waitlist function:', error);
    return res.status(500).json({ error: error.message || 'Internal server error', stack: error.stack });
  }
}
