import React, { useState, useRef } from 'react';
import { Camera, X, Check, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { translations, Language } from '../translations';

/* Custom styles for date input pseudo-elements to hide browser icons */
const dateInputStyles = `
  input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
    z-index: 20;
  }
`;

interface PersonalInfoStepProps {
    onNext: (data: any) => void;
    language: Language;
    initialData: any;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ onNext, language, initialData }) => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        dob: initialData.dob || '',
        title: initialData.title || 'mr',
        firstName: initialData.firstName || '',
        middleName: initialData.middleName || '',
        lastName: initialData.lastName || '',
        gender: initialData.gender || '',
        age: initialData.age || '',
        nationality: initialData.nationality || '',
        aadhar: initialData.aadhar || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        maritalStatus: initialData.maritalStatus || '',
        spouseName: initialData.spouseName || '',
        spousePhone: initialData.spousePhone || ''
    });

    /* Refs for handling Video stream and Canvas capture */
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const t = translations[language].personalInfo;
    const tc = translations[language].common;

    /* Camera stream management */
    React.useEffect(() => {
        let stream: MediaStream | null = null;

        const startCamera = async () => {
            if (!isCameraOpen) return;

            // Check for secure context (HTTPS)
            if (!window.isSecureContext) {
                setCameraError("Camera requires a secure connection (HTTPS). Please contact your administrator.");
                return;
            }

            try {
                setCameraError(null);
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setCameraError("Could not access camera. Please ensure permissions are granted.");
            }
        };

        if (isCameraOpen) {
            startCamera();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isCameraOpen]);

    const stopCamera = () => {
        setIsCameraOpen(false);
        setCameraError(null);
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/png');
                setPhoto(dataUrl);
                stopCamera();
            }
        }
    };

    const removePhoto = () => {
        setPhoto(null);
    };

    // Validation helpers
    const handleNameChange = (field: string, value: string) => {
        // Only allow letters and spaces
        const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
        setFormData(prev => ({ ...prev, [field]: lettersOnly }));
    };

    const handleAadharChange = (value: string) => {
        // Only allow digits and max 12
        const digitsOnly = value.replace(/\D/g, '').slice(0, 12);
        setFormData(prev => ({ ...prev, aadhar: digitsOnly }));
    };

    const handlePhoneChange = (field: string, value: string) => {
        const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
        setFormData(prev => ({ ...prev, [field]: digitsOnly }));
    };

    const handleAgeChange = (value: string) => {
        const digitsOnly = value.replace(/\D/g, '').slice(0, 3);
        setFormData(prev => ({ ...prev, age: digitsOnly }));
    };

    const isStepValid = () => {
        const hasRequired = [
            formData.firstName,
            formData.lastName,
            formData.gender,
            formData.age,
            formData.nationality,
            formData.email,
            formData.phone.length === 10,
            formData.maritalStatus
        ].every(field => field);

        const isAadharValid = !formData.aadhar || formData.aadhar.length === 12;

        return hasRequired && isAadharValid;
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <style dangerouslySetInnerHTML={{ __html: dateInputStyles }} />
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">{tc.shareRequirements}</h2>
                <p className="text-muted-foreground text-sm">{tc.followSteps}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Row 1: Date & Photo */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59] uppercase racking-wider">{t.dob}</label>
                    <div className="relative group">
                        <Input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                            className="bg-[#FDFCFD] border-gray-200 h-12 w-full pr-10 appearance-none relative z-10 focus:ring-[#4A1D59]/20 focus:border-[#4A1D59] rounded-xl"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none z-0 group-hover:text-[#4A1D59] transition-colors" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.photo}</label>

                    {!photo ? (
                        <div
                            onClick={() => setIsCameraOpen(true)}
                            className="border-2 border-dashed border-gray-200 hover:border-[#4A1D59] hover:bg-purple-50/30 transition-all cursor-pointer rounded-xl h-12 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium"
                        >
                            <Camera className="w-5 h-5 text-[#4A1D59]/60" />
                            {t.takePhoto}
                        </div>
                    ) : (
                        <div className="relative w-full h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-200 group">
                            <div className="flex items-center px-4 h-full gap-3">
                                <img src={photo} alt="Captured" className="w-8 h-8 rounded-full object-cover border border-purple-200" />
                                <span className="text-xs text-gray-500 font-medium truncate flex-1">Photo captured successfully</span>
                                <button
                                    onClick={removePhoto}
                                    className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Camera Modal remains the same but ensure it is triggered correctly */}

                {/* Row 2: Name Alignment Fix */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.title}<span className="text-red-500">*</span></label>
                        <Select
                            value={formData.title}
                            onValueChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
                        >
                            <SelectTrigger className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20">
                                <SelectValue placeholder="Mr" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="mr">{t.options.title.mr}</SelectItem>
                                <SelectItem value="mrs">{t.options.title.mrs}</SelectItem>
                                <SelectItem value="ms">{t.options.title.ms}</SelectItem>
                                <SelectItem value="dr">{t.options.title.dr}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:col-span-4 space-y-2">
                        <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.firstName}<span className="text-red-500">*</span></label>
                        <Input
                            placeholder="e.g. John"
                            className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                            value={formData.firstName}
                            onChange={(e) => handleNameChange('firstName', e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.middle}</label>
                        <Input
                            placeholder="Middle"
                            className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                            value={formData.middleName}
                            onChange={(e) => handleNameChange('middleName', e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-4 space-y-2">
                        <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.lastName}<span className="text-red-500">*</span></label>
                        <Input
                            placeholder="e.g. Doe"
                            className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                            value={formData.lastName}
                            onChange={(e) => handleNameChange('lastName', e.target.value)}
                        />
                    </div>
                </div>

                {/* Row 3: Gender, Age, Nationality */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.gender}<span className="text-red-500">*</span></label>
                        <Select
                            value={formData.gender}
                            onValueChange={(val) => setFormData(prev => ({ ...prev, gender: val }))}
                        >
                            <SelectTrigger className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20">
                                <SelectValue placeholder={t.select} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="male">{t.options.gender.male}</SelectItem>
                                <SelectItem value="female">{t.options.gender.female}</SelectItem>
                                <SelectItem value="other">{t.options.gender.other}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.age}<span className="text-red-500">*</span></label>
                        <Input
                            placeholder="Enter Age"
                            className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                            value={formData.age}
                            onChange={(e) => handleAgeChange(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.nationality}<span className="text-red-500">*</span></label>
                        <Select
                            value={formData.nationality}
                            onValueChange={(val) => setFormData(prev => ({ ...prev, nationality: val }))}
                        >
                            <SelectTrigger className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20">
                                <SelectValue placeholder={t.select} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="indian">{t.options.nationality.indian}</SelectItem>
                                <SelectItem value="american">{t.options.nationality.american}</SelectItem>
                                <SelectItem value="british">{t.options.nationality.british}</SelectItem>
                                <SelectItem value="canadian">{t.options.nationality.canadian}</SelectItem>
                                <SelectItem value="other">{t.options.nationality.other}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Row 3.5: Aadhar Card */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.aadhar}</label>
                    <Input
                        placeholder="Enter 12 digit Aadhar number"
                        className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                        value={formData.aadhar}
                        onChange={(e) => handleAadharChange(e.target.value)}
                    />
                    {formData.aadhar.length > 0 && formData.aadhar.length < 12 && (
                        <p className="text-[10px] text-red-500 font-medium">Aadhar card must be exactly 12 digits</p>
                    )}
                </div>

                {/* Row 4: Email */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.email}<span className="text-red-500">*</span></label>
                    <Input
                        placeholder="your@email.com"
                        className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                </div>

                {/* Row 5: Phone */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.phone}<span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                        <div className="w-24 bg-[#FDFCFD] border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">
                            <span className="text-lg">🇮🇳</span> +91
                        </div>
                        <Input
                            placeholder="Enter 10 digit number"
                            className="flex-1 bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                            value={formData.phone}
                            onChange={(e) => handlePhoneChange('phone', e.target.value)}
                        />
                        <Button className="bg-[#8E7BB0] hover:bg-[#7b6a9a] text-white h-12 px-6 rounded-xl shadow-sm transition-all active:scale-95">{tc.verify}</Button>
                    </div>
                </div>

                {/* Row 6: Marital Status */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.maritalStatus}<span className="text-red-500">*</span></label>
                        <Select
                            value={formData.maritalStatus}
                            onValueChange={(val) => setFormData(prev => ({ ...prev, maritalStatus: val }))}
                        >
                            <SelectTrigger className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20">
                                <SelectValue placeholder={t.selectStatus} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="single">{t.options.maritalStatus.single}</SelectItem>
                                <SelectItem value="married">{t.options.maritalStatus.married}</SelectItem>
                                <SelectItem value="divorced">{t.options.maritalStatus.divorced}</SelectItem>
                                <SelectItem value="widowed">{t.options.maritalStatus.widowed}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.spouseName}</label>
                        <Input
                            placeholder={t.ifApplicable}
                            className="bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                            value={formData.spouseName}
                            onChange={(e) => handleNameChange('spouseName', e.target.value)}
                            disabled={formData.maritalStatus !== 'married'}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#4A1D59] uppercase tracking-wider">{t.phone}</label>
                        <div className="flex gap-2">
                            <div className="w-20 bg-[#FDFCFD] border border-gray-200 rounded-xl flex items-center justify-center gap-1 text-xs px-1 font-medium">
                                <span>🇮🇳</span> +91
                            </div>
                            <Input
                                placeholder="Phone"
                                className="flex-1 bg-[#FDFCFD] border-gray-200 h-12 rounded-xl focus:ring-[#4A1D59]/20"
                                value={formData.spousePhone}
                                onChange={(e) => handlePhoneChange('spousePhone', e.target.value)}
                                disabled={formData.maritalStatus !== 'married'}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
                <Button variant="ghost" className="text-gray-400 font-medium" disabled>{tc.back}</Button>
                <div className="flex flex-col items-end gap-2">
                    {!isStepValid() && (
                        <p className="text-[10px] text-red-500 font-bold animate-pulse">Required fields (*) missing or incorrect</p>
                    )}
                    <Button
                        onClick={() => onNext(formData)}
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

export default PersonalInfoStep;
