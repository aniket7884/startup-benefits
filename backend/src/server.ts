import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import claimRoutes from './routes/claimRoutes';

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/claims', claimRoutes);

app.get('/', (req, res) => {
  res.send('API running...');
});

// DATABASE
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB Connected'))
  .catch(console.log);

// SERVER
app.listen(5000, () => {
  console.log('Server running on 5000');
});
