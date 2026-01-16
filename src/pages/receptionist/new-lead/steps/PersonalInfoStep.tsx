import React from 'react';
import { Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Using standard HTML input for date as shadcn calendar might be too big for this specific inline layout, 
// or I can Use Popover+Calendar if needed. Image shows "DD-MM-YYYY" text input style.

interface PersonalInfoStepProps {
    onNext: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ onNext }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">Share your requirements in just a few simple steps 🚀</h2>
                <p className="text-muted-foreground text-sm">Follow these three steps to find your perfect home effortlessly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Row 1: Date & Photo */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">Date</label>
                    <Input placeholder="DD-MM-YYYY" className="bg-[#FAFAFA] border-gray-100" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">Photo<span className="text-red-500">*</span></label>
                    <div className="border hover:bg-gray-50 transition cursor-pointer border-dashed border-gray-300 rounded-lg h-10 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Camera className="w-4 h-4" />
                        Take a photo
                    </div>
                </div>

                {/* Row 2: Name */}
                <div className="md:col-span-2 grid grid-cols-12 gap-4">
                    <div className="col-span-3 space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">Title<span className="text-red-500">*</span></label>
                        <Select>
                            <SelectTrigger className="bg-[#FAFAFA] border-gray-100">
                                <SelectValue placeholder="Mr" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mr">Mr</SelectItem>
                                <SelectItem value="mrs">Mrs</SelectItem>
                                <SelectItem value="ms">Ms</SelectItem>
                                <SelectItem value="dr">Dr</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="col-span-3 space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">First Name<span className="text-red-500">*</span></label>
                        <Input placeholder="First" className="bg-[#FAFAFA] border-gray-100" />
                    </div>
                    <div className="col-span-3 space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">Middle<span className="text-red-500">*</span></label>
                        <Input placeholder="Middle" className="bg-[#FAFAFA] border-gray-100" />
                    </div>
                    <div className="col-span-3 space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">Last Name<span className="text-red-500">*</span></label>
                        <Input placeholder="Last" className="bg-[#FAFAFA] border-gray-100" />
                    </div>
                </div>

                {/* Row 3: Gender, Age, Nationality */}
                <div className="md:col-span-2 grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">Gender<span className="text-red-500">*</span></label>
                        <Select>
                            <SelectTrigger className="bg-[#FAFAFA] border-gray-100">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">Age<span className="text-red-500">*</span></label>
                        <Input placeholder="Age" className="bg-[#FAFAFA] border-gray-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">Nationality<span className="text-red-500">*</span></label>
                        <Select>
                            <SelectTrigger className="bg-[#FAFAFA] border-gray-100">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="indian">Indian</SelectItem>
                                <SelectItem value="nri">NRI</SelectItem>
                                <SelectItem value="foreigner">Foreigner</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Row 4: Email */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">Email Address<span className="text-red-500">*</span></label>
                    <Input placeholder="your@email.com" className="bg-[#FAFAFA] border-gray-100" />
                </div>

                {/* Row 5: Phone */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">Phone Number<span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                        <div className="w-24 bg-[#FAFAFA] border border-gray-100 rounded-md flex items-center justify-center gap-2 text-sm">
                            <span className="text-lg">🇮🇳</span> +91
                        </div>
                        <Input placeholder="Enter phone number" className="flex-1 bg-[#FAFAFA] border-gray-100" />
                        <Button className="bg-[#8E7BB0] hover:bg-[#7b6a9a] text-white">Verify</Button>
                    </div>
                    <div className="text-xs text-[#4A1D59] font-medium cursor-pointer hover:underline text-left">+ Add alternate number</div>
                </div>

                {/* Row 6: Marital Status */}
                <div className="md:col-span-2 grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">Marital Status<span className="text-red-500">*</span></label>
                        <Select>
                            <SelectTrigger className="bg-[#FAFAFA] border-gray-100">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married">Married</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">Spouse Name<span className="text-red-500">*</span></label>
                        <Input placeholder="If applicable" className="bg-[#FAFAFA] border-gray-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">Phone Number</label>
                        <div className="flex gap-2">
                            <div className="w-20 bg-[#FAFAFA] border border-gray-100 rounded-md flex items-center justify-center gap-1 text-xs px-1">
                                <span>🇮🇳</span> +91
                            </div>
                            <Input placeholder="Enter phone number" className="flex-1 bg-[#FAFAFA] border-gray-100" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-12 pt-4">
                <Button variant="ghost" className="text-muted-foreground" disabled>← Back</Button>
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

export default PersonalInfoStep;
