import prisma from '../config/prisma';
import { LeadStatus, LeadSource } from '@prisma/client';

export class LeadService {
    /**
     * Generates a unique friendly ID like LEAD-0001
     */
    private static async generateFriendlyId(): Promise<string> {
        const lastLead = await prisma.lead.findFirst({
            orderBy: { id: 'desc' },
            select: { id: true }
        });

        const nextNumber = (lastLead?.id || 0) + 1;
        return `LEAD-${nextNumber.toString().padStart(4, '0')}`;
    }

    static async createLead(data: any) {
        // Check if phone already exists
        const existingLead = await prisma.lead.findUnique({
            where: { phone: data.phone }
        });

        if (existingLead) {
            throw new Error(`A lead with phone number ${data.phone} already exists (ID: ${existingLead.friendlyId}).`);
        }

        const friendlyId = await this.generateFriendlyId();

        // Clean data and build searchable customer name
        const customerName = `${data.firstName || ''} ${data.lastName || ''}`.trim();

        // Map frontend source to backend enum
        let sourceEnum: LeadSource = LeadSource.WALK_IN;
        if (data.source && Object.values(LeadSource).includes(data.source)) {
            sourceEnum = data.source as LeadSource;
        }

        return await prisma.lead.create({
            data: {
                friendlyId: friendlyId,
                status: LeadStatus.VISIT,

                // STEP 1: Personal Info
                title: data.title,
                firstName: data.firstName || '',
                middleName: data.middleName,
                lastName: data.lastName || '',
                customerName,
                gender: data.gender,
                age: data.age?.toString(),
                nationality: data.nationality,
                aadhar: data.aadhar,
                email: data.email,
                phone: data.phone,
                maritalStatus: data.maritalStatus,
                dob: data.dob,
                spouseName: data.spouseName,
                spousePhone: data.spousePhone,

                // STEP 2: Contact & Work Info
                residenceType: data.residenceType,
                address: data.address,
                location: data.location,
                subLocation: data.subLocation,
                pinCode: data.pinCode,
                workType: data.workType,
                jobTitle: data.jobTitle,
                orgName: data.orgName,
                companyType: data.companyType,
                businessType: data.businessType,
                yearsInBusiness: data.yearsInBusiness?.toString(),
                fieldOfWork: data.fieldOfWork,
                yearsOfExperience: data.yearsOfExperience?.toString(),
                prevOccupation: data.prevOccupation,
                yearsSinceRetirement: data.yearsSinceRetirement?.toString(),
                department: data.department,
                designation: data.designation,
                yearsOfService: data.yearsOfService?.toString(),

                // STEP 3: Property Details
                purpose: data.purpose,
                config: data.config,
                budget: data.budget,
                possession: data.possession,
                floor: data.floor,
                view: data.view,

                // STEP 4: Feedback & Sources
                source: sourceEnum,
                sourcesList: Array.isArray(data.selectedSources) ? data.selectedSources.join(', ') : null,
                refName: data.refName,
                refContact: data.refContact,
                cpFirm: data.cpFirm,
                cpExec: data.cpExec,
                cpPhone: data.cpPhone,
                signature: data.signature
            }
        });
    }

    static async getLeadByFriendlyId(friendlyId: string) {
        const lead = await prisma.lead.findUnique({
            where: { friendlyId: friendlyId }
        });

        if (!lead) {
            throw new Error('Lead ID not found');
        }

        return lead;
    }

    static async updateToRevisit(friendlyId: string) {
        await this.getLeadByFriendlyId(friendlyId);

        return await prisma.lead.update({
            where: { friendlyId: friendlyId },
            data: {
                status: LeadStatus.REVISIT,
                interactions: {
                    create: {
                        type: 'Revisit',
                        content: 'Customer visited again. Status updated to REVISIT.'
                    }
                }
            }
        });
    }

    static async getRecentLeads(limit: number = 20) {
        return await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
            take: limit,
            select: {
                friendlyId: true,
                customerName: true,
                phone: true,
                source: true,
                purpose: true,
                createdAt: true,
                status: true
            }
        });
    }
}
