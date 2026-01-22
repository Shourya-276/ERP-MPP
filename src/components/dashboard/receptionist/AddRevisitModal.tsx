
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, Check } from 'lucide-react';

interface AddRevisitModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const AddRevisitModal: React.FC<AddRevisitModalProps> = ({ open, onOpenChange }) => {
    const [step, setStep] = useState<'search' | 'result'>('search');
    const [uniqueId, setUniqueId] = useState('');

    // Mock customer data for demonstration
    const customerData = {
        name: 'Priya Singh',
        phone: '******5678',
        id: uniqueId || 'TAG002'
    };

    const handleSearch = () => {
        if (uniqueId.trim()) {
            setStep('result');
        }
    };

    const handleBack = () => {
        setStep('search');
        setUniqueId('');
    };

    const handleLogRevisit = () => {
        // Handle log revisit logic here
        console.log('Logging revisit for:', customerData);
        onOpenChange(false);
        // Reset after closing
        setTimeout(() => {
            setStep('search');
            setUniqueId('');
        }, 300);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden bg-white">
                <DialogHeader className="p-6 bg-[#F8F5FF] border-b border-[#EFECFF] flex flex-row items-center justify-between space-y-0 relative">
                    <DialogTitle className="text-xl font-semibold text-gray-900">Add Revisit</DialogTitle>
                </DialogHeader>

                <div className="p-6">
                    {step === 'search' ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="uniqueId" className="text-sm font-medium text-gray-700">
                                    Enter Unique ID<span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="uniqueId"
                                        placeholder="e.g., TAG001"
                                        value={uniqueId}
                                        onChange={(e) => setUniqueId(e.target.value)}
                                        className="pl-10 bg-white border-gray-200 h-11"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSearch();
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">Try TAG001, TAG002, or TAG003</p>
                            </div>

                            <Button
                                className="w-full h-12 bg-[#2E1A47] hover:bg-[#1e1131] text-white text-base font-medium rounded-xl"
                                onClick={handleSearch}
                                disabled={!uniqueId.trim()}
                            >
                                Search Customer
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Customer Result Card */}
                            <div className="bg-[#F8F5FF] border border-[#EFECFF] rounded-xl p-4 space-y-1">
                                <h3 className="font-semibold text-gray-900 text-lg">{customerData.name}</h3>
                                <div className="text-gray-600">Phone: {customerData.phone}</div>
                                <div className="text-gray-600">ID: {customerData.id}</div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    variant="secondary"
                                    className="flex-1 h-12 text-base font-medium rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    className="flex-1 h-12 bg-[#2E1A47] hover:bg-[#1e1131] text-white text-base font-medium rounded-xl gap-2"
                                    onClick={handleLogRevisit}
                                >
                                    <Check className="w-5 h-5" />
                                    Log Revisit
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
