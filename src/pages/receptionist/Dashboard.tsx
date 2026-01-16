import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Building2, Handshake, RefreshCw } from 'lucide-react';
import megaplexLogo from '@/assets/megaplex-logo.png';
import { Input } from '@/components/ui/input';
import { ReceptionistActionCard } from '@/components/dashboard/receptionist/ReceptionistActionCard';

const ReceptionistDashboard: React.FC = () => {
    const navigate = useNavigate();
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
                        className="w-full h-14 pl-12 bg-[#F3E8FF] border-none text-lg placeholder:text-muted-foreground/70 rounded-xl"
                        placeholder="Search by Unique ID"
                    />
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
                        icon={
                            <Handshake
                                className="text-foreground/80 absolute"
                                strokeWidth={1.5}
                                style={iconStyle}
                            />
                        }
                    />

                    <ReceptionistActionCard
                        title={<>Scan QR<br />Code</>}
                        subtitle="Scan to connect on WhatsApp"
                        background="linear-gradient(148.52deg, #F0FFFA 13.94%, #B3FCE3 47.73%)"
                        circle1Color="#DDFFF3"
                        circle2Color="#F8FFFDB2"
                        icon={
                            <div className="absolute" style={iconStyle}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-foreground/80"
                                >
                                    <rect width="5" height="5" x="3" y="3" rx="1" />
                                    <rect width="5" height="5" x="16" y="3" rx="1" />
                                    <rect width="5" height="5" x="3" y="16" rx="1" />
                                    <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                                    <path d="M21 21v.01" />
                                    <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                                    <path d="M3 12h.01" />
                                    <path d="M12 3h.01" />
                                    <path d="M12 16v.01" />
                                    <path d="M16 12h1" />
                                    <path d="M21 12v.01" />
                                    <path d="M12 21v-1" />
                                </svg>
                            </div>
                        }
                    />

                </div>
            </main>
        </div>
    );
};

export default ReceptionistDashboard;
