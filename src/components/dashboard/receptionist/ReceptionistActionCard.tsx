import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReceptionistActionCardProps {
    title: React.ReactNode;
    subtitle: string;
    background: string;
    circle1Color: string;
    circle2Color: string;
    icon: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const ReceptionistActionCard: React.FC<ReceptionistActionCardProps> = ({
    title,
    subtitle,
    background,
    circle1Color,
    circle2Color,
    icon,
    onClick,
    className,
}) => {
    return (
        <div
            className={cn(
                "relative h-[250px] md:h-[400px] rounded-[24px] md:rounded-[32px] p-6 md:p-8 overflow-hidden flex flex-col justify-between group cursor-pointer transition-transform hover:scale-[1.01]",
                className
            )}
            style={{ background }}
            onClick={onClick}
        >
            <div className="relative z-10">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">{title}</h2>
                <p className="text-foreground/80 text-base md:text-lg">{subtitle}</p>
            </div>

            <div className="relative z-10">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-foreground/20 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                </div>
            </div>

            {/* Decorative Circles - Adjusted or hidden on small mobile if needed, but I'll keep them with overflow hidden */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    background: circle1Color,
                    width: '372px', height: '372px',
                    top: '120px', left: '180px', // Shifted up/left for mobile
                }}
            />
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    background: circle2Color,
                    width: '316px', height: '316px',
                    top: '180px', left: '210px', // Shifted up/left for mobile
                }}
            >
                {icon}
            </div>
        </div>
    );
};
