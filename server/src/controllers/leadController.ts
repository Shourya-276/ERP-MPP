import { Request, Response } from 'express';
import { LeadService } from '../services/leadService';

export const createLead = async (req: Request, res: Response) => {
    try {
        const lead = await LeadService.createLead(req.body);
        res.status(201).json({
            message: 'Lead created successfully',
            lead
        });
    } catch (error: any) {
        console.error('Create lead error:', error);
        res.status(400).json({ error: error.message || 'Failed to create lead' });
    }
};

export const getLeadByFriendlyId = async (req: Request, res: Response) => {
    const { friendlyId } = req.params;
    try {
        const lead = await LeadService.getLeadByFriendlyId(friendlyId as string);
        res.json(lead);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};

export const updateToRevisit = async (req: Request, res: Response) => {
    const { friendlyId } = req.params;
    try {
        const lead = await LeadService.updateToRevisit(friendlyId as string);
        res.json({
            message: 'Lead updated to Revisit status',
            lead
        });
    } catch (error: any) {
        console.error('Revisit update error:', error);
        const status = error.message === 'Lead ID not found' ? 404 : 400;
        res.status(status).json({ error: error.message });
    }
};

export const getRecentLeads = async (req: Request, res: Response) => {
    try {
        const leads = await LeadService.getRecentLeads(20);
        res.json(leads);
    } catch (error: any) {
        console.error('Fetch recent leads error:', error);
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
};
