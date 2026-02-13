import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Trash2, X } from 'lucide-react';
import { translations, Language } from '../translations';

interface FeedbackStepProps {
    onNext: (data: any) => void;
    onBack: () => void;
    language: Language;
    initialData: any;
    isSubmitting?: boolean;
}

const FeedbackStep: React.FC<FeedbackStepProps> = ({ onNext, onBack, language, initialData, isSubmitting }) => {
    const [selectedSources, setSelectedSources] = useState<string[]>(initialData.selectedSources || []);
    const [showChannelPartner, setShowChannelPartner] = useState(initialData.showChannelPartner || false);
    const [consent, setConsent] = useState(initialData.consent ?? true);

    const [formData, setFormData] = useState({
        refName: initialData.refName || '',
        refContact: initialData.refContact || '',
        cpFirm: initialData.cpFirm || '',
        cpExec: initialData.cpExec || '',
        cpPhone: initialData.cpPhone || ''
    });

    const [isSignatureOpen, setIsSignatureOpen] = useState(false);
    const [signature, setSignature] = useState<string | null>(initialData.signature || null);
    const sigCanvas = useRef<SignatureCanvas>(null);

    const t = translations[language].feedback;
    const tc = translations[language].common;

    const toggleSource = (source: string) => {
        // Business Rule: Only one source can be selected across online/offline/reference
        if (selectedSources.includes(source)) {
            setSelectedSources([]);
        } else {
            setSelectedSources([source]);
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
                const dataUrl = sigCanvas.current.getCanvas().toDataURL('image/png');
                setSignature(dataUrl);
            }
        } catch (error) {
            console.error("Error saving signature:", error);
        }
        setIsSignatureOpen(false);
    };

    const handleNumericChange = (field: string, value: string, max: number = 10) => {
        const digitsOnly = value.replace(/\D/g, '').slice(0, max);
        setFormData(prev => ({ ...prev, [field]: digitsOnly }));
    };

    const isStepValid = () => {
        const hasSource = selectedSources.length > 0 || showChannelPartner;
        const hasSignature = !!signature;
        const hasConsent = consent;

        let refValid = true;
        if (selectedSources.includes('Reference')) {
            refValid = !!(formData.refName && formData.refContact.length >= 10);
        }

        let cpValid = true;
        if (showChannelPartner) {
            cpValid = !!(formData.cpFirm && formData.cpExec && formData.cpPhone.length === 10);
        }

        return hasSource && hasSignature && refValid && cpValid && hasConsent;
    };

    /**
     * @component CheckboxOption
     * @description Helper to render source selection buttons
     */
    const CheckboxOption = ({ label }: { label: string }) => {
        const isSelected = selectedSources.includes(label);
        return (
            <button
                type="button"
                onClick={() => toggleSource(label)}
                className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground group transition-all"
            >
                <div className={cn(
                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200",
                    isSelected ? "bg-[#4A1D59] border-[#4A1D59] scale-105 shadow-sm" : "bg-white border-gray-400 group-hover:border-[#4A1D59]"
                )}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white animate-in zoom-in-50 duration-200" />}
                </div>
                <span className={cn(isSelected && "text-[#4A1D59] font-medium")}>{label}</span>
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
                    <div className="text-sm font-medium text-gray-600 font-inter">{t.online}:</div>
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
                    <div className="text-sm font-medium text-gray-600 font-inter">{t.offline}:</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <CheckboxOption label="Newspaper Ads" />
                        <CheckboxOption label="Billboards" />
                        <CheckboxOption label="Station Hoarding" />
                        <CheckboxOption label="Site Branding" />
                        <CheckboxOption label="Pole Branding" />
                        <button
                            type="button"
                            onClick={() => toggleSource('Reference')}
                            className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground group"
                        >
                            <div className={cn(
                                "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200",
                                selectedSources.includes('Reference') ? "bg-[#4A1D59] border-[#4A1D59] scale-105" : "bg-white border-gray-400 group-hover:border-[#4A1D59]"
                            )}>
                                {selectedSources.includes('Reference') && <div className="w-2 h-2 rounded-full bg-white animate-in zoom-in-50" />}
                            </div>
                            <span className={cn(selectedSources.includes('Reference') && "text-[#4A1D59] font-medium")}>{t.reference}</span>
                        </button>
                    </div>
                </div>

                {selectedSources.includes('Reference') && (
                    <div className="grid grid-cols-2 gap-8 pt-2">
                        <div className="relative border-b border-[#4A1D59]">
                            <input
                                className="w-full py-2 outline-none text-sm placeholder:text-gray-400"
                                placeholder={t.nameOfReference}
                                value={formData.refName}
                                onChange={(e) => setFormData(prev => ({ ...prev, refName: e.target.value.replace(/[^a-zA-Z\s]/g, '') }))}
                            />
                        </div>
                        <div className="relative border-b border-[#4A1D59]">
                            <input
                                className="w-full py-2 outline-none text-sm placeholder:text-gray-400"
                                placeholder={t.contact}
                                value={formData.refContact}
                                onChange={(e) => handleNumericChange('refContact', e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Broker Channel Partner */}
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setShowChannelPartner(!showChannelPartner);
                        // If CP is selected, clear other sources to maintain "mostly single source" logic
                        if (!showChannelPartner) setSelectedSources([]);
                    }}
                    className="flex items-center gap-3 text-sm font-bold text-[#4A1D59]"
                >
                    <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-all duration-200",
                        showChannelPartner ? "bg-[#4A1D59] border-[#4A1D59]" : "bg-white border-[#4A1D59]"
                    )}>
                        {showChannelPartner && <span className="text-white text-xs animate-in fade-in">✓</span>}
                    </div>
                    {t.broker}
                </button>

                {showChannelPartner && (
                    <div className="mt-4 grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                        <Input
                            placeholder={t.cpFirm}
                            className="bg-white border-gray-200 focus:ring-[#4A1D59] focus:border-[#4A1D59]"
                            value={formData.cpFirm}
                            onChange={(e) => setFormData(prev => ({ ...prev, cpFirm: e.target.value }))}
                        />
                        <Input
                            placeholder={t.execName}
                            className="bg-white border-gray-200 focus:ring-[#4A1D59] focus:border-[#4A1D59]"
                            value={formData.cpExec}
                            onChange={(e) => setFormData(prev => ({ ...prev, cpExec: e.target.value.replace(/[^a-zA-Z\s]/g, '') }))}
                        />
                        <div className="col-span-2 text-xs text-[#4A1D59] font-medium">{t.addFirm}</div>

                        <div className="col-span-2 flex gap-4">
                            <div className="w-20 bg-white border border-gray-200 rounded-md flex items-center justify-center gap-1 text-xs">
                                <span>🇮🇳</span> +91
                            </div>
                            <Input
                                placeholder={translations[language].personalInfo.phone}
                                className="flex-1 bg-white border-gray-200 focus:ring-[#4A1D59] focus:border-[#4A1D59]"
                                value={formData.cpPhone}
                                onChange={(e) => handleNumericChange('cpPhone', e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Consent Checkbox - FIXED */}
            <div className="flex items-start gap-3 select-none">
                <button
                    type="button"
                    onClick={() => setConsent(!consent)}
                    className={cn(
                        "w-5 h-5 mt-0.5 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200",
                        consent ? "bg-[#4A1D59] border-[#4A1D59]" : "bg-white border-gray-400 hover:border-[#4A1D59]"
                    )}
                >
                    {consent && <span className="text-white text-xs animate-in zoom-in-50">✓</span>}
                </button>
                <p
                    className="text-xs text-gray-600 leading-tight cursor-pointer"
                    onClick={() => setConsent(!consent)}
                >
                    {t.consent}<span className="text-red-500">*</span>
                </p>
            </div>

            {/* Signature */}
            <div className="flex justify-end">
                <div className="w-64 space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59]">{t.signature}<span className="text-red-500">*</span></label>

                    {!signature ? (
                        <div
                            onClick={() => setIsSignatureOpen(true)}
                            className="h-24 bg-[#FAFAFA] border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs cursor-pointer hover:bg-gray-100 hover:border-[#4A1D59] transition-all"
                        >
                            {t.tapToSign}
                        </div>
                    ) : (
                        <div className="relative h-24 bg-white border border-gray-200 rounded-lg overflow-hidden group shadow-sm">
                            <img
                                src={signature}
                                alt="Signature"
                                className="w-full h-full object-contain cursor-default"
                            />
                            <button
                                onClick={() => setSignature(null)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
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
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-[#4A1D59] font-bold">{t.signature}</DialogTitle>
                    </DialogHeader>
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-1 shadow-inner">
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
                    <DialogFooter className="flex justify-between sm:justify-between items-center w-full gap-4 pt-4">
                        <Button type="button" variant="ghost" size="sm" onClick={clearSignature} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4 mr-2" />
                            {tc.clear}
                        </Button>
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsSignatureOpen(false)} className="rounded-lg">{tc.cancel}</Button>
                            <Button type="button" onClick={saveSignature} className="bg-[#4A1D59] hover:bg-[#3d184a] text-white rounded-lg px-6">{t.saveSignature}</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
                <Button onClick={onBack} variant="ghost" className="text-muted-foreground hover:text-[#4A1D59]">{tc.back}</Button>
                <div className="flex flex-col items-end gap-2">
                    {!isStepValid() && (
                        <p className="text-[10px] text-red-500 font-bold animate-pulse">Required: Select Source, Consent & Sign</p>
                    )}
                    <Button
                        onClick={() => onNext({ ...formData, selectedSources, showChannelPartner, signature, consent })}
                        disabled={!isStepValid() || isSubmitting}
                        className={cn(
                            "bg-[#4A1D59] hover:bg-[#3d184a] text-white rounded-xl px-10 py-6 text-sm font-bold transition-all shadow-lg active:scale-95",
                            (!isStepValid() || isSubmitting) && "opacity-50 cursor-not-allowed bg-gray-400 grayscale shadow-none"
                        )}
                    >
                        {isSubmitting ? 'Submitting...' : tc.continue}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackStep;
