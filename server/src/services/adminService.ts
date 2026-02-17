import prisma from '../config/prisma';

export class AdminService {
    static async getAllLeads() {
        return await (prisma.lead as any).findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                friendlyId: true,
                customerName: true,
                phone: true,
                source: true,
                purpose: true,
                createdAt: true,
            }
        });
    }

    static async getLeadDetails(friendlyId: string) {
        const lead = await (prisma.lead as any).findUnique({
            where: { friendlyId },
            include: {
                feedbacks: true,
                interactions: true
            }
        });

        if (!lead) {
            throw new Error('Lead not found');
        }

        return lead;
    }

    static async deleteLead(friendlyId: string) {
        // First get the lead to ensure it exists and get its internal ID
        const lead = await (prisma.lead as any).findUnique({
            where: { friendlyId },
            select: { id: true }
        });

        if (!lead) {
            throw new Error('Lead not found');
        }

        // Use a transaction to ensure all related records and the lead are deleted together
        return await (prisma as any).$transaction([
            (prisma as any).feedback.deleteMany({
                where: { leadId: lead.id }
            }),
            (prisma as any).interaction.deleteMany({
                where: { leadId: lead.id }
            }),
            (prisma.lead as any).delete({
                where: { friendlyId }
            })
        ]);
    }
}
