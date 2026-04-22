import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { translations, Language } from '../translations';

interface ContactWorkInfoStepProps {
    onNext: (data: any) => void;
    onBack: () => void;
    language: Language;
    initialData: any;
}

const ContactWorkInfoStep: React.FC<ContactWorkInfoStepProps> = ({ onNext, onBack, language, initialData }) => {
    const [residenceType, setResidenceType] = useState(initialData.residenceType || 'Owned');
    const [workType, setWorkType] = useState(initialData.workType || 'Salaried');

    const [formData, setFormData] = useState({
        address: initialData.address || '',
        location: initialData.location || '',
        city: initialData.city || '',
        subLocation: initialData.subLocation || '',
        pinCode: initialData.pinCode || '',
        jobTitle: initialData.jobTitle || '',
        orgName: initialData.orgName || '',
        companyType: initialData.companyType || '',
        businessType: initialData.businessType || '',
        yearsInBusiness: initialData.yearsInBusiness || '',
        fieldOfWork: initialData.fieldOfWork || '',
        yearsOfExperience: initialData.yearsOfExperience || '',
        prevOccupation: initialData.prevOccupation || '',
        yearsSinceRetirement: initialData.yearsSinceRetirement || '',
        department: initialData.department || '',
        designation: initialData.designation || '',
        yearsOfService: initialData.yearsOfService || ''
    });

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

    const handlePinCodeChange = (value: string) => {
        const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
        setFormData(prev => ({ ...prev, pinCode: digitsOnly }));
    };

    const handleNumericChange = (field: string, value: string, max: number = 2) => {
        const digitsOnly = value.replace(/\D/g, '').slice(0, max);
        setFormData(prev => ({ ...prev, [field]: digitsOnly }));
    };

    const isStepValid = () => {
        const basicValid = formData.address && formData.location && formData.pinCode.length === 6;

        let workValid = false;
        switch (workType) {
            case 'Salaried':
                workValid = !!(formData.jobTitle && formData.companyType);
                break;
            case 'Government':
                workValid = !!(formData.department && formData.designation && formData.yearsOfService);
                break;
            case 'Self-employed':
                workValid = !!(formData.businessType && formData.yearsInBusiness);
                break;
            case 'Freelancer':
                workValid = !!(formData.fieldOfWork && formData.yearsOfExperience);
                break;
            case 'Retired':
                workValid = !!(formData.prevOccupation && formData.yearsSinceRetirement);
                break;
        }

        return basicValid && workValid;
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">{tc.shareRequirements}</h2>
                <p className="text-muted-foreground text-sm">{tc.followSteps}</p>
            </div>

            {/* Current Residence Type */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.currentResidenceType}<span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                    <button
                        onClick={() => setResidenceType('Owned')}
                        className={cn(
                            "flex-1 py-4 px-6 rounded-2xl border-2 transition-all font-bold flex items-center gap-3 justify-center shadow-sm",
                            residenceType === 'Owned'
                                ? "border-[#4A1D59] bg-[#F5ECF9] text-[#4A1D59]"
                                : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                        )}
                    >
                        <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center transition-all",
                            residenceType === 'Owned' ? "bg-[#4A1D59] scale-110 shadow-sm" : "border-2 border-gray-200"
                        )}>
                            {residenceType === 'Owned' && <Check className="text-white w-3 h-3" />}
                        </div>
                        {t.ownedHouse}
                    </button>
                    <button
                        onClick={() => setResidenceType('Rented')}
                        className={cn(
                            "flex-1 py-4 px-6 rounded-2xl border-2 transition-all font-bold flex items-center gap-3 justify-center shadow-sm",
                            residenceType === 'Rented'
                                ? "border-[#4A1D59] bg-[#F5ECF9] text-[#4A1D59]"
                                : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                        )}
                    >
                        <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center transition-all",
                            residenceType === 'Rented' ? "bg-[#4A1D59] scale-110 shadow-sm" : "border-2 border-gray-200"
                        )}>
                            {residenceType === 'Rented' && <Check className="text-white w-3 h-3" />}
                        </div>
                        {t.rentedHouse}
                    </button>
                </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.shareAddress}<span className="text-red-500">*</span></label>
                <Input
                    placeholder={t.enterAddress}
                    className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                />
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.location}<span className="text-red-500">*</span></label>
                    <Input
                        placeholder="e.g. Vikhroli"
                        className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.city}</label>
                    <Input
                        placeholder="e.g. Mumbai"
                        className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.subLocation}</label>
                    <Input
                        placeholder="e.g. Nagar"
                        className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                        value={formData.subLocation}
                        onChange={(e) => setFormData(prev => ({ ...prev, subLocation: e.target.value }))}
                    />
                </div>
            </div>

            {/* Pin Code */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.pinCode}<span className="text-red-500">*</span></label>
                <Input
                    placeholder="Enter 6-digit pin code"
                    className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                    value={formData.pinCode}
                    onChange={(e) => handlePinCodeChange(e.target.value)}
                />
            </div>

            {/* Work Type */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.describeWorkType}<span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-3">
                    {['Salaried', 'Government', 'Self-employed', 'Freelancer', 'Retired'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setWorkType(type)}
                            className={cn(
                                "px-8 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95",
                                workType === type
                                    ? "bg-[#4A1D59] text-white shadow-[#4A1D59]/20"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            )}
                        >
                            {workTypeMap[type]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Conditional Work Details */}
            <div className="bg-[#FAF8FD] p-6 rounded-2xl space-y-5 border border-purple-100/50">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-3.5 bg-[#4A1D59] rounded-full"></div>
                    <h3 className="font-bold text-[#4A1D59] text-xs uppercase tracking-wider">
                        {getWorkDetailsHeader()} {t.detailsSuffix}
                    </h3>
                </div>

                {workType === 'Salaried' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase racking-tight">{t.fields.jobTitle}<span className="text-red-500">*</span></label>
                            <Input
                                placeholder="e.g. Software Engineer"
                                className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.jobTitle}
                                onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.orgName}</label>
                            <Input
                                placeholder="e.g. Org Name"
                                className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.orgName}
                                onChange={(e) => setFormData(prev => ({ ...prev, orgName: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.companyType}<span className="text-red-500">*</span></label>
                            <Select
                                value={formData.companyType}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, companyType: val }))}
                            >
                                <SelectTrigger className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20">
                                    <SelectValue placeholder={translations[language].personalInfo.select} />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="private">Private</SelectItem>
                                    <SelectItem value="mnc">MNC</SelectItem>
                                    <SelectItem value="startup">Startup</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
                {/* ... other work types would be updated similarly if we had them in a single block, but they are split by if-statements ... */}
                {/* I will update others as well to ensure total consistency */}
                {workType === 'Self-employed' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.businessType}<span className="text-red-500">*</span></label>
                            <Select
                                value={formData.businessType}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, businessType: val }))}
                            >
                                <SelectTrigger className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20">
                                    <SelectValue placeholder={translations[language].personalInfo.select} />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                                    <SelectItem value="partnership">Partnership</SelectItem>
                                    <SelectItem value="private_limited">Private Limited</SelectItem>
                                    <SelectItem value="llp">LLP</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.yearsInBusiness}<span className="text-red-500">*</span></label>
                            <Input
                                placeholder="Years"
                                className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.yearsInBusiness}
                                onChange={(e) => handleNumericChange('yearsInBusiness', e.target.value)}
                            />
                        </div>
                    </div>
                )}
                {workType === 'Freelancer' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.fieldOfWork}<span className="text-red-500">*</span></label>
                            <Input
                                placeholder="e.g., Graphic Design"
                                className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.fieldOfWork}
                                onChange={(e) => setFormData(prev => ({ ...prev, fieldOfWork: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.yearsOfExperience}<span className="text-red-500">*</span></label>
                            <Input
                                placeholder="Years"
                                className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.yearsOfExperience}
                                onChange={(e) => handleNumericChange('yearsOfExperience', e.target.value)}
                            />
                        </div>
                    </div>
                )}
                {workType === 'Retired' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.prevOccupation}<span className="text-red-500">*</span></label>
                            <Input
                                placeholder="e.g., Manager"
                                className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.prevOccupation}
                                onChange={(e) => setFormData(prev => ({ ...prev, prevOccupation: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.yearsSinceRetirement}<span className="text-red-500">*</span></label>
                            <Input
                                placeholder="Years"
                                className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.yearsSinceRetirement}
                                onChange={(e) => handleNumericChange('yearsSinceRetirement', e.target.value)}
                            />
                        </div>
                    </div>
                )}
                {workType === 'Government' && (
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.department}<span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="e.g., IT"
                                    className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                    value={formData.department}
                                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.designation}<span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="e.g., Executive"
                                    className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                    value={formData.designation}
                                    onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-tight">{t.fields.yearsOfService}<span className="text-red-500">*</span></label>
                            <Input
                                placeholder="Years"
                                className="bg-white border-gray-200 h-11 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.yearsOfService}
                                onChange={(e) => handleNumericChange('yearsOfService', e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
                <Button onClick={onBack} variant="ghost" className="text-gray-400 font-medium hover:text-[#4A1D59]">{tc.back}</Button>
                <div className="flex flex-col items-end gap-2">
                    {!isStepValid() && (
                        <p className="text-[10px] text-red-500 font-bold animate-pulse">Required fields (*) missing or incorrect</p>
                    )}
                    <Button
                        onClick={() => onNext({ ...formData, residenceType, workType })}
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

export default ContactWorkInfoStep;
