import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';
import cpRoutes from './routes/cpRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

// Standard Middlewares
app.use(cors({
    origin: [
        'http://65.2.39.93:8080',
        'http://localhost:8080',
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:8080',
        'http://127.0.0.1:5173'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/cps', cpRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
