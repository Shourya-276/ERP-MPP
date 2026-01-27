import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, Search, X, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import * as XLSX from 'xlsx';

import { AssignExecutiveModal } from './AssignExecutiveModal';

// ... imports

/**
 * Interface definition for a single table row (Visit)
 */
interface Visit {
    id: string;
    name: string;
    phone: string;
    source: string;
    purpose: string;
    date: string;
    status: string;
    action: string;
    assignee: string;
}

/**
 * ReceptionistVisitsTable Component
 * 
 * Displays a list of recent customer visits.
 * Features:
 * - Filtering (by Status, Assign Status)
 * - Excel Export
 * - Assign Executive Action
 */
export const ReceptionistVisitsTable: React.FC = () => {
    // Initial mock data for the table
    const [visits, setVisits] = useState<Visit[]>([
        { id: 'CST001', name: 'Rajesh Kumar', phone: '****6789', source: 'CP', purpose: 'Visit', date: '15 Jan 2026', status: 'Pending', action: 'Assign', assignee: '' },
        { id: 'CST008', name: 'Anjali Nair', phone: '****8888', source: 'Walk-in', purpose: 'Visit', date: '19 Jan 2026', status: 'Pending', action: 'Assign', assignee: '' },
        { id: 'CST010', name: 'Deepa Iyer', phone: '****9999', source: 'CP', purpose: 'Visit', date: '15 Jan 2026', status: 'Assigned', assignee: 'Yogesh Raut', action: 'Assign' },
        { id: 'CST002', name: 'Sneha Patel', phone: '****4321', source: 'Walk-in', purpose: 'Visit', date: '15 Jan 2026', status: 'Assigned', assignee: 'Rohit Singh', action: 'Assign' },
        { id: 'CST003', name: 'Anil Mehta', phone: '****9876', source: 'Phone', purpose: 'Revisit', date: '16 Jan 2026', status: 'Pending', action: 'Assign', assignee: '' },
    ]);

    const [statusFilter, setStatusFilter] = useState('All');
    const [assignStatusFilter, setAssignStatusFilter] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Assign Modal State
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedVisitForAssign, setSelectedVisitForAssign] = useState<{ id: string, name: string } | null>(null);

    const handleAssignClick = (visit: typeof visits[0]) => {
        setSelectedVisitForAssign({ id: visit.id, name: visit.name });
        setAssignModalOpen(true);
    };

    const handleAssignConfirm = (executiveName: string) => {
        if (!selectedVisitForAssign) return;

        setVisits(prev => prev.map(v => {
            if (v.id === selectedVisitForAssign.id) {
                return { ...v, status: 'Assigned', assignee: executiveName };
            }
            return v;
        }));
        setAssignModalOpen(false);
    };

    const getSourceColor = (source: string) => {
        switch (source) {
            case 'CP': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
            case 'Walk-in': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
            case 'Phone': return 'bg-pink-100 text-pink-700 hover:bg-pink-100';
            default: return 'bg-gray-100';
        }
    };

    const getPurposeColor = (purpose: string) => {
        return purpose === 'Visit' ? 'bg-cyan-100 text-cyan-700' : 'bg-indigo-100 text-indigo-700';
    };

    const getStatusColor = (status: string) => {
        return status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700';
    };

    const filteredVisits = visits.filter(visit => {
        // Status Filter (maps to Purpose)
        if (statusFilter !== 'All' && visit.purpose !== statusFilter) return false;

        // Assign Status Filter
        if (assignStatusFilter === 'Assigned' && visit.status === 'Pending') return false;
        if (assignStatusFilter === 'Unassigned' && visit.status !== 'Pending') return false;

        return true;
    });

    // Custom Radio Option Component
    const FilterOption = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
        <div
            className="flex items-center gap-2 cursor-pointer py-1"
            onClick={onClick}
        >
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selected ? 'border-[#4A1D59]' : 'border-gray-400'}`}>
                {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#4A1D59]" />}
            </div>
            <span className={`text-sm ${selected ? 'text-[#4A1D59] font-medium' : 'text-gray-600'}`}>{label}</span>
        </div>
    );

    const handleDownloadExcel = () => {
        const dataToExport = filteredVisits.map(visit => ({
            'Unique ID': visit.id,
            'Customer Name': visit.name,
            'Contact': visit.phone,
            'Source': visit.source,
            'Purpose': visit.purpose,
            'Scheduled Date': visit.date,
            'Status': visit.status,
            'Allocation': visit.status === 'Assigned' ? `Assigned to ${visit.assignee}` : ''
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(dataToExport);

        // Auto-size columns (optional but nice)
        const colWidths = [
            { wch: 10 }, // ID
            { wch: 20 }, // Name
            { wch: 15 }, // Phone
            { wch: 10 }, // Source
            { wch: 10 }, // Purpose
            { wch: 15 }, // Date
            { wch: 10 }, // Status
            { wch: 25 }  // Allocation
        ];
        ws['!cols'] = colWidths;

        XLSX.utils.book_append_sheet(wb, ws, 'Visits');
        XLSX.writeFile(wb, 'Receptionist_Visits.xlsx');
    };

    return (
        <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Recent Visits</h3>
                <div className="flex gap-2">
                    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 gap-2">
                                <Filter className="w-4 h-4" />
                                Filter
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-0 rounded-xl shadow-xl bg-white border-0" align="end">
                            {/* Filter Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center gap-2 font-bold text-gray-800">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </div>
                                <X
                                    className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
                                    onClick={() => setIsFilterOpen(false)}
                                />
                            </div>

                            <div className="p-4 space-y-6">
                                {/* Status Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-gray-100/50 p-2 rounded-lg">
                                        <span className="font-bold text-sm text-gray-900">Status</span>
                                        <Minus className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div className="space-y-2 px-2">
                                        {['All', 'Visit', 'Revisit'].map(option => (
                                            <FilterOption
                                                key={option}
                                                label={option}
                                                selected={statusFilter === option}
                                                onClick={() => setStatusFilter(option)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Assign Status Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-gray-100/50 p-2 rounded-lg">
                                        <span className="font-bold text-sm text-gray-900">Assign Status</span>
                                        <Minus className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div className="space-y-2 px-2">
                                        {['All', 'Assigned', 'Unassigned'].map(option => (
                                            <FilterOption
                                                key={option}
                                                label={option}
                                                selected={assignStatusFilter === option}
                                                onClick={() => setAssignStatusFilter(option)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Button
                        className="bg-[#4A1D59] hover:bg-[#3d184a] h-9 gap-2"
                        onClick={handleDownloadExcel}
                    >
                        <Download className="w-4 h-4" />
                        Download Excel
                    </Button>
                </div>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input className="pl-9 bg-gray-50 border-gray-200 w-full" placeholder="Search by Unique ID or Customer Name..." />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="p-3 font-medium text-gray-500 rounded-l-lg">Unique ID</th>
                            <th className="p-3 font-medium text-gray-500">Customer Name</th>
                            <th className="p-3 font-medium text-gray-500">Contact</th>
                            <th className="p-3 font-medium text-gray-500">Source</th>
                            <th className="p-3 font-medium text-gray-500">Purpose</th>
                            <th className="p-3 font-medium text-gray-500">Scheduled Date</th>
                            <th className="p-3 font-medium text-gray-500">Status</th>
                            <th className="p-3 font-medium text-gray-500">Print</th>
                            <th className="p-3 font-medium text-gray-500 rounded-r-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredVisits.map((visit) => (
                            <tr key={visit.id} className="hover:bg-gray-50/50">
                                <td className="p-3 font-medium text-blue-600">{visit.id}</td>
                                <td className="p-3 font-medium">{visit.name}</td>
                                <td className="p-3 text-gray-500">{visit.phone}</td>
                                <td className="p-3">
                                    <Badge variant="secondary" className={getSourceColor(visit.source)}>{visit.source}</Badge>
                                </td>
                                <td className="p-3">
                                    <Badge variant="secondary" className={getPurposeColor(visit.purpose)}>{visit.purpose}</Badge>
                                </td>
                                <td className="p-3 text-gray-600">
                                    {visit.date.split(' ').map((part, i) => (
                                        <span key={i} className={i === 0 ? "block font-medium text-gray-900" : ""}>{part} </span>
                                    ))}
                                </td>
                                <td className="p-3">
                                    <Badge variant="secondary" className={getStatusColor(visit.status)}>{visit.status}</Badge>
                                </td>
                                <td className="p-3">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </td>
                                <td className="p-3">
                                    {visit.status === 'Pending' ? (
                                        <Button
                                            size="sm"
                                            className="bg-[#4A1D59] hover:bg-[#3d184a] text-xs h-8"
                                            onClick={() => handleAssignClick(visit)}
                                        >
                                            Assign
                                        </Button>
                                    ) : (
                                        <div className="text-xs">
                                            <span className="text-gray-500 block">Assigned to</span>
                                            <span className="font-medium text-gray-900">{visit.assignee}</span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AssignExecutiveModal
                open={assignModalOpen}
                onOpenChange={setAssignModalOpen}
                onAssign={handleAssignConfirm}
                customerName={selectedVisitForAssign?.name || ''}
                customerId={selectedVisitForAssign?.id || ''}
            />
        </div>
    );
};
