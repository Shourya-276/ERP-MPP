import React, { useState, useRef } from 'react';
import { Trash2, X, Check } from 'lucide-react';
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
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-[#4A1D59] group transition-all"
            >
                <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                    isSelected 
                        ? "bg-[#4A1D59] border-[#4A1D59] scale-110 shadow-md shadow-purple-200" 
                        : "bg-white border-gray-200 group-hover:border-[#4A1D59]"
                )}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white animate-in zoom-in-50 duration-300" />}
                </div>
                <span className={cn("font-medium transition-colors", isSelected ? "text-[#4A1D59]" : "text-gray-500")}>{label}</span>
            </button>
        );
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">{tc.shareRequirements}</h2>
                <p className="text-muted-foreground text-sm">{tc.followSteps}</p>
            </div>

            <div className="space-y-8">
                <h3 className="text-[#4A1D59] font-bold text-xs uppercase tracking-wider">{t.whereDidYouFind}<span className="text-red-500">*</span></h3>

                <div className="space-y-4 ml-1">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-tight">{t.online}:</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <CheckboxOption label="Facebook" />
                        <CheckboxOption label="Instagram" />
                        <CheckboxOption label="Youtube" />
                        <CheckboxOption label="Reels" />
                        <CheckboxOption label="Property portal" />
                        <CheckboxOption label="Google/Website" />
                    </div>
                </div>

                <div className="space-y-4 ml-1">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-tight">{t.offline}:</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <CheckboxOption label="Newspaper Ads" />
                        <CheckboxOption label="Billboards" />
                        <CheckboxOption label="Station Hoarding" />
                        <CheckboxOption label="Site Branding" />
                        <CheckboxOption label="Pole Branding" />
                        <button
                            type="button"
                            onClick={() => toggleSource('Reference')}
                            className="flex items-center gap-3 text-sm text-gray-500 hover:text-[#4A1D59] group"
                        >
                            <div className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                selectedSources.includes('Reference') 
                                    ? "bg-[#4A1D59] border-[#4A1D59] scale-110 shadow-md shadow-purple-200" 
                                    : "bg-white border-gray-200 group-hover:border-[#4A1D59]"
                            )}>
                                {selectedSources.includes('Reference') && <div className="w-2 h-2 rounded-full bg-white animate-in zoom-in-50" />}
                            </div>
                            <span className={cn("font-medium transition-colors", selectedSources.includes('Reference') ? "text-[#4A1D59]" : "text-gray-500")}>{t.reference}</span>
                        </button>
                    </div>
                </div>

                {selectedSources.includes('Reference') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 animate-in slide-in-from-top-2 duration-300">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.nameOfReference}</label>
                            <Input
                                className="bg-[#FDFCFD] border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                placeholder={t.nameOfReference}
                                value={formData.refName}
                                onChange={(e) => setFormData(prev => ({ ...prev, refName: e.target.value.replace(/[^a-zA-Z\s]/g, '') }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.contact}</label>
                            <Input
                                className="bg-[#FDFCFD] border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
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
                    className="flex items-center gap-3 text-sm font-bold text-[#4A1D59] uppercase tracking-wider"
                >
                    <div className={cn(
                        "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300",
                        showChannelPartner ? "bg-[#4A1D59] border-[#4A1D59] scale-105 shadow-md shadow-purple-200" : "bg-white border-gray-200 hover:border-[#4A1D59]"
                    )}>
                        {showChannelPartner && <Check className="text-white w-3 h-3 animate-in fade-in" />}
                    </div>
                    {t.broker}
                </button>

                {showChannelPartner && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF8FD] p-6 rounded-2xl border border-purple-100/50 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#4A1D59] uppercase racking-tight">CP Firm Name</label>
                             <Input
                                placeholder={t.cpFirm}
                                className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.cpFirm}
                                onChange={(e) => setFormData(prev => ({ ...prev, cpFirm: e.target.value }))}
                             />
                        </div>
                        <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#4A1D59] uppercase racking-tight">Executive Name</label>
                             <Input
                                placeholder={t.execName}
                                className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.cpExec}
                                onChange={(e) => setFormData(prev => ({ ...prev, cpExec: e.target.value.replace(/[^a-zA-Z\s]/g, '') }))}
                             />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold text-[#4A1D59] uppercase racking-tight">CP Phone Number</label>
                            <div className="flex gap-4">
                                <div className="w-24 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold">
                                    <span>🇮🇳</span> +91
                                </div>
                                <Input
                                    placeholder={translations[language].personalInfo.phone}
                                    className="flex-1 bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                    value={formData.cpPhone}
                                    onChange={(e) => handleNumericChange('cpPhone', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-4 select-none bg-purple-50/20 p-4 rounded-2xl border border-purple-100/30">
                <button
                    type="button"
                    onClick={() => setConsent(!consent)}
                    className={cn(
                        "w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                        consent ? "bg-[#4A1D59] border-[#4A1D59] scale-110 shadow-sm" : "bg-white border-gray-300 hover:border-[#4A1D59]"
                    )}
                >
                    {consent && <Check className="text-white w-3 h-3 animate-in zoom-in-50" />}
                </button>
                <p
                    className="text-xs text-gray-500 font-medium leading-relaxed cursor-pointer"
                    onClick={() => setConsent(!consent)}
                >
                    {t.consent}<span className="text-red-500 ml-1">*</span>
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
