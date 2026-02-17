import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';
import jwt from 'jsonwebtoken';

// Hardcoded admin credentials as per requirement
const ADMIN_EMAIL = 'test@gmail.com';
const ADMIN_PASSWORD = '1234';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Generate JWT for the admin session
        const token = jwt.sign(
            { role: 'ADMIN', email: ADMIN_EMAIL },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Set HttpOnly Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to false for HTTP deployment; change to true for HTTPS
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.json({
            success: true,
            message: 'Admin login successful',
            user: {
                email: ADMIN_EMAIL,
                role: 'ADMIN',
                name: 'System Admin'
            }
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
    });
};

export const getAllLeads = async (req: Request, res: Response) => {
    try {
        const leads = await AdminService.getAllLeads();
        res.json(leads);
    } catch (error: any) {
        console.error('Admin Fetch Leads Error:', error);
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
};

export const getLeadDetails = async (req: Request, res: Response) => {
    try {
        const { friendlyId } = req.params;
        const lead = await AdminService.getLeadDetails(friendlyId as string);
        res.json(lead);
    } catch (error: any) {
        console.error('Admin Fetch Lead Details Error:', error);
        res.status(404).json({ error: error.message });
    }
};

export const deleteLead = async (req: Request, res: Response) => {
    try {
        const { friendlyId } = req.params;
        await AdminService.deleteLead(friendlyId as string);
        res.json({ message: 'Lead deleted successfully' });
    } catch (error: any) {
        console.error('Admin Delete Lead Error:', error);
        res.status(500).json({ error: error.message || 'Failed to delete lead' });
    }
};
