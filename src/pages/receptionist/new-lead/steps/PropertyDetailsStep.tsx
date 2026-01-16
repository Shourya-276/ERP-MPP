import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PropertyDetailsStepProps {
    onNext: () => void;
    onBack: () => void;
}

const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({ onNext, onBack }) => {
    const [purpose, setPurpose] = useState('Primary Residence');
    const [config, setConfig] = useState('2 BHK');
    const [budget, setBudget] = useState('71 lacs - 80 lacs');
    const [possession, setPossession] = useState('2028');
    const [floor, setFloor] = useState('Upper level');
    const [view, setView] = useState('Mangrove view');

    const OptionButton = ({
        selected,
        onClick,
        label,
        fullWidth = false
    }: {
        selected: boolean,
        onClick: () => void,
        label: string,
        fullWidth?: boolean
    }) => (
        <button
            onClick={onClick}
            className={cn(
                "rounded-lg border px-4 py-3 flex items-center gap-3 transition-all text-sm font-medium",
                selected
                    ? "border-[#4A1D59] bg-[#E6D5F0] text-[#4A1D59]"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300",
                fullWidth ? "w-full" : "flex-1"
            )}
        >
            <div className={cn(
                "w-4 h-4 rounded flex items-center justify-center border",
                selected ? "bg-[#4A1D59] border-[#4A1D59]" : "border-gray-300 bg-white"
            )}>
                {selected && <span className="text-white text-[10px]">✓</span>}
            </div>
            {label}
        </button>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">Share your requirements in just a few simple steps 🚀</h2>
                <p className="text-muted-foreground text-sm">Follow these three steps to find your perfect home effortlessly.</p>
            </div>

            {/* Purpose */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">What is your purpose of buying?<span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                    {['Primary Residence', 'Investment', 'Second Home'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            selected={purpose === opt}
                            onClick={() => setPurpose(opt)}
                        />
                    ))}
                </div>
            </div>

            {/* Configuration */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">Which configuration suits you best?<span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                    {['1 BHK', '2 BHK', '3 BHK', 'Jodi'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            selected={config === opt}
                            onClick={() => setConfig(opt)}
                        />
                    ))}
                </div>
            </div>

            {/* Budget */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">How much would you like to invest?<span className="text-red-500">*</span></label>
                <div className="grid grid-cols-3 gap-4">
                    {['71 lacs - 80 lacs', '81 lacs - 90 lacs', '90 lacs - 1 Cr', '1.01 Cr - 1.20 Cr', '1.20 Crs & Above'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            selected={budget === opt}
                            onClick={() => setBudget(opt)}
                            fullWidth
                        />
                    ))}
                </div>
            </div>

            {/* Possession */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">What is your target possession date?<span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                    {['2027', '2028', '2029'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            selected={possession === opt}
                            onClick={() => setPossession(opt)}
                        />
                    ))}
                </div>
            </div>

            {/* Floor Level */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">What is your preferred floor level?<span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                    {['Lower level', 'Middle level', 'Upper level'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            selected={floor === opt}
                            onClick={() => setFloor(opt)}
                        />
                    ))}
                </div>
            </div>

            {/* View */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">What view are you interested in?</label>
                <div className="flex gap-4">
                    {['City view', 'Mangrove view', 'Both'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            selected={view === opt}
                            onClick={() => setView(opt)}
                        />
                    ))}
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

export default PropertyDetailsStep;
