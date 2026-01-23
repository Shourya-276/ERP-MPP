import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Trash2, X } from 'lucide-react';
import { translations, Language } from '../translations';

interface FeedbackStepProps {
    onNext: () => void;
    onBack: () => void;
    language: Language;
}

/**
 * @component FeedbackStep
 * @description Step 4: Collects marketing attribution (online/offline sources) and user signature.
 * 
 * Dependencies:
 * - react-signature-canvas: For capturing the digital signature.
 */
const FeedbackStep: React.FC<FeedbackStepProps> = ({ onNext, onBack, language }) => {
    // Stores list of selected marketing sources (e.g., ['Facebook', 'Newspaper'])
    const [selectedSources, setSelectedSources] = useState<string[]>([]);

    // Toggles visibility of Channel Partner/Broker input fields
    const [showChannelPartner, setShowChannelPartner] = useState(false);

    // Controls Signature Modal
    const [isSignatureOpen, setIsSignatureOpen] = useState(false);

    // Stores captured signature as Data URL
    const [signature, setSignature] = useState<string | null>(null);
    const sigCanvas = useRef<SignatureCanvas>(null);

    const t = translations[language].feedback;
    const tc = translations[language].common;

    const toggleSource = (source: string) => {
        if (selectedSources.includes(source)) {
            setSelectedSources(prev => prev.filter(s => s !== source));
        } else {
            setSelectedSources(prev => [...prev, source]);
        }
    };

    /* Method to clear the canvas */
    const clearSignature = () => {
        sigCanvas.current?.clear();
    };

    /* Save the signature to state and close modal */
    const saveSignature = (e?: React.MouseEvent) => {
        e?.preventDefault();
        try {
            if (sigCanvas.current) {
                // Use getCanvas() instead of getTrimmedCanvas() to ensure capturing
                // even if trimming logic is failing or aggressive
                const dataUrl = sigCanvas.current.getCanvas().toDataURL('image/png');
                setSignature(dataUrl);
            }
        } catch (error) {
            console.error("Error saving signature:", error);
        }
        setIsSignatureOpen(false);
    };

    /**
     * @component CheckboxOption
     * @description Helper to render source selection buttons
     */
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
                <h2 className="text-lg font-bold text-foreground">{tc.shareRequirements}</h2>
                <p className="text-muted-foreground text-sm">{tc.followSteps}</p>
            </div>

            <div className="space-y-6">
                <h3 className="text-[#4A1D59] font-semibold text-sm">{t.whereDidYouFind}<span className="text-red-500">*</span></h3>

                <div className="space-y-4 ml-2">
                    <div className="text-sm font-medium text-gray-600">{t.online}:</div>
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
                    <div className="text-sm font-medium text-gray-600">{t.offline}:</div>
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
                            {t.reference}
                        </button>
                    </div>
                </div>

                {selectedSources.includes('Reference') && (
                    <div className="grid grid-cols-2 gap-8 pt-2">
                        <div className="relative border-b border-[#4A1D59]">
                            <input className="w-full py-2 outline-none text-sm placeholder:text-gray-400" placeholder={t.nameOfReference} />
                        </div>
                        <div className="relative border-b border-[#4A1D59]">
                            <input className="w-full py-2 outline-none text-sm placeholder:text-gray-400" placeholder={t.contact} />
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
                    {t.broker}
                </button>

                {showChannelPartner && (
                    <div className="mt-4 grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                        <Input placeholder={t.cpFirm} className="bg-white border-gray-200" />
                        <Input placeholder={t.execName} className="bg-white border-gray-200" />
                        <div className="col-span-2 text-xs text-[#4A1D59]">{t.addFirm}</div>

                        <div className="col-span-2 flex gap-4">
                            <div className="w-20 bg-white border border-gray-200 rounded-md flex items-center justify-center gap-1 text-xs">
                                <span>🇮🇳</span> +91
                            </div>
                            <Input placeholder={translations[language].personalInfo.phone} className="flex-1 bg-white border-gray-200" />
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
                    {t.consent}<span className="text-red-500">*</span>
                </p>
            </div>

            {/* Signature */}
            <div className="flex justify-end">
                <div className="w-64 space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59]">{t.signature}</label>

                    {!signature ? (
                        <div
                            onClick={() => setIsSignatureOpen(true)}
                            className="h-24 bg-[#FAFAFA] border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            {t.tapToSign}
                        </div>
                    ) : (
                        <div className="relative h-24 bg-white border border-gray-200 rounded-lg overflow-hidden group">
                            <img
                                src={signature}
                                alt="Signature"
                                className="w-full h-full object-contain cursor-default"
                            />
                            <button
                                onClick={() => setSignature(null)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                                title="Remove Signature"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Signature Modal */}
            <Dialog open={isSignatureOpen} onOpenChange={setIsSignatureOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{t.signature}</DialogTitle>
                    </DialogHeader>
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor="black"
                            canvasProps={{
                                width: 440,
                                height: 200,
                                className: 'cursor-crosshair'
                            }}
                            backgroundColor="white"
                        />
                    </div>
                    <DialogFooter className="flex justify-between sm:justify-between items-center w-full">
                        <Button type="button" variant="ghost" size="sm" onClick={clearSignature} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4 mr-2" />
                            {tc.clear}
                        </Button>
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsSignatureOpen(false)}>{tc.cancel}</Button>
                            <Button type="button" onClick={saveSignature} className="bg-[#4A1D59] hover:bg-[#3d184a] text-white">{t.saveSignature}</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


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

export default FeedbackStep;
