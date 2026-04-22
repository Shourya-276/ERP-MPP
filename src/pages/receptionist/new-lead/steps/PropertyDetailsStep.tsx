import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { translations, Language } from '../translations';

interface PropertyDetailsStepProps {
    onNext: (data: any) => void;
    onBack: () => void;
    language: Language;
    initialData: any;
}

const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({ onNext, onBack, language, initialData }) => {
    const [purpose, setPurpose] = useState(initialData.purpose || '');
    const [config, setConfig] = useState(initialData.config || '');
    const [budget, setBudget] = useState(initialData.budget || '');
    const [possession, setPossession] = useState(initialData.possession || '');
    const [floor, setFloor] = useState(initialData.floor || '');
    const [view, setView] = useState(initialData.view || '');

    const t = translations[language].propertyDetails;
    const tc = translations[language].common;

    const isStepValid = () => {
        return !!(purpose && config && budget && possession && floor);
    };

    // Mapping for translated labels for non-numeric options
    const purposeMap: Record<string, string> = {
        'Primary Residence': t.options.primaryResidence,
        'Investment': t.options.investment,
        'Second Home': t.options.secondHome
    };

    const floorMap: Record<string, string> = {
        'Lower level': t.floorOptions.lower,
        'Middle level': t.floorOptions.middle,
        'Upper level': t.floorOptions.upper
    };

    const viewMap: Record<string, string> = {
        'City view': t.viewOptions.city,
        'Mangrove view': t.viewOptions.mangrove,
        'Both': t.viewOptions.both
    };

    /**
     * @component OptionButton
     * @description Helper component for rendering selectable pill buttons.
     */
    const OptionButton = ({
        selected,
        onClick,
        label,
        displayLabel,
        fullWidth = false
    }: {
        selected: boolean,
        onClick: () => void,
        /** Internal value or default label */
        label: string,
        /** localized label to show the user */
        displayLabel?: string,
        fullWidth?: boolean
    }) => (
        <button
            onClick={onClick}
            className={cn(
                "rounded-xl border-2 px-4 py-3.5 flex items-center gap-3 transition-all text-sm font-bold shadow-sm",
                selected
                    ? "border-[#4A1D59] bg-[#F5ECF9] text-[#4A1D59]"
                    : "border-gray-100 bg-white text-gray-400 hover:border-gray-200",
                fullWidth ? "w-full" : "flex-1"
            )}
        >
            <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center border transition-all",
                selected ? "bg-[#4A1D59] border-[#4A1D59] scale-110 shadow-sm" : "border-gray-200 bg-white"
            )}>
                {selected && <Check className="text-white w-3 h-3" />}
            </div>
            <span className="truncate">{displayLabel || label}</span>
        </button>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">{tc.shareRequirements}</h2>
                <p className="text-muted-foreground text-sm">{tc.followSteps}</p>
            </div>

            {/* Purpose */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.purpose}<span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Primary Residence', 'Investment', 'Second Home'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            displayLabel={purposeMap[opt]}
                            selected={purpose === opt}
                            onClick={() => setPurpose(opt)}
                            fullWidth
                        />
                    ))}
                </div>
            </div>

            {/* Configuration */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.configuration}<span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['1 BHK', '2 BHK', '3 BHK', 'Jodi'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            selected={config === opt}
                            onClick={() => setConfig(opt)}
                            fullWidth
                        />
                    ))}
                </div>
            </div>

            {/* Budget */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.budget}<span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            <div className="space-y-4">
                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.possession}<span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['2027', '2028', '2029'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            selected={possession === opt}
                            onClick={() => setPossession(opt)}
                            fullWidth
                        />
                    ))}
                </div>
            </div>

            {/* Floor Level */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.floor}<span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Lower level', 'Middle level', 'Upper level'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            displayLabel={floorMap[opt]}
                            selected={floor === opt}
                            onClick={() => setFloor(opt)}
                            fullWidth
                        />
                    ))}
                </div>
            </div>

            {/* View */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.view}</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['City view', 'Mangrove view', 'Both'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            displayLabel={viewMap[opt]}
                            selected={view === opt}
                            onClick={() => setView(opt)}
                            fullWidth
                        />
                    ))}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
                <Button onClick={onBack} variant="ghost" className="text-gray-400 font-medium hover:text-[#4A1D59]">{tc.back}</Button>
                <div className="flex flex-col items-end gap-2">
                    {!isStepValid() && (
                        <p className="text-[10px] text-red-500 font-bold animate-pulse">Required fields (*) missing or incorrect</p>
                    )}
                    <Button
                        onClick={() => onNext({ purpose, config, budget, possession, floor, view })}
                        disabled={!isStepValid()}
                        className={cn(
                            "bg-[#4A1D59] hover:bg-[#3d184a] text-white rounded-xl px-12 py-6 text-sm font-bold transition-all shadow-lg active:scale-95",
                            !isStepValid() && "opacity-50 cursor-not-allowed bg-gray-400 grayscale shadow-none"
                        )}
                    >
                        {tc.continue}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsStep;
