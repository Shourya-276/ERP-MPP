import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { X } from 'lucide-react';

interface LocationSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locationData = [
  { name: '2146611', count: 2100 },
  { name: 'Maharashtra_668611', count: 680 },
  { name: 'Thane_400601', count: 150 },
  { name: 'Telangana_143601', count: 100 },
  { name: 'Uttar Pradesh_450600', count: 50 },
  { name: 'Bihar_800600', count: 100 },
  { name: 'Birmingham, East St_668612', count: 100 },
  { name: 'California, Alabama_000608', count: 100 },
  { name: 'Taipei Major_668618', count: 100 },
  { name: 'nil-r', count: 100 },
  { name: 'Auvergne-Rhone-Alpes_000611', count: 100 },
  { name: 'Oklahoma St_000615', count: 100 },
  { name: 'South Dakota St_000617', count: 100 },
  { name: 'Bristol Colbert_S.A._000614', count: 100 },
  { name: 'Mumbai E.N._000619', count: 100 },
  { name: 'Wadala District_S.A._000601', count: 100 },
  { name: 'Wadala Tucson Central S.A._668617', count: 100 },
  { name: 'Bristol_S.A._666613', count: 100 },
  { name: 'Donald Jr._000616', count: 100 },
  { name: 'Township_000818', count: 100 },
];

const LocationSummaryModal: React.FC<LocationSummaryModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-6xl h-[85vh] bg-white rounded-[32px] p-8 border-none overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 mb-8 pr-8">
          <DialogTitle className="text-3xl font-black text-[#1a1a1a] tracking-tight">Location Summary</DialogTitle>
        </DialogHeader>

        <div className="flex-1 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={locationData}
              margin={{ top: 20, right: 30, left: 40, bottom: 120 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }}
                height={120}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }}
                label={{ 
                  value: 'Lead Count', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: '12px', fontWeight: 900, fill: '#1a1a1a' },
                  offset: -10
                }}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                  padding: '12px 16px'
                }}
                itemStyle={{ fontSize: '12px', fontWeight: 900, color: '#4A1D59' }}
                labelStyle={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}
              />
              <Bar
                dataKey="count"
                radius={[6, 6, 6, 6]}
                barSize={30}
              >
                {locationData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill="#93C5FD" 
                    className="hover:fill-[#4A1D59] transition-colors duration-300" 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSummaryModal;
