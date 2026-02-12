import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import prisma from '../config/prisma';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Secure password comparison
        const isMatch = await bcrypt.compare(password, user.password);

        // Fallback for initial demo (plain text) - we will update seed soon
        if (!isMatch && password !== user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
};

export const signup = async (req: Request, res: Response) => {
    const { fullName, email, mobile, password, role } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: fullName,
                email,
                phone: mobile,
                password: hashedPassword,
                role: role as Role, // Cast to Enum
            },
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error during signup' });
    }
};
