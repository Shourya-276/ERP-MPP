import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, Check, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface AddRevisitModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const AddRevisitModal: React.FC<AddRevisitModalProps> = ({ open, onOpenChange }) => {
    const [step, setStep] = useState<'search' | 'result'>('search');
    const [uniqueId, setUniqueId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lead, setLead] = useState<any>(null);

    const handleSearch = async () => {
        if (!uniqueId.trim()) return;

        setIsLoading(true);
        try {
            const response = await api.get(`/leads/${uniqueId.toUpperCase()}`);
            setLead(response.data);
            setStep('result');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Lead ID not found');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setStep('search');
        setUniqueId('');
        setLead(null);
    };

    const handleLogRevisit = async () => {
        setIsLoading(true);
        try {
            await api.patch(`/leads/${lead.friendlyId}/revisit`);
            toast.success(`Revisit logged for ${lead.customerName}`);
            onOpenChange(false);

            // Reset for next time
            setTimeout(() => {
                setStep('search');
                setUniqueId('');
                setLead(null);
            }, 300);
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to log revisit');
        } finally {
            setIsLoading(false);
        }
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
                                        placeholder="e.g., LEAD-0001"
                                        value={uniqueId}
                                        onChange={(e) => setUniqueId(e.target.value)}
                                        className="pl-10 bg-white border-gray-200 h-11 uppercase"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSearch();
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">Search for an existing Lead ID (e.g., LEAD-0001)</p>
                            </div>

                            <Button
                                className="w-full h-12 bg-[#2E1A47] hover:bg-[#1e1131] text-white text-base font-medium rounded-xl disabled:opacity-50"
                                onClick={handleSearch}
                                disabled={!uniqueId.trim() || isLoading}
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Search Customer'}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {lead && (
                                <div className="bg-[#F8F5FF] border border-[#EFECFF] rounded-xl p-4 space-y-1">
                                    <h3 className="font-semibold text-gray-900 text-lg">{lead.customerName}</h3>
                                    <div className="text-gray-600">Phone: {lead.phone}</div>
                                    <div className="text-gray-600">ID: {lead.friendlyId}</div>
                                    <div className="mt-2 text-xs text-[#4A1D59] font-medium px-2 py-1 bg-white inline-block rounded border border-[#EFECFF]">
                                        Current Status: {lead.status}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button
                                    variant="secondary"
                                    className="flex-1 h-12 text-base font-medium rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    onClick={handleBack}
                                    disabled={isLoading}
                                >
                                    Back
                                </Button>
                                <Button
                                    className="flex-1 h-12 bg-[#2E1A47] hover:bg-[#1e1131] text-white text-base font-medium rounded-xl gap-2 disabled:opacity-50"
                                    onClick={handleLogRevisit}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Log Revisit
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
