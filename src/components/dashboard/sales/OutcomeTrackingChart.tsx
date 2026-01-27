import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

const data = [
  { month: 'Jan', Marketing: 255, PreSales: 150, Referral: 85, ChannelPartner: 120, DeveloperReference: 60 },
  { month: 'Feb', Marketing: 200, PreSales: 120, Referral: 70, ChannelPartner: 90, DeveloperReference: 50 },
  { month: 'Mar', Marketing: 180, PreSales: 140, Referral: 90, ChannelPartner: 110, DeveloperReference: 70 },
  { month: 'Apr', Marketing: 220, PreSales: 160, Referral: 100, ChannelPartner: 130, DeveloperReference: 80 },
  { month: 'May', Marketing: 240, PreSales: 180, Referral: 95, ChannelPartner: 115, DeveloperReference: 65 },
  { month: 'Jun', Marketing: 260, PreSales: 170, Referral: 110, ChannelPartner: 140, DeveloperReference: 90 },
];

const metrics = [
  { label: 'Visits', value: '31 visits', sublabel: 'Total customer interactions' },
  { label: 'Revisits', value: '20 revisits', sublabel: 'Repeat visit interactions' },
  { label: 'Bookings Done', value: '65 bookings done', sublabel: 'Total confirmed bookings' },
  { label: 'Registration', value: '3 Registration Done', sublabel: 'Bookings withdrawn' },
  { label: 'Cancelled', value: '3 bookings cancelled', sublabel: 'Bookings withdrawn' },
];

const OutcomeTrackingChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Outcome tracking based on Source</h3>
        <div className="flex items-center gap-2">
          {['All', 'Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => (
            <Button
              key={q}
              variant="ghost"
              size="sm"
              className={`h-7 px-3 text-xs rounded-full border-[0.99px] border-[#DDDDDD] hover:bg-[#FFF7CE]/50 ${i === 0
                  ? 'bg-[#FFF7CE] text-black hover:bg-[#FFF7CE]'
                  : 'bg-white text-black hover:bg-gray-50'
                }`}
            >
              {q}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Metrics */}
        <div className="w-48 space-y-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="py-2 border-b border-border/50">
              <p className="text-sm font-medium">{metric.label}</p>
              <p className="text-xs text-muted-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground opacity-70">{metric.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1 h-72">
          <div className="flex items-center gap-4 mb-3 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#93C5FD]"></span>
              Marketing
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#C4B5FD]"></span>
              Pre-Sales
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#6EE7B7]"></span>
              Referral
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#FD7474]"></span>
              Channel Partner
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#FFCC75]"></span>
              Developer Reference
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="Marketing" fill="#93C5FD" radius={[4, 4, 0, 0]} />
              <Bar dataKey="PreSales" fill="#C4B5FD" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Referral" fill="#6EE7B7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ChannelPartner" fill="#FD7474" radius={[4, 4, 0, 0]} />
              <Bar dataKey="DeveloperReference" fill="#FFCC75" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OutcomeTrackingChart;
