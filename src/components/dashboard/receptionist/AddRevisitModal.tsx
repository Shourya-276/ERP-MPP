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
    const [step, setStep] = useState<'search' | 'select' | 'result'>('search');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lead, setLead] = useState<any>(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        try {
            // First search with the general search API
            const response = await api.get(`/leads/search/${searchQuery.trim()}`);
            const results = response.data;

            if (!results || results.length === 0) {
                toast.error('No lead found matching your search query');
                return;
            }

            if (results.length === 1) {
                // If single match found, fetch full lead details
                const leadResponse = await api.get(`/leads/${results[0].friendlyId}`);
                setLead(leadResponse.data);
                setStep('result');
            } else {
                // If multiple matches, show selection screen
                setSearchResults(results);
                setStep('select');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to search lead');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setStep('search');
        setSearchQuery('');
        setSearchResults([]);
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
                setSearchQuery('');
                setSearchResults([]);
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
                                <Label htmlFor="searchQuery" className="text-sm font-medium text-gray-700">
                                    Search Customer<span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="searchQuery"
                                        placeholder="Enter Unique ID, Name or Phone"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 bg-white border-gray-200 h-11"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSearch();
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">Search by Lead ID, Customer Name or Phone number</p>
                            </div>

                            <Button
                                className="w-full h-12 bg-[#2E1A47] hover:bg-[#1e1131] text-white text-base font-medium rounded-xl disabled:opacity-50"
                                onClick={handleSearch}
                                disabled={!searchQuery.trim() || isLoading}
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Search Customer'}
                            </Button>
                        </div>
                    ) : step === 'select' ? (
                        <div className="space-y-4">
                            <p className="text-sm font-medium text-gray-700">Multiple matching customers found:</p>
                            <div className="space-y-2 max-h-[200px] overflow-y-auto border border-gray-100 rounded-lg p-2 bg-gray-50">
                                {searchResults.map((result) => (
                                    <button
                                        key={result.friendlyId}
                                        onClick={async () => {
                                            setIsLoading(true);
                                            try {
                                                const leadResponse = await api.get(`/leads/${result.friendlyId}`);
                                                setLead(leadResponse.data);
                                                setStep('result');
                                            } catch (error: any) {
                                                toast.error('Failed to load lead details');
                                            } finally {
                                                setIsLoading(false);
                                            }
                                        }}
                                        disabled={isLoading}
                                        className="w-full text-left p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-lg flex items-center justify-between transition-all"
                                    >
                                        <div>
                                            <div className="font-bold text-[#4A1D59]">{result.friendlyId}</div>
                                            <div className="text-gray-900 font-medium text-sm">{result.customerName}</div>
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                            {result.phone ? `******${result.phone.slice(-4)}` : ''}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <Button
                                variant="secondary"
                                className="w-full h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                                onClick={() => {
                                    setStep('search');
                                    setSearchResults([]);
                                }}
                            >
                                Back to Search
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
