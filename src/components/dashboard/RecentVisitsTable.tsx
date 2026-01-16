import React, { useState } from 'react';
import { Search, Filter, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AssignPopup from './AssignPopup';
import FilterPopup from './FilterPopup';
import * as XLSX from 'xlsx';

interface Visit {
  id: string;
  uniqueId: string;
  customerName: string;
  contact: string;
  source: 'CP' | 'Walk-in' | 'Phone';
  purpose: 'Visit' | 'Revisit';
  scheduledDate: string;
  status: 'Pending' | 'Assigned';
  assignedTo?: string;
}

const mockData: Visit[] = [
  { id: '1', uniqueId: 'CST001', customerName: 'Rajesh Kumar', contact: '****6789', source: 'CP', purpose: 'Visit', scheduledDate: '15 Jan 2026', status: 'Pending' },
  { id: '2', uniqueId: 'CST008', customerName: 'Anjali Nair', contact: '****8888', source: 'Walk-in', purpose: 'Visit', scheduledDate: '19 Jan 2026', status: 'Pending' },
  { id: '3', uniqueId: 'CST010', customerName: 'Deepa Iyer', contact: '****9999', source: 'CP', purpose: 'Visit', scheduledDate: '15 Jan 2026', status: 'Assigned', assignedTo: 'Yogesh Raut' },
  { id: '4', uniqueId: 'CST002', customerName: 'Sneha Patel', contact: '****4321', source: 'Walk-in', purpose: 'Visit', scheduledDate: '15 Jan 2026', status: 'Assigned', assignedTo: 'Rohit Singh' },
  { id: '5', uniqueId: 'CST003', customerName: 'Anil Mehta', contact: '****9876', source: 'Phone', purpose: 'Revisit', scheduledDate: '16 Jan 2026', status: 'Pending' },
  { id: '6', uniqueId: 'CST004', customerName: 'Kavita Desai', contact: '****5555', source: 'CP', purpose: 'Revisit', scheduledDate: '15 Jan 2026', status: 'Pending' },
  { id: '7', uniqueId: 'CST005', customerName: 'Vikram Malhotra', contact: '****7890', source: 'Walk-in', purpose: 'Visit', scheduledDate: '17 Jan 2026', status: 'Pending' },
  { id: '8', uniqueId: 'CST006', customerName: 'Priyanka Shah', contact: '****3210', source: 'Phone', purpose: 'Visit', scheduledDate: '18 Jan 2026', status: 'Pending' },
];

const RecentVisitsTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visits, setVisits] = useState<Visit[]>(mockData);
  const [assignPopup, setAssignPopup] = useState<{ isOpen: boolean; customer: { name: string; id: string } | null }>({
    isOpen: false,
    customer: null,
  });
  const [filterPopup, setFilterPopup] = useState(false);
  const [filters, setFilters] = useState({ status: 'All', assignStatus: 'All' });

  const filteredVisits = visits.filter((visit) => {
    const matchesSearch = 
      visit.uniqueId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      filters.status === 'All' || visit.purpose === filters.status;
    
    const matchesAssignStatus =
      filters.assignStatus === 'All' ||
      (filters.assignStatus === 'Assigned' && visit.status === 'Assigned') ||
      (filters.assignStatus === 'Unassigned' && visit.status === 'Pending');

    return matchesSearch && matchesStatus && matchesAssignStatus;
  });

  const handleAssign = (visitId: string, executive: string) => {
    setVisits(prev => prev.map(v => 
      v.id === visitId 
        ? { ...v, status: 'Assigned' as const, assignedTo: executive }
        : v
    ));
  };

  const downloadExcel = () => {
    const exportData = filteredVisits.map(({ id, ...rest }) => ({
      'Unique ID': rest.uniqueId,
      'Customer Name': rest.customerName,
      'Contact': rest.contact,
      'Source': rest.source,
      'Purpose': rest.purpose,
      'Scheduled Date': rest.scheduledDate,
      'Status': rest.status,
      'Assigned To': rest.assignedTo || '',
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Recent Visits');
    XLSX.writeFile(wb, 'recent-visits.xlsx');
  };

  const getSourceBadge = (source: string) => {
    const styles = {
      CP: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
      'Walk-in': 'bg-purple-100 text-purple-700 hover:bg-purple-100',
      Phone: 'bg-red-100 text-red-700 hover:bg-red-100',
    };
    return styles[source as keyof typeof styles] || '';
  };

  const getPurposeBadge = (purpose: string) => {
    const styles = {
      Visit: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
      Revisit: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
    };
    return styles[purpose as keyof typeof styles] || '';
  };

  return (
    <div className="bg-white rounded-2xl border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Visits</h3>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setFilterPopup(true)}
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button 
            size="sm" 
            className="gap-2 bg-primary hover:bg-primary/90"
            onClick={downloadExcel}
          >
            <Download className="w-4 h-4" />
            Download Excel
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by Unique ID or Customer Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="data-table w-full">
          <thead>
            <tr className="border-b">
              <th>Unique ID</th>
              <th>Customer Name</th>
              <th>Contact</th>
              <th>Source</th>
              <th>Purpose</th>
              <th>Scheduled Date</th>
              <th>Status</th>
              <th>Print</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisits.map((visit) => (
              <tr key={visit.id}>
                <td className="text-primary font-medium">{visit.uniqueId}</td>
                <td>{visit.customerName}</td>
                <td>{visit.contact}</td>
                <td>
                  <Badge variant="secondary" className={getSourceBadge(visit.source)}>
                    {visit.source}
                  </Badge>
                </td>
                <td>
                  <Badge variant="secondary" className={getPurposeBadge(visit.purpose)}>
                    {visit.purpose}
                  </Badge>
                </td>
                <td>{visit.scheduledDate}</td>
                <td>
                  {visit.status === 'Assigned' ? (
                    <div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Assigned
                      </Badge>
                      {visit.assignedTo && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Assigned to {visit.assignedTo}
                        </p>
                      )}
                    </div>
                  ) : (
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                      Pending
                    </Badge>
                  )}
                </td>
                <td>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Printer className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => setAssignPopup({ 
                      isOpen: true, 
                      customer: { name: visit.customerName, id: visit.uniqueId }
                    })}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Assign
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Popup */}
      {assignPopup.customer && (
        <AssignPopup
          isOpen={assignPopup.isOpen}
          onClose={() => setAssignPopup({ isOpen: false, customer: null })}
          customer={assignPopup.customer}
          onAssign={(exec) => {
            const visit = visits.find(v => v.uniqueId === assignPopup.customer?.id);
            if (visit) handleAssign(visit.id, exec);
          }}
        />
      )}

      {/* Filter Popup */}
      <FilterPopup
        isOpen={filterPopup}
        onClose={() => setFilterPopup(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
};

export default RecentVisitsTable;
