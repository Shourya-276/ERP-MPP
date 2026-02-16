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
        const requiredFields = [
            formData.firstName,
            formData.lastName,
            formData.gender,
            formData.age,
            formData.nationality,
            formData.aadhar.length === 12, // Aadhar must be 12 digits
            formData.email,
            formData.phone.length === 10,
            formData.maritalStatus
        ];

        // If married, spouse name might be mandatory or not. I'll stick to basic required for now.
        return requiredFields.every(field => field);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <style dangerouslySetInnerHTML={{ __html: dateInputStyles }} />
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">{tc.shareRequirements}</h2>
                <p className="text-muted-foreground text-sm">{tc.followSteps}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Row 1: Date & Photo */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">{t.dob}</label>
                    <div className="relative group">
                        <Input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                            className="bg-[#FAFAFA] border-gray-100 w-full pr-10 appearance-none relative z-10"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-0 group-hover:text-[#4A1D59] transition-colors" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">{t.photo}</label>

                    {!photo ? (
                        <div
                            onClick={() => setIsCameraOpen(true)}
                            className="border hover:bg-gray-50 transition cursor-pointer border-dashed border-gray-300 rounded-lg h-10 flex items-center justify-center gap-2 text-sm text-gray-500"
                        >
                            <Camera className="w-4 h-4" />
                            {t.takePhoto}
                        </div>
                    ) : (
                        <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                            <img src={photo} alt="Captured" className="w-full h-full object-cover" />
                            <button
                                onClick={removePhoto}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Camera Modal */}
                <Dialog open={isCameraOpen} onOpenChange={(open) => !open && stopCamera()}>
                    <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-black border-none text-white">
                        <div className="relative aspect-video bg-black flex items-center justify-center">
                            {cameraError ? (
                                <div className="p-6 text-center">
                                    <p className="text-red-400 text-sm font-medium">{cameraError}</p>
                                    <Button
                                        variant="outline"
                                        onClick={stopCamera}
                                        className="mt-4 border-white/20 text-white hover:bg-white/10"
                                    >
                                        Close
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-full object-cover"
                                    />
                                    <canvas ref={canvasRef} className="hidden" />
                                </>
                            )}
                        </div>
                        <div className="p-4 flex justify-between items-center bg-zinc-900">
                            <Button variant="ghost" onClick={stopCamera} className="text-gray-400 hover:text-white">{tc.cancel}</Button>
                            {!cameraError && (
                                <Button onClick={takePhoto} className="rounded-full w-12 h-12 p-0 border-4 border-white bg-transparent hover:bg-white/20 transition-all">
                                    <div className="w-8 h-8 bg-red-500 rounded-full" />
                                </Button>
                            )}
                            <div className="w-16" /> {/* Spacer */}
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Row 2: Name */}
                <div className="md:col-span-2 grid grid-cols-12 gap-4">
                    <div className="col-span-3 space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">{t.title}<span className="text-red-500">*</span></label>
                        <Select
                            value={formData.title}
                            onValueChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
                        >
                            <SelectTrigger className="bg-[#FAFAFA] border-gray-100">
                                <SelectValue placeholder={t.options.title.mr} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mr">{t.options.title.mr}</SelectItem>
                                <SelectItem value="mrs">{t.options.title.mrs}</SelectItem>
                                <SelectItem value="ms">{t.options.title.ms}</SelectItem>
                                <SelectItem value="dr">{t.options.title.dr}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="col-span-3 space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">{t.firstName}<span className="text-red-500">*</span></label>
                        <Input
                            placeholder="First"
                            className="bg-[#FAFAFA] border-gray-100"
                            value={formData.firstName}
                            onChange={(e) => handleNameChange('firstName', e.target.value)}
                        />
                    </div>
                    <div className="col-span-3 space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">{t.middle}</label>
                        <Input
                            placeholder="Middle"
                            className="bg-[#FAFAFA] border-gray-100"
                            value={formData.middleName}
                            onChange={(e) => handleNameChange('middleName', e.target.value)}
                        />
                    </div>
                    <div className="col-span-3 space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">{t.lastName}<span className="text-red-500">*</span></label>
                        <Input
                            placeholder="Last"
                            className="bg-[#FAFAFA] border-gray-100"
                            value={formData.lastName}
                            onChange={(e) => handleNameChange('lastName', e.target.value)}
                        />
                    </div>
                </div>

                {/* Row 3: Gender, Age, Nationality */}
                <div className="md:col-span-2 grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">{t.gender}<span className="text-red-500">*</span></label>
                        <Select
                            value={formData.gender}
                            onValueChange={(val) => setFormData(prev => ({ ...prev, gender: val }))}
                        >
                            <SelectTrigger className="bg-[#FAFAFA] border-gray-100">
                                <SelectValue placeholder={t.select} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">{t.options.gender.male}</SelectItem>
                                <SelectItem value="female">{t.options.gender.female}</SelectItem>
                                <SelectItem value="other">{t.options.gender.other}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">{t.age}<span className="text-red-500">*</span></label>
                        <Input
                            placeholder="Age"
                            className="bg-[#FAFAFA] border-gray-100"
                            value={formData.age}
                            onChange={(e) => handleAgeChange(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">{t.nationality}<span className="text-red-500">*</span></label>
                        <Select
                            value={formData.nationality}
                            onValueChange={(val) => setFormData(prev => ({ ...prev, nationality: val }))}
                        >
                            <SelectTrigger className="bg-[#FAFAFA] border-gray-100">
                                <SelectValue placeholder={t.select} />
                            </SelectTrigger>
                            <SelectContent>
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
                    <label className="text-sm font-medium text-[#4A1D59]">{t.aadhar}<span className="text-red-500">*</span></label>
                    <Input
                        placeholder="Enter 12 digit Aadhar number"
                        className="bg-[#FAFAFA] border-gray-100"
                        value={formData.aadhar}
                        onChange={(e) => handleAadharChange(e.target.value)}
                    />
                    {formData.aadhar.length > 0 && formData.aadhar.length < 12 && (
                        <p className="text-[10px] text-red-500">Aadhar card must be exactly 12 digits</p>
                    )}
                </div>

                {/* Row 4: Email */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">{t.email}<span className="text-red-500">*</span></label>
                    <Input
                        placeholder="your@email.com"
                        className="bg-[#FAFAFA] border-gray-100"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                </div>

                {/* Row 5: Phone */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-[#4A1D59]">{t.phone}<span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                        <div className="w-24 bg-[#FAFAFA] border border-gray-100 rounded-md flex items-center justify-center gap-2 text-sm">
                            <span className="text-lg">🇮🇳</span> +91
                        </div>
                        <Input
                            placeholder="Enter 10 phone number"
                            className="flex-1 bg-[#FAFAFA] border-gray-100"
                            value={formData.phone}
                            onChange={(e) => handlePhoneChange('phone', e.target.value)}
                        />
                        <Button className="bg-[#8E7BB0] hover:bg-[#7b6a9a] text-white">{tc.verify}</Button>
                    </div>
                    <div className="text-xs text-[#4A1D59] font-medium cursor-pointer hover:underline text-left">{t.addAlternateInfo}</div>
                </div>

                {/* Row 6: Marital Status */}
                <div className="md:col-span-2 grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">{t.maritalStatus}<span className="text-red-500">*</span></label>
                        <Select
                            value={formData.maritalStatus}
                            onValueChange={(val) => setFormData(prev => ({ ...prev, maritalStatus: val }))}
                        >
                            <SelectTrigger className="bg-[#FAFAFA] border-gray-100">
                                <SelectValue placeholder={t.selectStatus} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="single">{t.options.maritalStatus.single}</SelectItem>
                                <SelectItem value="married">{t.options.maritalStatus.married}</SelectItem>
                                <SelectItem value="divorced">{t.options.maritalStatus.divorced}</SelectItem>
                                <SelectItem value="widowed">{t.options.maritalStatus.widowed}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">{t.spouseName}</label>
                        <Input
                            placeholder={t.ifApplicable}
                            className="bg-[#FAFAFA] border-gray-100"
                            value={formData.spouseName}
                            onChange={(e) => handleNameChange('spouseName', e.target.value)}
                            disabled={formData.maritalStatus !== 'married'}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#4A1D59]">{t.phone}</label>
                        <div className="flex gap-2">
                            <div className="w-20 bg-[#FAFAFA] border border-gray-100 rounded-md flex items-center justify-center gap-1 text-xs px-1">
                                <span>🇮🇳</span> +91
                            </div>
                            <Input
                                placeholder="Phone"
                                className="flex-1 bg-[#FAFAFA] border-gray-100"
                                value={formData.spousePhone}
                                onChange={(e) => handlePhoneChange('spousePhone', e.target.value)}
                                disabled={formData.maritalStatus !== 'married'}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-12 pt-4">
                <Button variant="ghost" className="text-muted-foreground" disabled>{tc.back}</Button>
                <div className="flex flex-col items-end gap-2">
                    {!isStepValid() && (
                        <p className="text-[10px] text-red-500 font-medium">Please fill all required fields (*) correctly</p>
                    )}
                    <Button
                        onClick={() => onNext(formData)}
                        disabled={!isStepValid()}
                        className={cn(
                            "bg-[#4A1D59] hover:bg-[#3d184a] text-white rounded-lg px-8 py-6 text-sm font-medium transition-all",
                            !isStepValid() && "opacity-50 cursor-not-allowed bg-gray-400"
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
