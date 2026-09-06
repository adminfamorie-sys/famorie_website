import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import waitlistHandler from './api/waitlist.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route local dev requests to the serverless handler
app.post('/api/waitlist', async (req, res) => {
  await waitlistHandler(req, res);
});

app.listen(PORT, () => {
  console.log(`Local development server running on port ${PORT}`);
});
