import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface AssignExecutiveModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAssign: (executiveName: string) => void;
    customerName: string;
    customerId: string;
}

const executives = [
    'Amit Sharma',
    'Rohit Singh',
    'Neha Kapoor',
    'Priya Gupta',
    'Yogesh Raut'
];

export const AssignExecutiveModal: React.FC<AssignExecutiveModalProps> = ({
    open,
    onOpenChange,
    onAssign,
    customerName,
    customerId,
}) => {
    const [selectedExecutive, setSelectedExecutive] = useState<string>('');

    const handleAssign = () => {
        if (selectedExecutive) {
            onAssign(selectedExecutive);
            setSelectedExecutive(''); // Reset after assign
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-2xl p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2 flex flex-row items-center justify-between border-b-0 space-y-0">
                    <DialogTitle className="text-xl font-bold text-gray-900">Assign to Executive</DialogTitle>
                    {/* Close button is handled by DialogPrimitive logic usually, but we can add cutom or rely on default X */}
                </DialogHeader>

                <div className="p-6 pt-2 space-y-6">
                    {/* Customer Info Box */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Customer</label>
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <div className="font-bold text-gray-900">{customerName}</div>
                            <div className="text-sm text-gray-500">ID: {customerId}</div>
                        </div>
                    </div>

                    {/* Executive Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Select Sales Executive</label>
                        <Select value={selectedExecutive} onValueChange={setSelectedExecutive}>
                            <SelectTrigger className="w-full h-11 rounded-xl border-gray-200 text-gray-900 focus:ring-purple-500">
                                <SelectValue placeholder="Choose an executive" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Matches the radio style look in the image roughly via Select items */}
                                {executives.map((exec) => (
                                    <SelectItem key={exec} value={exec} className="cursor-pointer">
                                        {exec}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 flex gap-3 justify-end">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="rounded-xl h-11 px-8 border-gray-200 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAssign}
                        disabled={!selectedExecutive}
                        className="rounded-xl h-11 px-8 bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-medium disabled:opacity-50"
                    >
                        Assign
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
