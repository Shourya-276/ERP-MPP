import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AssignPopupProps {
  isOpen: boolean;
  onClose: () => void;
  customer: {
    name: string;
    id: string;
  };
  onAssign: (executive: string) => void;
}

const executives = [
  'Choose an executive',
  'Amit Sharma',
  'Rohit Singh',
  'Neha Kapoor',
  'Priya Gupta',
];

const AssignPopup: React.FC<AssignPopupProps> = ({ isOpen, onClose, customer, onAssign }) => {
  const [selectedExecutive, setSelectedExecutive] = useState('Choose an executive');

  const handleAssign = () => {
    if (selectedExecutive !== 'Choose an executive') {
      onAssign(selectedExecutive);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Assign to Executive</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Customer info */}
          <div>
            <label className="text-sm text-primary font-medium">Customer</label>
            <div className="mt-2 bg-muted/50 rounded-lg p-3">
              <p className="font-medium text-foreground">{customer.name}</p>
              <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
            </div>
          </div>

          {/* Executive selection */}
          <div>
            <label className="text-sm text-muted-foreground font-medium">Select Sales Executive</label>
            <RadioGroup
              value={selectedExecutive}
              onValueChange={setSelectedExecutive}
              className="mt-3 space-y-2"
            >
              {executives.map((exec) => (
                <div key={exec} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value={exec} id={exec} />
                  <Label htmlFor={exec} className="cursor-pointer flex-1">
                    {exec}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleAssign}
            disabled={selectedExecutive === 'Choose an executive'}
            className="bg-primary hover:bg-primary/90"
          >
            Assign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignPopup;
