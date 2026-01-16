import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ClipboardCheck } from 'lucide-react';

const ThankYouStep: React.FC = () => {

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

            {/* Illustration Placeholder - matching the one in the screenshot which is a person with a checklist */}
            <div className="mb-8 relative">
                <ClipboardCheck className="w-48 h-48 text-[#4A1D59] opacity-10" />
                <img
                    src="https://placehold.co/300x250/png?text=Success+Illustration"
                    alt="Detailed Checklist Illustration"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 object-contain"
                />
                {/* Note: In a real implementation I would put the SVG code or import the image asset provided. 
                 Since I can't see the exact asset file path, I am using a placeholder that represents the visual weight. 
             */}
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                Thank You <span className="text-[#4A1D59]">Dr. Shreya Patil!</span>
            </h2>

            <p className="text-xl font-medium text-foreground/80 mb-6 text-center">
                You're one step closer to your new home!
            </p>

            <p className="text-center text-muted-foreground max-w-lg mx-auto leading-relaxed">
                We've received your inquiry and our team is reviewing the details you shared about your housing needs.
                One of our property specialists will be in touch shortly to help you explore the best options for your ideal home.
            </p>

            {/* Confetti Visuals are handled by canvas-confetti, floating shapes can be added via CSS background or absolute divs 
            if specific shapes are needed like in the image (triangles, squares floating around).
        */}
        </div>
    );
};

export default ThankYouStep;
