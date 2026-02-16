import prisma from '../config/prisma';
import { LeadStatus, LeadSource } from '@prisma/client';
// Service for managing lead-related operations and feedback.

export class LeadService {
    /**
     * Generates a unique friendly ID like LEAD-0001
     */
    private static async generateFriendlyId(): Promise<string> {
        const lastLead = await (prisma.lead as any).findFirst({
            orderBy: { id: 'desc' },
            select: { id: true }
        });

        const nextNumber = (lastLead?.id || 0) + 1;
        return `LEAD-${nextNumber.toString().padStart(4, '0')}`;
    }

    static async createLead(data: any) {
        // Check if phone already exists
        const existingLead = await (prisma.lead as any).findUnique({
            where: { phone: data.phone }
        });

        if (existingLead) {
            throw new Error(`A lead with phone number ${data.phone} already exists (ID: ${existingLead.friendlyId}).`);
        }

        const friendlyId = await this.generateFriendlyId();

        // Clean data and build searchable customer name
        const customerName = `${data.firstName || ''} ${data.lastName || ''}`.trim();

        // Map frontend source to backend enum based on user selection
        let sourceEnum: LeadSource = LeadSource.WALK_IN;
        const selected = Array.isArray(data.selectedSources) ? data.selectedSources[0] : null;

        if (data.showChannelPartner) {
            sourceEnum = LeadSource.CHANNEL_PARTNER;
        } else if (selected) {
            const socialMedia = ['Facebook', 'Instagram', 'Youtube', 'Reels'];
            const ads = ['Newspaper Ads', 'Billboards', 'Station Hoarding', 'Site Branding', 'Pole Branding'];

            if (socialMedia.includes(selected)) {
                sourceEnum = LeadSource.SOCIAL_MEDIA;
            } else if (selected === 'Google/Website') {
                sourceEnum = LeadSource.GOOGLE;
            } else if (selected === 'Property portal') {
                sourceEnum = LeadSource.PROPERTY_PORTAL;
            } else if (ads.includes(selected)) {
                sourceEnum = LeadSource.ADVERTISEMENT;
            } else if (selected === 'Reference') {
                sourceEnum = LeadSource.REFERRAL;
            } else {
                sourceEnum = LeadSource.OTHER;
            }
        }

        return await (prisma.lead as any).create({
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
                signature: data.signature,
                consent: data.consent ?? true
            }
        });
    }

    static async getLeadByFriendlyId(friendlyId: string) {
        const lead = await (prisma.lead as any).findUnique({
            where: { friendlyId: friendlyId }
        });

        if (!lead) {
            throw new Error('Lead ID not found');
        }

        return lead;
    }

    static async updateToRevisit(friendlyId: string) {
        await this.getLeadByFriendlyId(friendlyId);

        return await (prisma.lead as any).update({
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
        return await (prisma.lead as any).findMany({
            orderBy: { createdAt: 'desc' },
            take: limit,
            select: {
                friendlyId: true,
                customerName: true,
                phone: true,
                source: true,
                sourcesList: true,
                purpose: true,
                createdAt: true,
                status: true
            }
        });
    }

    static async getReceptionistStats() {
        const counts = await (prisma.lead as any).groupBy({
            by: ['status'],
            _count: {
                _all: true
            }
        });

        const visitCount = (counts as any[]).find(c => c.status === LeadStatus.VISIT)?._count._all || 0;
        const revisitCount = (counts as any[]).find(c => c.status === LeadStatus.REVISIT)?._count._all || 0;

        const assignedCount = await (prisma.lead as any).count({
            where: { assignedToId: { not: null } }
        });

        const totalCount = await (prisma.lead as any).count();
        const pendingCount = totalCount - assignedCount;

        return {
            visitCount,
            revisitCount,
            totalVisitsRevisits: visitCount + revisitCount,
            assignedCount,
            pendingCount
        };
    }

    static async searchLeads(query: string) {
        let searchQuery = query.trim();

        // If it's just numbers, try to match it as the numeric part of LEAD-XXXX
        // or just see if the friendlyId contains it.
        // If the user types '0001', we want it to match 'LEAD-0001'
        const isNumeric = /^\d+$/.test(searchQuery);

        const leads = await (prisma.lead as any).findMany({
            where: {
                OR: [
                    { friendlyId: { contains: searchQuery } },
                    ...(isNumeric ? [{ friendlyId: { contains: searchQuery.padStart(4, '0') } }] : []),
                    { customerName: { contains: searchQuery } },
                    { phone: { contains: searchQuery } }
                ]
            },
            take: 10,
            select: {
                friendlyId: true,
                customerName: true,
                phone: true,
                feedbacks: {
                    select: { id: true },
                    take: 1
                }
            }
        });

        return (leads as any[]).map(lead => ({
            friendlyId: lead.friendlyId,
            customerName: lead.customerName,
            phone: lead.phone,
            hasFeedback: lead.feedbacks && lead.feedbacks.length > 0
        }));
    }

    static async saveFeedback(friendlyId: string, feedbackData: any) {
        const lead = await (prisma.lead as any).findUnique({
            where: { friendlyId: friendlyId },
            select: { id: true }
        });

        if (!lead) {
            throw new Error('Lead ID not found');
        }

        return await (prisma as any).feedback.create({
            data: {
                leadId: lead.id,
                onboarding: feedbackData.onboarding,
                staff: feedbackData.staff,
                projectShared: feedbackData.projectShared,
                explanation: feedbackData.explanation,
                overall: feedbackData.overall,
                comment: feedbackData.comment
            }
        });
    }
}
