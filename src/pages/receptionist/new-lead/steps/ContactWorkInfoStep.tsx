import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { translations, Language } from '../translations';

interface ContactWorkInfoStepProps {
    /** Callback to proceed to next step (Step 3) */
    onNext: () => void;
    /** Callback to go back to previous step (Step 1) */
    onBack: () => void;
    /** Current language */
    language: Language;
}

/**
 * @component ContactWorkInfoStep
 * @description Step 2 of the New Lead Form.
 * Captures:
 * 1. Residence Details (Owned/Rented, Address).
 * 2. Work Details (Salaried, Self-employed, etc.).
 * 
 * Note: The form dynamically changes fields based on the selected 'workType'.
 */
const ContactWorkInfoStep: React.FC<ContactWorkInfoStepProps> = ({ onNext, onBack, language }) => {
    // Current selected work type, defaults to 'Salaried'
    // This drives the conditional rendering of the 'Work Details' section
    const [workType, setWorkType] = useState('Salaried');

    // Translation helpers
    const t = translations[language].contactWork;
    const tc = translations[language].common;

    // Map internal work types to localized display strings
    const workTypeMap: Record<string, string> = {
        'Salaried': t.workTypes.salaried,
        'Government': t.workTypes.government,
        'Self-employed': t.workTypes.selfEmployed,
        'Freelancer': t.workTypes.freelancer,
        'Retired': t.workTypes.retired
    };

    /**
     * Determines and returns the localized header for the dynamic work details section.
     */
    const getWorkDetailsHeader = () => {
        switch (workType) {
            case 'Self-employed': return t.workTypes.selfEmployed;
            case 'Government': return t.workTypes.government;
            case 'Freelancer': return t.workTypes.freelancer;
            case 'Retired': return t.workTypes.retired;
            default: return workTypeMap[workType] || workType;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">{tc.shareRequirements}</h2>
                <p className="text-muted-foreground text-sm">{tc.followSteps}</p>
            </div>

            {/* Current Residence Type */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">{t.currentResidenceType}<span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                    <button className="flex-1 py-3 px-4 rounded-lg border-2 border-[#4A1D59] bg-[#E6D5F0] text-[#4A1D59] font-medium flex items-center gap-2 justify-center">
                        <span className="w-4 h-4 rounded bg-[#4A1D59] flex items-center justify-center">
                            <span className="text-white text-[10px]">✓</span>
                        </span>
                        {t.ownedHouse}
                    </button>
                    <button className="flex-1 py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-500 font-medium flex items-center gap-2 justify-center hover:bg-gray-50">
                        <span className="w-4 h-4 rounded border border-gray-300"></span>
                        {t.rentedHouse}
                    </button>
                </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#4A1D59]">{t.shareAddress}<span className="text-red-500">*</span></label>
                <Input placeholder={t.enterAddress} className="bg-[#FAFAFA] border-gray-100 h-12" />
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">{t.location}<span className="text-red-500">*</span></label>
                    <Input placeholder="e.g. Vikhroli" className="bg-[#FAFAFA] border-gray-100 h-12" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">{t.subLocation}</label>
                    <Input placeholder="e.g. Kannamwar Nagar" className="bg-[#FAFAFA] border-gray-100 h-12" />
                </div>
            </div>

            {/* Pin Code */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#4A1D59]">{t.pinCode}<span className="text-red-500">*</span></label>
                <Input placeholder="Enter pin code" className="bg-[#FAFAFA] border-gray-100 h-12" />
            </div>

            {/* Work Type */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">{t.describeWorkType}<span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                    {['Salaried', 'Government', 'Self-employed', 'Freelancer', 'Retired'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setWorkType(type)}
                            className={cn(
                                "px-6 py-2 rounded-full text-xs font-medium transition-colors",
                                workType === type
                                    ? "bg-[#4A1D59] text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            )}
                        >
                            {workTypeMap[type]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Conditional Work Details */}
            <div className="bg-[#F8F9FE] p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-3 bg-[#4A1D59] rounded-full"></div>
                    <h3 className="font-semibold text-[#4A1D59] text-sm">
                        {getWorkDetailsHeader()} {t.detailsSuffix}
                    </h3>
                </div>

                {workType === 'Salaried' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#4A1D59]">{t.fields.jobTitle}<span className="text-red-500">*</span></label>
                            <Input placeholder="e.g. Software Engineer" className="bg-white border-gray-200" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#4A1D59]">{t.fields.orgName}</label>
                            <Input placeholder="e.g. Megaplex Prime" className="bg-white border-gray-200" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#4A1D59]">{t.fields.companyType}<span className="text-red-500">*</span></label>
                            <Select>
                                <SelectTrigger className="bg-white border-gray-200">
                                    <SelectValue placeholder={translations[language].personalInfo.select} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="private">Private</SelectItem>
                                    <SelectItem value="mnc">MNC</SelectItem>
                                    <SelectItem value="startup">Startup</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {workType === 'Self-employed' && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#4A1D59]">{t.fields.businessType}<span className="text-red-500">*</span></label>
                            <Select>
                                <SelectTrigger className="bg-white border-gray-200">
                                    <SelectValue placeholder={translations[language].personalInfo.select} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                                    <SelectItem value="partnership">Partnership</SelectItem>
                                    <SelectItem value="private_limited">Private Limited</SelectItem>
                                    <SelectItem value="llp">LLP</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#4A1D59]">{t.fields.yearsInBusiness}<span className="text-red-500">*</span></label>
                            <Input placeholder="Years" className="bg-white border-gray-200" />
                        </div>
                    </div>
                )}

                {workType === 'Freelancer' && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#4A1D59]">{t.fields.fieldOfWork}<span className="text-red-500">*</span></label>
                            <Input placeholder="e.g., Graphic Design, Consulting" className="bg-white border-gray-200" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#4A1D59]">{t.fields.yearsOfExperience}<span className="text-red-500">*</span></label>
                            <Input placeholder="Years" className="bg-white border-gray-200" />
                        </div>
                    </div>
                )}

                {workType === 'Retired' && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#4A1D59]">{t.fields.prevOccupation}<span className="text-red-500">*</span></label>
                            <Input placeholder="e.g., Bank Manager" className="bg-white border-gray-200" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#4A1D59]">{t.fields.yearsSinceRetirement}<span className="text-red-500">*</span></label>
                            <Input placeholder="Years" className="bg-white border-gray-200" />
                        </div>
                    </div>
                )}

                {workType === 'Government' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-[#4A1D59]">{t.fields.department}<span className="text-red-500">*</span></label>
                                <Input placeholder="e.g., IT" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-[#4A1D59]">{t.fields.designation}<span className="text-red-500">*</span></label>
                                <Input placeholder="e.g., Employee" className="bg-white border-gray-200" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#4A1D59]">{t.fields.yearsOfService}<span className="text-red-500">*</span></label>
                            <Input placeholder="Years" className="bg-white border-gray-200" />
                        </div>
                    </div>
                )}
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

export default ContactWorkInfoStep;
