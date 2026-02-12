import prisma from '../config/prisma';

export class ChannelPartnerService {
    static async createCP(data: { cpName: string; firmName: string; phone: string; email?: string }) {
        // Check if phone already exists
        const existingCP = await prisma.channelPartner.findUnique({
            where: { phone: data.phone }
        });

        if (existingCP) {
            throw new Error(`A Channel Partner with phone ${data.phone} is already registered.`);
        }

        return await prisma.channelPartner.create({
            data: {
                cpName: data.cpName,
                firmName: data.firmName,
                phone: data.phone,
                email: data.email
            }
        });
    }

    static async getAllCPs() {
        return await prisma.channelPartner.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
}
