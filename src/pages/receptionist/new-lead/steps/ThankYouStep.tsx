import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WifiOff, PlusCircle } from 'lucide-react';
import thankyouIllustration from '@/assets/thankyou-illustration.png';
import { translations, Language } from '../translations';
import { Button } from '@/components/ui/button';

interface ThankYouStepProps {
    language: Language;
    leadId?: string;
    isOffline?: boolean;
    onNewForm?: () => void;
}

const ThankYouStep: React.FC<ThankYouStepProps> = ({ language, leadId, isOffline, onNewForm }) => {
    const t = translations[language].thankYou;

    useEffect(() => {
        // Only fire confetti for online saves
        if (isOffline) return;

        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, [isOffline]);

    return (
        <div className="flex flex-col items-center justify-center h-full pt-10 animate-in zoom-in duration-500">
            <div className="mb-8">
                <img
                    src={thankyouIllustration}
                    alt="Thank You Illustration"
                    className="h-[300px] w-auto object-contain"
                />
            </div>

            {isOffline ? (
                <>
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-full mb-6 font-bold shadow-lg flex items-center gap-2 animate-in zoom-in-75 duration-500">
                        <WifiOff className="w-4 h-4" />
                        Saved Offline
                    </div>

                    {leadId && (
                        <div className="bg-amber-100 text-amber-800 px-5 py-2 rounded-full mb-4 font-bold text-sm shadow-sm">
                            Ref: {leadId}
                        </div>
                    )}

                    <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                        {t.title}
                    </h2>

                    <p className="text-xl font-medium text-foreground/80 mb-6 text-center">
                        {language === 'mr'
                            ? 'तुमचा डेटा स्थानिक पातळीवर जतन झाला आहे'
                            : 'Your data has been saved locally'}
                    </p>

                    <div className="text-center text-muted-foreground max-w-lg mx-auto leading-relaxed bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
                        <p className="text-sm">
                            {language === 'mr'
                                ? 'इंटरनेट कनेक्शन पुनर्स्थापित झाल्यावर तुमचा डेटा आपोआप अपलोड होईल. कृपया काळजी करू नका — तुमची सर्व माहिती (फोटो आणि स्वाक्षरीसह) सुरक्षितपणे जतन केली आहे.'
                                : 'Your data will be automatically uploaded once the internet connection is restored. Don\'t worry — all your information (including photo and signature) has been saved securely on this device.'}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-[#4A1D59] text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg animate-bounce">
                        Lead ID: {leadId || 'GEN-0001'}
                    </div>

                    <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                        {t.title}
                    </h2>

                    <p className="text-xl font-medium text-foreground/80 mb-6 text-center">
                        {t.subtitle}
                    </p>

                    <p className="text-center text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8">
                        {t.message}
                    </p>
                </>
            )}

            {onNewForm && (
                <Button
                    onClick={onNewForm}
                    className="bg-[#4A1D59] hover:bg-[#3d184a] text-white rounded-xl px-10 py-6 text-sm font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                    <PlusCircle className="w-5 h-5" />
                    {language === 'mr' ? 'नवीन चौकशी' : 'New Enquiry'}
                </Button>
            )}
        </div>
    );
};

export default ThankYouStep;
