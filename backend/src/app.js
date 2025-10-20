import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes.js';
import authRoutes from './routes/authRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

//const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(helmet());
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/applications', applicationRoutes);

// Global error handler
app.use(errorHandler);

export default app;
