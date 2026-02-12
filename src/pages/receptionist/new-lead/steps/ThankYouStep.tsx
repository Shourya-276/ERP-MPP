import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import thankyouIllustration from '@/assets/thankyou-illustration.png';
import { translations, Language } from '../translations';

interface ThankYouStepProps {
    language: Language;
    leadId?: string;
}

const ThankYouStep: React.FC<ThankYouStepProps> = ({ language, leadId }) => {
    const t = translations[language].thankYou;

    useEffect(() => {
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
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full pt-10 animate-in zoom-in duration-500">
            <div className="mb-8">
                <img
                    src={thankyouIllustration}
                    alt="Thank You Illustration"
                    className="h-[300px] w-auto object-contain"
                />
            </div>

            <div className="bg-[#4A1D59] text-white px-6 py-2 rounded-full mb-6 font-bold shadow-lg animate-bounce">
                Lead ID: {leadId || 'GEN-0001'}
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                {t.title}
            </h2>

            <p className="text-xl font-medium text-foreground/80 mb-6 text-center">
                {t.subtitle}
            </p>

            <p className="text-center text-muted-foreground max-w-lg mx-auto leading-relaxed">
                {t.message}
            </p>
        </div>
    );
};

export default ThankYouStep;
