import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, Search, X, Minus, Loader2, Printer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import * as XLSX from 'xlsx';
import api from '@/lib/api';
import { format } from 'date-fns';
import { AssignExecutiveModal } from './AssignExecutiveModal';
import { toast } from 'sonner';

interface Lead {
    friendlyId: string;
    customerName: string;
    phone: string;
    source: string;
    purpose: string;
    createdAt: string;
    status: string;
}

export const ReceptionistVisitsTable: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Modal state for Assign Executive (Static logic for now)
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedLeadForAssign, setSelectedLeadForAssign] = useState<{ id: string, name: string } | null>(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/leads/recent');
            setLeads(response.data);
        } catch (error) {
            console.error('Failed to fetch leads:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getSourceColor = (source: string) => {
        switch (source?.toUpperCase()) {
            case 'REFERRAL': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
            case 'WALK_IN': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
            case 'PHONE': return 'bg-pink-100 text-pink-700 hover:bg-pink-100';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getPurposeColor = (status: string) => {
        return status === 'VISIT' ? 'bg-cyan-100 text-cyan-700' : 'bg-indigo-100 text-indigo-700';
    };

    // Helper for Status Column (Static Data for now)
    const getStatusColor = (status: string) => {
        return status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700';
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.friendlyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.customerName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All' ||
            (statusFilter === 'Visit' && lead.status === 'VISIT') ||
            (statusFilter === 'Revisit' && lead.status === 'REVISIT');

        return matchesSearch && matchesStatus;
    });

    const handleDownloadExcel = () => {
        const dataToExport = filteredLeads.map(lead => ({
            'Unique ID': lead.friendlyId,
            'Customer Name': lead.customerName,
            'Contact': lead.phone,
            'Source': lead.source,
            'Purpose': lead.status,
            'Scheduled Date': format(new Date(lead.createdAt), 'dd MMM yyyy')
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(wb, ws, 'Recent Leads');
        XLSX.writeFile(wb, 'Recent_Leads.xlsx');
    };

    /**
     * Prints the lead data by opening a temporary window with a visitor pass layout.
     */
    const handlePrintLead = (lead: Lead) => {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) {
            toast.error('Pop-up blocked. Please allow pop-ups to print visitor passes.');
            return;
        }

        const dateStr = format(new Date(lead.createdAt), 'dd MMM yyyy, hh:mm a');

        printWindow.document.write(`
            <html>
                <head>
                    <title>Visitor Pass - ${lead.friendlyId}</title>
                    <style>
                        body { font-family: 'Inter', sans-serif; padding: 40px; color: #333; }
                        .pass-container { 
                            border: 2px solid #4A1D59; 
                            padding: 30px; 
                            max-width: 500px; 
                            margin: 0 auto;
                            border-radius: 12px;
                            position: relative;
                        }
                        .header { text-align: center; border-bottom: 2px solid #F3E8FF; padding-bottom: 15px; margin-bottom: 20px; }
                        .header h1 { color: #4A1D59; margin: 0; font-size: 24px; }
                        .field { margin: 15px 0; }
                        .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
                        .value { font-size: 18px; color: #1a1a1a; margin-top: 4px; }
                        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; }
                        .id-badge { 
                            background: #4A1D59; 
                            color: white; 
                            padding: 5px 15px; 
                            border-radius: 4px; 
                            font-weight: bold;
                            display: inline-block;
                        }
                        @media print {
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="pass-container">
                        <div class="header">
                            <h1>Megaplex Prime</h1>
                            <p>Visitor Pass</p>
                        </div>
                        <div class="field">
                            <div class="label">Lead ID</div>
                            <div class="value"><span class="id-badge">${lead.friendlyId}</span></div>
                        </div>
                        <div class="field">
                            <div class="label">Customer Name</div>
                            <div class="value">${lead.customerName}</div>
                        </div>
                        <div class="field">
                            <div class="label">Phone Number</div>
                            <div class="value">${lead.phone}</div>
                        </div>
                        <div class="field">
                            <div class="label">Date & Time</div>
                            <div class="value">${dateStr}</div>
                        </div>
                        <div class="field">
                            <div class="label">Purpose</div>
                            <div class="value">${lead.status}</div>
                        </div>
                        <div class="footer">
                            Generated by CRM - Megaplex Prime
                        </div>
                    </div>
                    <script>
                        window.onload = function() {
                            window.print();
                            // window.close(); // Uncomment if you want it to close after printing
                        };
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    const handleAssignClick = (lead: Lead) => {
        setSelectedLeadForAssign({ id: lead.friendlyId, name: lead.customerName });
        setAssignModalOpen(true);
    };

    const handleAssignConfirm = (executiveName: string) => {
        toast.success(`Succesfully assigned ${selectedLeadForAssign?.name} to ${executiveName} (Demo)`);
        setAssignModalOpen(false);
    };

    return (
        <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Recent Leads</h3>
                <div className="flex gap-2">
                    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 gap-2">
                                <Filter className="w-4 h-4" />
                                Filter
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-0 rounded-xl shadow-xl bg-white border-0" align="end">
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
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-gray-100/50 p-2 rounded-lg">
                                        <span className="font-bold text-sm text-gray-900">Purpose</span>
                                        <Minus className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div className="space-y-2 px-2">
                                        {['All', 'Visit', 'Revisit'].map(option => (
                                            <div
                                                key={option}
                                                className="flex items-center gap-2 cursor-pointer py-1"
                                                onClick={() => setStatusFilter(option)}
                                            >
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${statusFilter === option ? 'border-[#4A1D59]' : 'border-gray-400'}`}>
                                                    {statusFilter === option && <div className="w-2.5 h-2.5 rounded-full bg-[#4A1D59]" />}
                                                </div>
                                                <span className={`text-sm ${statusFilter === option ? 'text-[#4A1D59] font-medium' : 'text-gray-600'}`}>{option}</span>
                                            </div>
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
                <Input
                    className="pl-9 bg-gray-50 border-gray-200 w-full"
                    placeholder="Search by Unique ID or Customer Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto min-h-[300px] relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                        <Loader2 className="w-8 h-8 animate-spin text-[#4A1D59]" />
                    </div>
                ) : null}

                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-left text-gray-500">
                            <th className="p-3 font-medium rounded-l-lg">Unique ID</th>
                            <th className="p-3 font-medium">Customer Name</th>
                            <th className="p-3 font-medium">Contact</th>
                            <th className="p-3 font-medium">Source</th>
                            <th className="p-3 font-medium">Purpose</th>
                            <th className="p-3 font-medium">Scheduled Date</th>
                            {/* Restored Columns */}
                            <th className="p-3 font-medium text-[#4A1D59]">Status</th>
                            <th className="p-3 font-medium text-[#4A1D59]">Print</th>
                            <th className="p-3 font-medium rounded-r-lg text-[#4A1D59]">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredLeads.map((lead) => (
                            <tr key={lead.friendlyId} className="hover:bg-gray-50/50">
                                <td className="p-3 font-bold text-blue-600">{lead.friendlyId}</td>
                                <td className="p-3 font-medium">{lead.customerName}</td>
                                <td className="p-3 text-gray-500">{lead.phone}</td>
                                <td className="p-3">
                                    <Badge variant="secondary" className={getSourceColor(lead.source)}>{lead.source}</Badge>
                                </td>
                                <td className="p-3">
                                    <Badge variant="secondary" className={getPurposeColor(lead.status)}>{lead.status}</Badge>
                                </td>
                                <td className="p-3 text-gray-600 font-medium">
                                    {format(new Date(lead.createdAt), 'dd MMM yyyy')}
                                </td>

                                {/* Static Status Data (Requested) */}
                                <td className="p-3">
                                    <Badge variant="secondary" className={getStatusColor('Pending')}>Pending</Badge>
                                </td>

                                {/* Printing Functionality (Requested) */}
                                <td className="p-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-400 hover:text-[#4A1D59] hover:bg-purple-50 transition-colors"
                                        onClick={() => handlePrintLead(lead)}
                                    >
                                        <Printer className="w-4 h-4" />
                                    </Button>
                                </td>

                                {/* Static Action Data (Requested) */}
                                <td className="p-3">
                                    <Button
                                        size="sm"
                                        className="bg-[#4A1D59] hover:bg-[#3d184a] text-xs h-8 px-4"
                                        onClick={() => handleAssignClick(lead)}
                                    >
                                        Assign
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {!isLoading && filteredLeads.length === 0 && (
                            <tr>
                                <td colSpan={9} className="p-8 text-center text-gray-500">
                                    No leads found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Static Modal Integration */}
            <AssignExecutiveModal
                open={assignModalOpen}
                onOpenChange={setAssignModalOpen}
                onAssign={handleAssignConfirm}
                customerName={selectedLeadForAssign?.name || ''}
                customerId={selectedLeadForAssign?.id || ''}
            />
        </div>
    );
};
