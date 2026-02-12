import { Request, Response } from 'express';
import { ChannelPartnerService } from '../services/cpService';

export const createCP = async (req: Request, res: Response) => {
    try {
        const cp = await ChannelPartnerService.createCP(req.body);
        res.status(201).json({
            message: 'Channel Partner registered successfully',
            cp
        });
    } catch (error: any) {
        console.error('Create CP error:', error);
        res.status(400).json({ error: error.message || 'Failed to register Channel Partner' });
    }
};

export const getAllCPs = async (req: Request, res: Response) => {
    try {
        const cps = await ChannelPartnerService.getAllCPs();
        res.json(cps);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch Channel Partners' });
    }
};
