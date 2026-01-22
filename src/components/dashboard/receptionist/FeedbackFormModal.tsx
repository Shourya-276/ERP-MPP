
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import megaplexLogo from '@/assets/megaplex-logo.png';

interface FeedbackFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customerName?: string;
}

const FeedbackRating = ({
    question,
    value,
    onChange
}: {
    question: string;
    value: number;
    onChange: (val: number) => void;
}) => {
    const getEmoji = (val: number) => {
        switch (val) {
            case 1: return "😖"; // Very Bad
            case 2: return "☹️"; // Bad
            case 3: return "😐"; // Okay
            case 4: return "🙂"; // Good
            case 5: return "🤩"; // Excellent
            default: return "😐";
        }
    };

    const getLabelColor = (val: number, currentVal: number) => {
        return val === currentVal ? "bg-[#E6D9F2] text-[#4A1D59] font-bold px-2 py-0.5 rounded" : "text-gray-500";
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
            <h3 className="text-[#4A1D59] font-medium text-center mb-6">{question}</h3>

            <div className="relative pt-8 pb-2">
                {/* Emoji Float */}
                <div
                    className="absolute top-0 transition-all duration-300 transform -translate-x-1/2 text-4xl filter drop-shadow-md"
                    style={{ left: `${((value - 1) / 4) * 100}%` }}
                >
                    {getEmoji(value)}
                </div>

                {/* Range Slider Track Customization to look like gradient line */}
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4A1D59] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />

                {/* Labels */}
                <div className="flex justify-between mt-3 text-xs font-medium">
                    <span className={getLabelColor(1, value)}>Very Bad</span>
                    <span className={getLabelColor(2, value)}>Bad</span>
                    <span className={getLabelColor(3, value)}>Okay</span>
                    <span className={getLabelColor(4, value)}>Good</span>
                    <span className={getLabelColor(5, value)}>Excellent</span>
                </div>
            </div>
        </div>
    );
};

export const FeedbackFormModal: React.FC<FeedbackFormModalProps> = ({ open, onOpenChange, customerName = "Rajesh Kumar" }) => {
    const [ratings, setRatings] = useState({
        onboarding: 3,
        staff: 3,
        projectShared: 3,
        explanation: 5,
        overall: 5
    });
    const [comment, setComment] = useState("");

    const updateRating = (key: keyof typeof ratings, val: number) => {
        setRatings(prev => ({ ...prev, [key]: val }));
    };

    const handleSubmit = () => {
        console.log({ ratings, comment });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-0 gap-0 bg-[#F5F5F7] overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-[#4A1D59] p-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2">
                        {/* Use img tag directly if import issues, but assuming import works from Dashboard context */}
                        <img src={megaplexLogo} alt="Megaplex" className="h-8 object-contain" />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-white font-medium">Feedback Form</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/10 rounded-full h-8 w-8"
                            onClick={() => onOpenChange(false)}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-y-auto flex-1 p-6 space-y-4">
                    {/* Info Banner */}
                    <div className="bg-[#E6D9F2] rounded-xl p-4 flex flex-wrap justify-between items-center text-[#4A1D59] text-sm gap-4">
                        <div>
                            <div className="font-semibold opacity-70 mb-1">Customer Name</div>
                            <div className="font-bold text-base">{customerName}</div>
                        </div>
                        <div>
                            <div className="font-semibold opacity-70 mb-1">Sales Executive</div>
                            <div className="font-bold text-base">Priya Sharma</div>
                        </div>
                        <div>
                            <div className="font-semibold opacity-70 mb-1">Date & Time</div>
                            <div className="font-bold text-base">Dec 19, 2025 • 3:45 PM</div>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="space-y-4">
                        <FeedbackRating
                            question="How was the onboarding experience?"
                            value={ratings.onboarding}
                            onChange={(val) => updateRating('onboarding', val)}
                        />
                        <FeedbackRating
                            question="How helpful was the staff?"
                            value={ratings.staff}
                            onChange={(val) => updateRating('staff', val)}
                        />
                        <FeedbackRating
                            question="How was the project shared with you?"
                            value={ratings.projectShared}
                            onChange={(val) => updateRating('projectShared', val)}
                        />
                        <FeedbackRating
                            question="How clear was the explanation provided?"
                            value={ratings.explanation}
                            onChange={(val) => updateRating('explanation', val)}
                        />
                        <FeedbackRating
                            question="Rate your overall experience"
                            value={ratings.overall}
                            onChange={(val) => updateRating('overall', val)}
                        />
                    </div>

                    {/* Comment Section */}
                    <div className="space-y-2">
                        <h3 className="text-[#4A1D59] font-medium pl-1">Would you like to share anything else?</h3>
                        <Textarea
                            placeholder="Your comments"
                            className="bg-white border-0 resize-none h-24 rounded-xl focus-visible:ring-1 focus-visible:ring-[#4A1D59]"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </div>

                {/* Footer Submit */}
                <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                    <Button
                        className="w-full bg-[#4A1D59] hover:bg-[#32103E] text-white h-12 rounded-xl text-base font-semibold"
                        onClick={handleSubmit}
                    >
                        Submit Feedback
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
};
