
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QrCode, X } from 'lucide-react';

interface PreTagCustomerModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const channelPartners = [
    { id: 1, name: 'Amit Sharma', company: 'Property Solutions' },
    { id: 2, name: 'Neha Patel', company: 'Real Estate Partners' },
    { id: 3, name: 'Rahul Verma', company: 'Prime Realty' },
    { id: 4, name: 'Sneha Gupta', company: 'Elite Properties' },
    { id: 5, name: 'Vikram Singh', company: 'Skyline Developers' }, // Added for scroll demo
];

export const PreTagCustomerModal: React.FC<PreTagCustomerModalProps> = ({ open, onOpenChange }) => {
    const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [phone4, setPhone4] = useState('');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden bg-white">
                <DialogHeader className="p-6 bg-[#F0FFFA] border-b border-gray-100 flex flex-row items-center justify-between space-y-0 relative">
                    <DialogTitle className="text-xl font-semibold text-gray-900">Pre-tag Customer</DialogTitle>
                    {/* Close button is handled by DialogPrimitive usually, but ensuring custom styling or explicit close if needed */}
                </DialogHeader>

                <div className="p-6 space-y-6">
                    {/* Customer Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Customer Full Name<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            placeholder="Enter customer name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border-gray-200 h-11"
                        />
                    </div>

                    {/* Customer Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Customer Phone (last 4 digits)<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="phone"
                            placeholder="Last 4 digits"
                            maxLength={4}
                            value={phone4}
                            onChange={(e) => setPhone4(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            className="bg-gray-50 border-gray-200 h-11"
                        />
                    </div>

                    {/* Channel Partner Selection */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                            Select Channel Partner<span className="text-red-500">*</span>
                        </Label>
                        <ScrollArea className="h-[200px] w-full pr-4 -mr-4">
                            <div className="space-y-3 pr-4">
                                {channelPartners.map((partner) => (
                                    <div
                                        key={partner.id}
                                        onClick={() => setSelectedPartner(partner.id)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedPartner === partner.id
                                                ? 'border-[#10A37F] bg-[#F0FFF9]'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="font-semibold text-gray-900">{partner.name}</div>
                                        <div className="text-sm text-gray-500">{partner.company}</div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Generate Button */}
                    <Button
                        className="w-full h-12 bg-[#00B050] hover:bg-[#009040] text-white text-base font-medium rounded-xl gap-2 mt-2"
                        disabled={!name || phone4.length !== 4 || !selectedPartner}
                    >
                        <QrCode className="w-5 h-5" />
                        Generate Code
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
