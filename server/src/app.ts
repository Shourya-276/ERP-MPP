import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';
import cpRoutes from './routes/cpRoutes';

const app = express();

// Standard Middlewares
app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/cps', cpRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
