import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { translations, Language } from '../translations';

interface PropertyDetailsStepProps {
    onNext: () => void;
    onBack: () => void;
    language: Language;
}

/**
 * @component PropertyDetailsStep
 * @description Step 3 of the New Lead Form.
 * Captures user preferences like Purpose, Configuration, Budget, Possession, etc.
 * Uses a pill/button selection UI pattern.
 */
const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({ onNext, onBack, language }) => {
    // Selection states
    const [purpose, setPurpose] = useState('Primary Residence');
    const [config, setConfig] = useState('2 BHK');
    const [budget, setBudget] = useState('71 lacs - 80 lacs');
    const [possession, setPossession] = useState('2028');
    const [floor, setFloor] = useState('Upper level');
    const [view, setView] = useState('Mangrove view');

    const t = translations[language].propertyDetails;
    const tc = translations[language].common;

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
            {displayLabel || label}
        </button>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">{tc.shareRequirements}</h2>
                <p className="text-muted-foreground text-sm">{tc.followSteps}</p>
            </div>

            {/* Purpose */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">{t.purpose}<span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                    {['Primary Residence', 'Investment', 'Second Home'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            displayLabel={purposeMap[opt]}
                            selected={purpose === opt}
                            onClick={() => setPurpose(opt)}
                        />
                    ))}
                </div>
            </div>

            {/* Configuration */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">{t.configuration}<span className="text-red-500">*</span></label>
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
                <label className="text-sm font-medium text-[#4A1D59]">{t.budget}<span className="text-red-500">*</span></label>
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
                <label className="text-sm font-medium text-[#4A1D59]">{t.possession}<span className="text-red-500">*</span></label>
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
                <label className="text-sm font-medium text-[#4A1D59]">{t.floor}<span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                    {['Lower level', 'Middle level', 'Upper level'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            displayLabel={floorMap[opt]}
                            selected={floor === opt}
                            onClick={() => setFloor(opt)}
                        />
                    ))}
                </div>
            </div>

            {/* View */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">{t.view}</label>
                <div className="flex gap-4">
                    {['City view', 'Mangrove view', 'Both'].map(opt => (
                        <OptionButton
                            key={opt}
                            label={opt}
                            displayLabel={viewMap[opt]}
                            selected={view === opt}
                            onClick={() => setView(opt)}
                        />
                    ))}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-12 pt-4">
                <Button onClick={onBack} variant="ghost" className="text-muted-foreground">{tc.back}</Button>
                <Button
                    onClick={onNext}
                    className="bg-[#4A1D59] hover:bg-[#3d184a] text-white rounded-lg px-8 py-6 text-sm font-medium"
                >
                    {tc.continue}
                </Button>
            </div>
        </div>
    );
};

export default PropertyDetailsStep;
