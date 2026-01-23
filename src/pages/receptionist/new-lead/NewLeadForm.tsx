import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import megaplexLogo from '@/assets/megaplex-logo.png';
import formIllustration from '@/assets/form-illustration.png';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ContactWorkInfoStep from './steps/ContactWorkInfoStep';
import PropertyDetailsStep from './steps/PropertyDetailsStep';
import FeedbackStep from './steps/FeedbackStep';
import ThankYouStep from './steps/ThankYouStep';
import { translations, Language } from './translations';

/**
 * @component NewLeadForm
 * @description Main container for the multi-step Customer Enquiry Form.
 * 
 * Responsibilities:
 * 1. Manages the wizard state (currentStep).
 * 2. Manages the global language state (English/Marathi).
 * 3. Renders the progress stepper and header.
 * 4. Conditionally renders the current step component (PersonalInfo, ContactInfo, etc.).
 * 
 * This component acts as the "Orchestrator" for the new lead creation flow.
 */
const NewLeadForm: React.FC = () => {
    const navigate = useNavigate();

    // State to track the active step in the wizard (1-5)
    // 1: Personal Info, 2: Contact/Work, 3: Property, 4: Feedback, 5: Thank You
    const [currentStep, setCurrentStep] = useState(1);

    // Global language state passed down to all steps
    const [language, setLanguage] = useState<Language>('en');

    // Placeholder for accumulating form data across steps if backend integration is added later
    const [formData, setFormData] = useState({});

    const t = translations[language];

    const steps = [
        { number: 1, label: t.common.personalInfo },
        { number: 2, label: t.common.contactWorkInfo },
        { number: 3, label: t.common.propertyDetails },
        { number: 4, label: t.common.feedback },
    ];

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 5)); // 5 is Thank You step
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const isThankYouStep = currentStep === 5;

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="bg-[#4A1D59] p-4 text-white flex justify-between items-center shadow-md">
                <div className="flex items-center gap-4">
                    <img src={megaplexLogo} alt="Megaplex Prime" className="h-10 object-contain" />
                    {/* Note: In image logo is gold, but on purple header standard logo might suffice or we use filter. 
                 The image shows gold logo on purple background. Assuming the imported logo is the gold one. */}
                    <span className="hidden">Megaplex Prime</span>
                </div>
                <div className="text-xl font-medium">{t.common.customerEnquiryForm}</div>
                <button onClick={() => navigate('/receptionist')} className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto max-w-5xl p-6 flex flex-col">
                {!isThankYouStep && (
                    <>
                        {/* Stepper */}
                        <div className="mb-8 relative user-select-none">
                            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2 z-0"></div>
                            <div
                                className="absolute top-1/2 left-0 h-[2px] bg-[#4A1D59] -translate-y-1/2 z-0 transition-all duration-300"
                                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                            ></div>

                            <div className="relative z-10 flex justify-between">
                                {steps.map((step) => (
                                    <div key={step.number} className="flex flex-col items-center gap-2">
                                        <div
                                            className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 border-2",
                                                currentStep >= step.number
                                                    ? "bg-[#4A1D59] border-[#4A1D59] text-white"
                                                    : "bg-[#E6D5F0] border-[#E6D5F0] text-[#4A1D59]"
                                            )}
                                        >
                                            {step.number}
                                        </div>
                                        <span className={cn(
                                            "text-xs font-medium",
                                            currentStep >= step.number ? "text-[#4A1D59]" : "text-gray-400"
                                        )}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Language Toggle & Illustration Placeholder (Only visible in some steps if desired, or always) 
                    In the image the illustration is at the top of the form, below stepper.
                */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1 flex justify-center">
                                <img src={formIllustration} alt="Step Illustration" className="h-32 object-contain" />
                            </div>
                            <div className="bg-[#F3E8FF] rounded-full p-1 flex">
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm",
                                        language === 'en'
                                            ? "bg-[#E6D5F0] text-[#4A1D59] font-bold"
                                            : "text-foreground/60 hover:bg-black/5"
                                    )}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => setLanguage('mr')}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm",
                                        language === 'mr'
                                            ? "bg-[#E6D5F0] text-[#4A1D59] font-bold"
                                            : "text-foreground/60 hover:bg-black/5"
                                    )}
                                >
                                    मराठी
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Form Steps */}
                <div className="flex-1 bg-white">
                    {currentStep === 1 && <PersonalInfoStep onNext={handleNext} language={language} />}
                    {currentStep === 2 && <ContactWorkInfoStep onNext={handleNext} onBack={handleBack} language={language} />}
                    {currentStep === 3 && <PropertyDetailsStep onNext={handleNext} onBack={handleBack} language={language} />}
                    {currentStep === 4 && <FeedbackStep onNext={handleNext} onBack={handleBack} language={language} />}
                    {currentStep === 5 && <ThankYouStep language={language} />}
                </div>

            </main>
        </div>
    );
};

export default NewLeadForm;
