import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeedbackStepProps {
    onNext: () => void;
    onBack: () => void;
}

const FeedbackStep: React.FC<FeedbackStepProps> = ({ onNext, onBack }) => {
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const [showChannelPartner, setShowChannelPartner] = useState(false);

    const toggleSource = (source: string) => {
        if (selectedSources.includes(source)) {
            setSelectedSources(prev => prev.filter(s => s !== source));
        } else {
            setSelectedSources(prev => [...prev, source]);
        }
    };

    const CheckboxOption = ({ label }: { label: string }) => {
        const isSelected = selectedSources.includes(label);
        return (
            <button
                onClick={() => toggleSource(label)}
                className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground"
            >
                <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    isSelected ? "bg-[#4A1D59] border-[#4A1D59]" : "bg-white border-gray-400"
                )}>
                    {isSelected && <span className="text-white text-xs">✓</span>}
                </div>
                {label}
            </button>
        );
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">Share your requirements in just a few simple steps 🚀</h2>
                <p className="text-muted-foreground text-sm">Follow these three steps to find your perfect home effortlessly.</p>
            </div>

            <div className="space-y-6">
                <h3 className="text-[#4A1D59] font-semibold text-sm">Where did you find out about us?<span className="text-red-500">*</span></h3>

                <div className="space-y-4 ml-2">
                    <div className="text-sm font-medium text-gray-600">Online:</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <CheckboxOption label="Facebook" />
                        <CheckboxOption label="Instagram" />
                        <CheckboxOption label="Youtube" />
                        <CheckboxOption label="Reels" />
                        <CheckboxOption label="Property portal" />
                        <CheckboxOption label="Google/Website" />
                    </div>
                </div>

                <div className="space-y-4 ml-2">
                    <div className="text-sm font-medium text-gray-600">Offline:</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <CheckboxOption label="Newspaper Ads" />
                        <CheckboxOption label="Billboards" />
                        <CheckboxOption label="Station Hoarding" />
                        <CheckboxOption label="Site Branding" />
                        <CheckboxOption label="Pole Branding" />
                        <button
                            onClick={() => toggleSource('Reference')}
                            className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground"
                        >
                            <div className={cn(
                                "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                selectedSources.includes('Reference') ? "bg-[#4A1D59] border-[#4A1D59]" : "bg-white border-gray-400"
                            )}>
                                {selectedSources.includes('Reference') && <span className="text-white text-xs">✓</span>}
                            </div>
                            Reference
                        </button>
                    </div>
                </div>

                {selectedSources.includes('Reference') && (
                    <div className="grid grid-cols-2 gap-8 pt-2">
                        <div className="relative border-b border-[#4A1D59]">
                            <input className="w-full py-2 outline-none text-sm placeholder:text-gray-400" placeholder="Name of Reference" />
                        </div>
                        <div className="relative border-b border-[#4A1D59]">
                            <input className="w-full py-2 outline-none text-sm placeholder:text-gray-400" placeholder="Contact" />
                        </div>
                    </div>
                )}
            </div>

            {/* Broker Channel Partner */}
            <div>
                <button
                    onClick={() => setShowChannelPartner(!showChannelPartner)}
                    className="flex items-center gap-3 text-sm font-bold text-[#4A1D59]"
                >
                    <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        showChannelPartner ? "bg-[#4A1D59] border-[#4A1D59]" : "bg-white border-[#4A1D59]"
                    )}>
                        {showChannelPartner && <span className="text-white text-xs">✓</span>}
                    </div>
                    Broker/Channel Partner
                </button>

                {showChannelPartner && (
                    <div className="mt-4 grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                        <Input placeholder="CP Firm" className="bg-white border-gray-200" />
                        <Input placeholder="Exec. Name" className="bg-white border-gray-200" />
                        <div className="col-span-2 text-xs text-[#4A1D59]">+ Add Firm (Office Use)</div>

                        <div className="col-span-2 flex gap-4">
                            <div className="w-20 bg-white border border-gray-200 rounded-md flex items-center justify-center gap-1 text-xs">
                                <span>🇮🇳</span> +91
                            </div>
                            <Input placeholder="Phone Number" className="flex-1 bg-white border-gray-200" />
                        </div>
                    </div>
                )}
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 rounded border border-[#4A1D59] bg-[#4A1D59] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-xs text-gray-600 leading-tight">
                    By proceeding, you consent to being contacted using the details provided and to receive relevant marketing communications.<span className="text-red-500">*</span>
                </p>
            </div>

            {/* Signature */}
            <div className="flex justify-end">
                <div className="w-64 space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59]">Signature</label>
                    <div className="h-24 bg-[#FAFAFA] border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs cursor-pointer hover:bg-gray-50">
                        Tap to sign
                    </div>
                </div>
            </div>


            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-12 pt-4">
                <Button onClick={onBack} variant="ghost" className="text-muted-foreground">← Back</Button>
                <Button
                    onClick={onNext}
                    className="bg-[#4A1D59] hover:bg-[#3d184a] text-white rounded-lg px-8 py-6 text-sm font-medium"
                >
                    Continue →
                </Button>
            </div>
        </div>
    );
};

export default FeedbackStep;
