import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';
import cpRoutes from './routes/cpRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

// Dynamic CORS setup to handle any Vercel/localhost origins cleanly
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/cps', cpRoutes);
app.use('/api/admin', adminRoutes);

// Database Seeding Route (Securely seeds Neon DB directly from Vercel)
app.get('/api/seed', async (req, res) => {
    try {
        const { execSync } = await import('child_process');
        
        console.log('Pushing database schema directly from Vercel serverless environment...');
        // Automatically create and sync the database tables in Neon
        execSync('npx prisma db push', { stdio: 'pipe' });
        console.log('Database schema pushed successfully!');

        const { PrismaClient, Role } = await import('@prisma/client');
        const bcrypt = await import('bcryptjs');
        const prisma = new PrismaClient();
        const hashedPassword = await bcrypt.default.hash('1234', 10);

        const users = [
            {
                email: 'recep@gmail.com',
                name: 'Sara',
                password: hashedPassword,
                role: Role.RECEPTIONIST,
            },
            {
                email: 'sales@gmail.com',
                name: 'Priya',
                password: hashedPassword,
                role: Role.SALES_EXECUTIVE,
            },
            {
                email: 'recep2@gmail.com',
                name: 'Sara Ipad',
                password: hashedPassword,
                role: Role.RECEPTIONIST_2,
            }
        ];

        for (const userData of users) {
            await prisma.user.upsert({
                where: { email: userData.email },
                update: {
                    password: userData.password,
                    role: userData.role
                },
                create: userData,
            });
        }

        const projects = [
            { name: 'Skyline Residency', location: 'Vikhroli' },
            { name: 'Green Valley', location: 'Thane' },
            { name: 'Ocean View', location: 'Worli' }
        ];

        for (const projectData of projects) {
            await prisma.project.upsert({
                where: { name: projectData.name },
                update: {},
                create: projectData,
            });
        }

        res.json({ status: 'success', message: '✅ Database schema created and seeded successfully with default users and projects!' });
    } catch (error: any) {
        console.error('Seeding error:', error);
        
        // If the shell command failed, capture the exact output to show on screen
        let details = '';
        if (error.stdout) details += `\nSTDOUT:\n${error.stdout.toString()}`;
        if (error.stderr) details += `\nSTDERR:\n${error.stderr.toString()}`;
        
        res.status(500).json({ 
            status: 'error', 
            error: error.message || error,
            details: details || undefined
        });
    }
});

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
