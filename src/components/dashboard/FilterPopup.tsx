import React from 'react';
import { Filter, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    status: string;
    assignStatus: string;
  };
  onFilterChange: (filters: { status: string; assignStatus: string }) => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose, filters, onFilterChange }) => {
  const handleStatusChange = (value: string) => {
    onFilterChange({ ...filters, status: value });
  };

  const handleAssignStatusChange = (value: string) => {
    onFilterChange({ ...filters, assignStatus: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Filter className="w-4 h-4" />
            Filter
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status filter */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Status</h4>
              <span className="text-muted-foreground">—</span>
            </div>
            <RadioGroup
              value={filters.status}
              onValueChange={handleStatusChange}
              className="space-y-2"
            >
              {['All', 'Visit', 'Revisit'].map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`status-${option}`} />
                  <Label htmlFor={`status-${option}`} className="cursor-pointer text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Assign Status filter */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Assign Status</h4>
              <span className="text-muted-foreground">—</span>
            </div>
            <RadioGroup
              value={filters.assignStatus}
              onValueChange={handleAssignStatusChange}
              className="space-y-2"
            >
              {['All', 'Assigned', 'Unassigned'].map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`assign-${option}`} />
                  <Label htmlFor={`assign-${option}`} className="cursor-pointer text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterPopup;
