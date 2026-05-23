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

const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

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
        dob: getTodayDateString(),

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

    const handleNext = (stepData?: any) => {
        if (stepData) {
            updateData(stepData);
        }

        if (currentStep === 4) {
            submitForm(stepData);
        } else {
            setCurrentStep((prev) => Math.min(prev + 1, 5));
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const submitForm = async (finalData?: any) => {
        setIsSubmitting(true);
        try {
            // Use finalData to avoid stale state issues in the final step
            const dataToSubmit = finalData ? { ...formData, ...finalData } : formData;
            const response = await api.post('/leads', dataToSubmit);
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
            <header className="bg-[#4A1D59] py-6 px-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]"></div>
                <div className="w-full flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                             <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45"></div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold tracking-tight">{t.common.customerEnquiryForm}</h1>
                            <p className="text-[10px] text-purple-200 uppercase tracking-widest font-bold">Megaplex Prime ERP</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => {
                            if (user?.role === 'RECEPTIONIST_2') {
                                navigate('/receptionist/ipad-view');
                            } else {
                                navigate('/receptionist');
                            }
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-all backdrop-blur-md border border-white/10 active:scale-90"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="flex-1 w-full px-6 py-6 flex flex-col mx-auto xl:container">
                {!isThankYouStep && (
                    <>
                        <div className="mb-12 relative select-none w-full max-w-4xl mx-auto px-4">
                            <div className="absolute top-[20px] left-0 right-0 h-[3px] mx-8 z-0">
                                <div className="w-full h-full bg-gray-100 rounded-full"></div>
                                <div
                                    className="absolute top-0 left-0 h-full bg-[#4A1D59] transition-all duration-700 ease-in-out rounded-full shadow-[0_0_10px_rgba(74,29,89,0.3)]"
                                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                ></div>
                            </div>

                            <div className="relative z-10 flex justify-between">
                                {steps.map((step) => (
                                    <div key={step.number} className="flex flex-col items-center gap-3">
                                        <div
                                            className={cn(
                                                "w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 border-2",
                                                currentStep >= step.number
                                                    ? "bg-[#4A1D59] border-[#4A1D59] text-white shadow-lg shadow-purple-200 scale-110"
                                                    : "bg-white border-gray-100 text-gray-300"
                                            )}
                                        >
                                            {step.number}
                                        </div>
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider transition-colors duration-500",
                                            currentStep >= step.number ? "text-[#4A1D59] scale-105" : "text-gray-300"
                                        )}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end items-start mb-8">
                            <div className="bg-gray-100/50 p-1 rounded-2xl flex relative z-30 border border-gray-100">
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={cn(
                                        "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all relative z-40",
                                        language === 'en'
                                            ? "bg-white text-[#4A1D59] shadow-sm"
                                            : "text-gray-400 hover:text-gray-600"
                                    )}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => setLanguage('mr')}
                                    className={cn(
                                        "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all relative z-40",
                                        language === 'mr'
                                            ? "bg-white text-[#4A1D59] shadow-sm"
                                            : "text-gray-400 hover:text-gray-600"
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
                            onNext={handleNext}
                            language={language}
                            initialData={formData}
                        />
                    )}
                    {currentStep === 2 && (
                        <ContactWorkInfoStep
                            onNext={handleNext}
                            onBack={handleBack}
                            language={language}
                            initialData={formData}
                        />
                    )}
                    {currentStep === 3 && (
                        <PropertyDetailsStep
                            onNext={handleNext}
                            onBack={handleBack}
                            language={language}
                            initialData={formData}
                        />
                    )}
                    {currentStep === 4 && (
                        <FeedbackStep
                            onNext={handleNext}
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
