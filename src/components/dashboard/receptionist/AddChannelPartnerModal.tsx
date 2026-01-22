
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Handshake, Check } from 'lucide-react';

interface AddChannelPartnerModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const AddChannelPartnerModal: React.FC<AddChannelPartnerModalProps> = ({ open, onOpenChange }) => {
    const [cpName, setCpName] = useState('');
    const [firmName, setFirmName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log({ cpName, firmName, phone, email });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden bg-white">
                <DialogHeader className="p-6 bg-[#FFF9F2] border-b border-[#FFEAD5] flex flex-row items-center gap-3 space-y-0">
                    <div className="bg-[#FF5500]/10 p-2 rounded-lg">
                        <Handshake className="w-6 h-6 text-[#FF5500]" />
                    </div>
                    <DialogTitle className="text-xl font-semibold text-gray-900">Add Channel Partner</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-5">
                    {/* CP Name */}
                    <div className="space-y-2">
                        <Label htmlFor="cpName" className="text-sm font-medium text-gray-700">
                            CP Name<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="cpName"
                            placeholder="Enter CP name"
                            value={cpName}
                            onChange={(e) => setCpName(e.target.value)}
                            className="bg-gray-50 border-gray-200 h-11"
                        />
                    </div>

                    {/* CP Firm Name */}
                    <div className="space-y-2">
                        <Label htmlFor="firmName" className="text-sm font-medium text-gray-700">
                            CP Firm Name<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="firmName"
                            placeholder="Enter firm name"
                            value={firmName}
                            onChange={(e) => setFirmName(e.target.value)}
                            className="bg-gray-50 border-gray-200 h-11"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Phone Number<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="phone"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-gray-50 border-gray-200 h-11"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border-gray-200 h-11"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-2">
                        <Button
                            variant="secondary"
                            className="flex-1 h-12 text-base font-medium rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1 h-12 bg-[#FF5500] hover:bg-[#E04B00] text-white text-base font-medium rounded-xl gap-2"
                            onClick={handleSubmit}
                            disabled={!cpName || !firmName || !phone}
                        >
                            <Check className="w-5 h-5" />
                            Register CP
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
