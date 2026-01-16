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
                "relative h-[400px] rounded-[32px] p-8 overflow-hidden flex flex-col justify-between group cursor-pointer transition-transform hover:scale-[1.01]",
                className
            )}
            style={{ background }}
            onClick={onClick}
        >
            <div className="relative z-10">
                <h2 className="text-4xl font-bold text-foreground mb-4">{title}</h2>
                <p className="text-foreground/80 text-lg">{subtitle}</p>
            </div>

            <div className="relative z-10">
                <div className="w-14 h-14 rounded-full border border-foreground/20 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-foreground" />
                </div>
            </div>

            {/* Decorative Circles */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    background: circle1Color,
                    width: '372px', height: '372px',
                    top: '180px', left: '233px',
                }}
            />
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    background: circle2Color,
                    width: '316px', height: '316px',
                    top: '237px', left: '260px',
                }}
            >
                {icon}
            </div>
        </div>
    );
};
