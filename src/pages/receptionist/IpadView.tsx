import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Building2, Handshake, RefreshCw, Tag } from 'lucide-react';
import megaplexLogo from '@/assets/megaplex-logo.png';
import { ReceptionistActionCard } from '@/components/dashboard/receptionist/ReceptionistActionCard';
import { PreTagCustomerModal } from '@/components/dashboard/receptionist/PreTagCustomerModal';
import { AddChannelPartnerModal } from '@/components/dashboard/receptionist/AddChannelPartnerModal';
import { AddRevisitModal } from '@/components/dashboard/receptionist/AddRevisitModal';
import { FeedbackFormModal } from '@/components/dashboard/receptionist/FeedbackFormModal';
import { IpadSearch } from '@/components/dashboard/receptionist/IpadSearch';

/**
 * IpadView Component
 * 
 * A simplified, touch-friendly dashboard view for iPad users (field agents/receptionists).
 * Features:
 * - Large Action Cards for quick access
 * - Central Search Bar with Dropdown (IpadSearch)
 * - Modal integrations for various actions
 */
const IpadView: React.FC = () => {
    const navigate = useNavigate();

    // Modal Control States
    const [isPreTagModalOpen, setIsPreTagModalOpen] = useState(false);
    const [isAddCPModalOpen, setIsAddCPModalOpen] = useState(false);
    const [isAddRevisitModalOpen, setIsAddRevisitModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<{ friendlyId: string, customerName: string } | null>(null);

    // Shared styling for the large icons on action cards
    const iconStyle = {
        width: '115.54px',
        height: '98.46px',
        top: '23.17px',
        left: '11.58px'
    };

    const handleGiveFeedback = (lead: { friendlyId: string, customerName: string }) => {
        setSelectedLead(lead);
        setIsFeedbackModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="bg-[#4A1D59] p-4 shadow-md">
                <div className="w-full px-6">
                    {/* <img src={megaplexLogo} alt="Megaplex Prime" className="h-10 object-contain" /> */}
                </div>
            </header>

            <main className="flex-1 w-full px-6 py-6 mx-auto xl:container">
                {/* Search Bar Component */}
                <IpadSearch onGiveFeedback={handleGiveFeedback} />

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                    <ReceptionistActionCard
                        title={<>Add New<br />Lead</>}
                        subtitle="Create a new customer enquiry"
                        background="linear-gradient(143.67deg, #E6FAFF 6.65%, #75E1FF 75.68%)"
                        circle1Color="#C0F1FFB2"
                        circle2Color="#D9F7FFB2"
                        onClick={() => navigate('/receptionist/new-lead')}
                        icon={
                            <UserPlus
                                className="text-foreground/80 absolute"
                                strokeWidth={1.5}
                                style={iconStyle}
                            />
                        }
                    />

                    <ReceptionistActionCard
                        title={<>Add<br />Revisits</>}
                        subtitle="Log a revisit"
                        background="linear-gradient(135.97deg, #F2F1FF 11.63%, #D0CDFF 40.38%)"
                        circle1Color="#DBD9FF"
                        circle2Color="#EDECFFB2"
                        onClick={() => setIsAddRevisitModalOpen(true)}
                        icon={
                            <div className="absolute" style={iconStyle}>
                                <div className="relative w-full h-full">
                                    <Building2 className="w-full h-full text-foreground/80" strokeWidth={1.5} />
                                    <div className="absolute -bottom-2 -right-2 bg-foreground/10 rounded-full p-2">
                                        <RefreshCw className="w-6 h-6 text-foreground" />
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    <ReceptionistActionCard
                        title={<>Add<br />CP's</>}
                        subtitle="Add a channel partner"
                        background="linear-gradient(145.45deg, #FFEAE9 9.73%, #FFBCBB 43.49%)"
                        circle1Color="#FFD0D0"
                        circle2Color="#FFEEEEB2"
                        onClick={() => setIsAddCPModalOpen(true)}
                        icon={
                            <Handshake
                                className="text-foreground/80 absolute"
                                strokeWidth={1.5}
                                style={iconStyle}
                            />
                        }
                    />

                    <ReceptionistActionCard
                        title={<>Add<br />Tagging</>}
                        subtitle="Assign a visitor tag"
                        background="linear-gradient(148.52deg, #F0FFFA 13.94%, #B3FCE3 47.73%)"
                        circle1Color="#DDFFF3"
                        circle2Color="#F8FFFDB2"
                        onClick={() => setIsPreTagModalOpen(true)}
                        icon={
                            <Tag
                                className="text-foreground/80 absolute"
                                strokeWidth={1.5}
                                style={iconStyle}
                            />
                        }
                    />
                </div>
            </main>

            {/* Modal Components */}
            <PreTagCustomerModal open={isPreTagModalOpen} onOpenChange={setIsPreTagModalOpen} />
            <AddChannelPartnerModal open={isAddCPModalOpen} onOpenChange={setIsAddCPModalOpen} />
            <AddRevisitModal open={isAddRevisitModalOpen} onOpenChange={setIsAddRevisitModalOpen} />
            <FeedbackFormModal
                open={isFeedbackModalOpen}
                onOpenChange={setIsFeedbackModalOpen}
                customerName={selectedLead?.customerName}
                friendlyId={selectedLead?.friendlyId}
            />
        </div>
    );
};

export default IpadView;
