import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContactWorkInfoStepProps {
    onNext: () => void;
    onBack: () => void;
}

const ContactWorkInfoStep: React.FC<ContactWorkInfoStepProps> = ({ onNext, onBack }) => {
    const [workType, setWorkType] = useState('Salaried');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">Share your requirements in just a few simple steps 🚀</h2>
                <p className="text-muted-foreground text-sm">Follow these three steps to find your perfect home effortlessly.</p>
            </div>

            {/* Current Residence Type */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">What is your current residence type?<span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                    <button className="flex-1 py-3 px-4 rounded-lg border-2 border-[#4A1D59] bg-[#E6D5F0] text-[#4A1D59] font-medium flex items-center gap-2 justify-center">
                        <span className="w-4 h-4 rounded bg-[#4A1D59] flex items-center justify-center">
                            <span className="text-white text-[10px]">✓</span>
                        </span>
                        Owned House
                    </button>
                    <button className="flex-1 py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-500 font-medium flex items-center gap-2 justify-center hover:bg-gray-50">
                        <span className="w-4 h-4 rounded border border-gray-300"></span>
                        Rented House
                    </button>
                </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#4A1D59]">Share Your Current Address<span className="text-red-500">*</span></label>
                <Input placeholder="Enter street address" className="bg-[#FAFAFA] border-gray-100 h-12" />
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">Location<span className="text-red-500">*</span></label>
                    <Input placeholder="e.g. Vikhroli" className="bg-[#FAFAFA] border-gray-100 h-12" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">Sub Location</label>
                    <Input placeholder="e.g. Kannamwar Nagar" className="bg-[#FAFAFA] border-gray-100 h-12" />
                </div>
            </div>

            {/* Pin Code */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#4A1D59]">Pin Code<span className="text-red-500">*</span></label>
                <Input placeholder="Enter pin code" className="bg-[#FAFAFA] border-gray-100 h-12" />
            </div>

            {/* Work Type */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#4A1D59]">Describe Your Work Type<span className="text-red-500">*</span></label>
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
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Conditional Work Details - Salaried Example */}
            <div className="bg-[#F8F9FE] p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-3 bg-[#4A1D59] rounded-full"></div>
                    <h3 className="font-semibold text-[#4A1D59] text-sm">{workType} Employment Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-[#4A1D59]">Job Title<span className="text-red-500">*</span></label>
                        <Input placeholder="e.g. Software Engineer" className="bg-white border-gray-200" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-[#4A1D59]">Organization Name</label>
                        <Input placeholder="e.g. Megaplex Prime" className="bg-white border-gray-200" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-[#4A1D59]">Company Type<span className="text-red-500">*</span></label>
                        <Select>
                            <SelectTrigger className="bg-white border-gray-200">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="private">Private</SelectItem>
                                <SelectItem value="mnc">MNC</SelectItem>
                                <SelectItem value="startup">Startup</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-12 pt-4">
                <Button onClick={onBack} variant="ghost" className="text-muted-foreground">← Back</Button>
                <Button
                    onClick={onNext}
                    className="bg-[#4A1D59] hover:bg-[#3d184a] text-white rounded-lg px-8 py-6 text-sm font-medium"
                >
                    Continue →
                </Button>
            </div>
        </div>
    );
};

export default ContactWorkInfoStep;
