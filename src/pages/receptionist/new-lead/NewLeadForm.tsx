import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ContactWorkInfoStep from './steps/ContactWorkInfoStep';
import PropertyDetailsStep from './steps/PropertyDetailsStep';
import FeedbackStep from './steps/FeedbackStep';
import ThankYouStep from './steps/ThankYouStep';
import { translations, Language } from './translations';
import api from '@/lib/api';
import { toast } from 'sonner';

const NewLeadForm: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [currentStep, setCurrentStep] = useState(1);
    const [language, setLanguage] = useState<Language>('en');

    // Centralized form data
    const [formData, setFormData] = useState<any>({
        // Step 1
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        nationality: '',
        aadhar: '',
        maritalStatus: '',
        dob: '',

        // Step 2 & 3 (to be filled by steps)
        occupation: '',
        city: '',
        source: 'WALK_IN',
        purpose: 'Site Visit',

        // Results
        friendlyId: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const t = translations[language];

    const steps = [
        { number: 1, label: t.common.personalInfo },
        { number: 2, label: t.common.contactWorkInfo },
        { number: 3, label: t.common.propertyDetails },
        { number: 4, label: t.common.feedback },
    ];

    const updateData = (newData: any) => {
        setFormData((prev: any) => ({ ...prev, ...newData }));
    };

    const handleNext = () => {
        if (currentStep === 4) {
            submitForm();
        } else {
            setCurrentStep((prev) => Math.min(prev + 1, 5));
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const submitForm = async () => {
        setIsSubmitting(true);
        try {
            const response = await api.post('/leads', formData);
            updateData({ friendlyId: response.data.lead.friendlyId });
            setCurrentStep(5); // Show Thank You
            toast.success('Lead created successfully!');
        } catch (error: any) {
            console.error('Submission error:', error);
            toast.error(error.response?.data?.error || 'Failed to save lead');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isThankYouStep = currentStep === 5;

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <header className="bg-[#4A1D59] p-4 text-white shadow-md">
                <div className="w-full px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="hidden">Megaplex Prime</span>
                    </div>
                    <div className="text-xl font-medium">{t.common.customerEnquiryForm}</div>
                    <button
                        onClick={() => {
                            if (user?.role === 'RECEPTIONIST_2') {
                                navigate('/receptionist/ipad-view');
                            } else {
                                navigate('/receptionist');
                            }
                        }}
                        className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <main className="flex-1 w-full px-6 py-6 flex flex-col mx-auto xl:container">
                {!isThankYouStep && (
                    <>
                        <div className="mb-12 relative select-none w-full">
                            <div className="absolute top-[20px] left-0 right-0 h-[2px] mx-5 z-0">
                                <div className="w-full h-full bg-gray-200"></div>
                                <div
                                    className="absolute top-0 left-0 h-full bg-[#4A1D59] transition-all duration-300"
                                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                ></div>
                            </div>

                            <div className="relative z-10 flex justify-between">
                                {steps.map((step) => (
                                    <div key={step.number} className="flex flex-col items-center gap-3">
                                        <div
                                            className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                                                currentStep >= step.number
                                                    ? "bg-[#351C43] border-[#351C43] text-white shadow-md scale-110"
                                                    : "bg-[#F3E8FF] border-[#F3E8FF] text-[#4A1D59]"
                                            )}
                                        >
                                            {step.number}
                                        </div>
                                        <span className={cn(
                                            "text-xs font-semibold whitespace-nowrap",
                                            currentStep >= step.number ? "text-[#351C43]" : "text-gray-400"
                                        )}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end items-start mb-6 relative">
                            <div className="bg-[#F3E8FF] rounded-full p-1 flex relative z-30 shadow-sm ml-4">
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-medium transition-all relative z-40",
                                        language === 'en'
                                            ? "bg-[#E6D5F0] text-[#4A1D59] font-bold shadow-sm"
                                            : "text-foreground/60 hover:bg-black/5"
                                    )}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => setLanguage('mr')}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-medium transition-all relative z-40",
                                        language === 'mr'
                                            ? "bg-[#E6D5F0] text-[#4A1D59] font-bold shadow-sm"
                                            : "text-foreground/60 hover:bg-black/5"
                                    )}
                                >
                                    मराठी
                                </button>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex-1 bg-white">
                    {currentStep === 1 && (
                        <PersonalInfoStep
                            onNext={(data) => { updateData(data); handleNext(); }}
                            language={language}
                            initialData={formData}
                        />
                    )}
                    {currentStep === 2 && (
                        <ContactWorkInfoStep
                            onNext={(data) => { updateData(data); handleNext(); }}
                            onBack={handleBack}
                            language={language}
                            initialData={formData}
                        />
                    )}
                    {currentStep === 3 && (
                        <PropertyDetailsStep
                            onNext={(data) => { updateData(data); handleNext(); }}
                            onBack={handleBack}
                            language={language}
                            initialData={formData}
                        />
                    )}
                    {currentStep === 4 && (
                        <FeedbackStep
                            onNext={(data) => { updateData(data); handleNext(); }}
                            onBack={handleBack}
                            language={language}
                            initialData={formData}
                            isSubmitting={isSubmitting}
                        />
                    )}
                    {currentStep === 5 && <ThankYouStep language={language} leadId={formData.friendlyId} />}
                </div>
            </main>
        </div>
    );
};

export default NewLeadForm;
