import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Building2, Handshake, RefreshCw, Tag } from 'lucide-react';
import megaplexLogo from '@/assets/megaplex-logo.png';
import { Input } from '@/components/ui/input';
import { ReceptionistActionCard } from '@/components/dashboard/receptionist/ReceptionistActionCard';
import { PreTagCustomerModal } from '@/components/dashboard/receptionist/PreTagCustomerModal';
import { AddChannelPartnerModal } from '@/components/dashboard/receptionist/AddChannelPartnerModal';
import { AddRevisitModal } from '@/components/dashboard/receptionist/AddRevisitModal';
import { FeedbackFormModal } from '@/components/dashboard/receptionist/FeedbackFormModal';

const ReceptionistDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isPreTagModalOpen, setIsPreTagModalOpen] = useState(false);
    const [isAddCPModalOpen, setIsAddCPModalOpen] = useState(false);
    const [isAddRevisitModalOpen, setIsAddRevisitModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Shared icon position/size style
    const iconStyle = {
        width: '115.54px',
        height: '98.46px',
        top: '23.17px',
        left: '11.58px'
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="bg-[#4A1D59] p-4 shadow-md">
                <div className="container mx-auto">
                    <img src={megaplexLogo} alt="Megaplex Prime" className="h-12 object-contain" />
                </div>
            </header>

            <main className="flex-1 p-6 container mx-auto max-w-5xl">
                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                        className="w-full h-14 pl-12 bg-[#F3E8FF] border-none text-lg placeholder:text-muted-foreground/70 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Search by Unique ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Search Results Dropdown */}
                    {searchQuery && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 p-2">
                            {/* Mock results matching the image */}
                            {[
                                { id: 'ID-023', name: 'Pooja Jain', phone: '******4625' },
                                { id: 'ID-025', name: 'Mira Bhatt', phone: '******7230' },
                                { id: 'ID-025', name: 'Rhea Rao', phone: '******1192' },
                            ].map((result, index) => (
                                <div key={index} className="flex items-center py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="w-24 font-medium text-[#4A1D59]">{result.id}</div>
                                    <div className="flex-1 text-gray-900 font-medium">{result.name}</div>
                                    <div className="w-32 text-gray-600 font-medium tracking-wider">{result.phone}</div>
                                    <div className="flex gap-6 items-center">
                                        <button className="text-[#4A1D59] hover:text-[#2E1A47] font-semibold underline underline-offset-4 text-sm">
                                            View Details
                                        </button>
                                        <button
                                            className="text-[#4A1D59] hover:text-[#2E1A47] font-semibold underline underline-offset-4 text-sm"
                                            onClick={() => setIsFeedbackModalOpen(true)}
                                        >
                                            Give Feedback
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

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

            <PreTagCustomerModal open={isPreTagModalOpen} onOpenChange={setIsPreTagModalOpen} />
            <AddChannelPartnerModal open={isAddCPModalOpen} onOpenChange={setIsAddCPModalOpen} />
            <AddRevisitModal open={isAddRevisitModalOpen} onOpenChange={setIsAddRevisitModalOpen} />
            <FeedbackFormModal open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen} />
        </div>
    );
};

export default ReceptionistDashboard;
