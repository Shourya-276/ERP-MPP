import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
    Trash2,
    Eye,
    LogOut,
    Users,
    Calendar,
    Phone,
    MapPin,
    Briefcase,
    Search,
    RefreshCw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';

interface Lead {
    id: number;
    friendlyId: string;
    customerName: string;
    phone: string;
    source: string;
    purpose: string;
    createdAt: string;
}

const AdminDashboard: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Selection for Detail Drawer
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [leadDetails, setLeadDetails] = useState<any>(null);
    const [isDetailsLoading, setIsDetailsLoading] = useState(false);

    // Selection for Delete Dialog
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        // Simple auth check using localStorage
        const adminUser = localStorage.getItem('adminUser');
        if (!adminUser) {
            navigate('/admin/login');
            return;
        }
        fetchLeads();
    }, [navigate]);

    useEffect(() => {
        const results = leads.filter(lead =>
            lead.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.friendlyId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone?.includes(searchTerm)
        );
        setFilteredLeads(results);
    }, [searchTerm, leads]);

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/admin/leads');
            const data = response.data;
            setLeads(data);
            setFilteredLeads(data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch leads",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchLeadDetails = async (friendlyId: string) => {
        setIsDetailsLoading(true);
        setSelectedLeadId(friendlyId);
        setIsDetailOpen(true);
        try {
            const response = await api.get(`/admin/leads/${friendlyId}`);
            const data = response.data;
            setLeadDetails(data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch lead details",
            });
            setIsDetailOpen(false);
        } finally {
            setIsDetailsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirmId) return;

        try {
            const response = await api.delete(`/admin/leads/${deleteConfirmId}`);

            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "Lead deleted successfully",
                });
                setLeads(leads.filter(l => l.friendlyId !== deleteConfirmId));
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not delete lead",
            });
        } finally {
            setIsDeleteDialogOpen(false);
            setDeleteConfirmId(null);
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('adminUser');
            navigate('/admin/login');
        }
    };
    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Header */}
            <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                            A
                        </div>
                        <span>Admin Dashboard</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </header>

            <main className="container py-8">
                <div className="flex flex-col gap-6">
                    {/* Stats Summary */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="shadow-sm border-none bg-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
                                <Users className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{leads.length}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Table View */}
                    <Card className="shadow-sm border-none bg-white">
                        <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <CardTitle>Leads Overview</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Manage and view all incoming leads from various sources
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="relative w-full md:w-64">
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search leads..."
                                            className="pl-10"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <Button variant="outline" size="icon" onClick={fetchLeads} disabled={isLoading}>
                                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow>
                                            <TableHead className="w-[120px]">ID</TableHead>
                                            <TableHead>Customer Name</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Source</TableHead>
                                            <TableHead>Purpose</TableHead>
                                            <TableHead>Scheduled Date</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            Array(5).fill(0).map((_, i) => (
                                                <TableRow key={i}>
                                                    <TableCell colSpan={7} className="h-12 animate-pulse bg-slate-100/50"></TableCell>
                                                </TableRow>
                                            ))
                                        ) : filteredLeads.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                                    No leads found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredLeads.map((lead) => (
                                                <TableRow key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <TableCell className="font-medium text-primary">
                                                        {lead.friendlyId}
                                                    </TableCell>
                                                    <TableCell>
                                                        <button
                                                            onClick={() => fetchLeadDetails(lead.friendlyId)}
                                                            className="hover:underline font-medium text-left"
                                                        >
                                                            {lead.customerName}
                                                        </button>
                                                    </TableCell>
                                                    <TableCell>{lead.phone}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className="font-normal capitalize">
                                                            {lead.source?.toLowerCase().replace('_', ' ')}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">{lead.purpose || '-'}</TableCell>
                                                    <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => fetchLeadDetails(lead.friendlyId)}
                                                            >
                                                                <Eye className="h-4 w-4 text-slate-600" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => {
                                                                    setDeleteConfirmId(lead.friendlyId);
                                                                    setIsDeleteDialogOpen(true);
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Lead Details Drawer */}
            <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <SheetContent className="sm:max-w-xl overflow-y-auto">
                    <SheetHeader className="pb-6 border-b">
                        <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                            {isDetailsLoading ? 'Loading Details...' : leadDetails?.customerName}
                        </SheetTitle>
                        <SheetDescription>
                            Full lead profile and inquiry details
                        </SheetDescription>
                    </SheetHeader>

                    {isDetailsLoading ? (
                        <div className="space-y-4 py-8">
                            <div className="h-8 bg-slate-100 animate-pulse rounded w-3/4"></div>
                            <div className="h-32 bg-slate-100 animate-pulse rounded"></div>
                            <div className="h-32 bg-slate-100 animate-pulse rounded"></div>
                        </div>
                    ) : (
                        <div className="py-6 space-y-8">
                            {/* Personal Info */}
                            <section className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2 border-l-4 border-primary pl-3">
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <DetailItem label="Full Name" value={leadDetails?.customerName} />
                                    <DetailItem label="Lead ID" value={leadDetails?.friendlyId} />
                                    <DetailItem label="Phone" value={leadDetails?.phone} icon={<Phone className="h-3 w-3" />} />
                                    <DetailItem label="Email" value={leadDetails?.email} />
                                    <DetailItem label="Nationality" value={leadDetails?.nationality} />
                                    <DetailItem label="Age" value={leadDetails?.age} />
                                    <DetailItem label="Marital Status" value={leadDetails?.maritalStatus} />
                                    {leadDetails?.maritalStatus?.toLowerCase() === 'married' && (
                                        <>
                                            <DetailItem label="Spouse Name" value={leadDetails?.spouseName} />
                                            <DetailItem label="Spouse Phone" value={leadDetails?.spousePhone} />
                                        </>
                                    )}
                                    <DetailItem label="Aadhar" value={leadDetails?.aadhar} />
                                </div>
                            </section>

                            {/* Professional Info */}
                            <section className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2 border-l-4 border-primary pl-3">
                                    Work & Contact
                                </h3>
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <DetailItem label="Occupation" value={leadDetails?.workType} icon={<Briefcase className="h-3 w-3" />} />
                                    <DetailItem label="Job Title" value={leadDetails?.jobTitle} />
                                    <DetailItem label="Organization" value={leadDetails?.orgName} />
                                    <DetailItem label="Company Type" value={leadDetails?.companyType} />
                                    <DetailItem label="Residence Type" value={leadDetails?.residenceType} />
                                    <DetailItem label="Location" value={leadDetails?.location} icon={<MapPin className="h-3 w-3" />} />
                                    <DetailItem label="City" value={leadDetails?.city} />
                                    <DetailItem label="Sub Location" value={leadDetails?.subLocation} />
                                    <DetailItem label="Pin Code" value={leadDetails?.pinCode} />
                                </div>
                                <div className="text-sm mt-2">
                                    <Label className="text-muted-foreground">Full Address</Label>
                                    <p className="mt-1 bg-slate-50 p-3 rounded-lg border">{leadDetails?.address || 'No address provided'}</p>
                                </div>
                            </section>

                            {/* Property Interest */}
                            <section className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2 border-l-4 border-primary pl-3">
                                    Property Preferences
                                </h3>
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <DetailItem label="Purpose" value={leadDetails?.purpose} />
                                    <DetailItem label="Configuration" value={leadDetails?.config} />
                                    <DetailItem label="Budget" value={leadDetails?.budget} />
                                    <DetailItem label="Possession" value={leadDetails?.possession} />
                                    <DetailItem label="Floor Preference" value={leadDetails?.floor} />
                                    <DetailItem label="View Preference" value={leadDetails?.view} />
                                </div>
                            </section>

                            {/* Source Details */}
                            <section className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2 border-l-4 border-primary pl-3">
                                    Acquisition
                                </h3>
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <DetailItem label="Primary Source" value={leadDetails?.source} />
                                    <DetailItem label="Specific Sub-source" value={leadDetails?.sourcesList} />
                                    {leadDetails?.source === 'CHANNEL_PARTNER' && (
                                        <>
                                            <DetailItem label="CP Firm" value={leadDetails?.cpFirm} />
                                            <DetailItem label="CP Contact" value={leadDetails?.cpPhone} />
                                        </>
                                    )}
                                </div>
                            </section>

                            {/* Signature */}
                            {leadDetails?.signature && (
                                <section className="space-y-4 pb-12">
                                    <h3 className="font-semibold text-lg flex items-center gap-2 border-l-4 border-primary pl-3">
                                        Consent & Signature
                                    </h3>
                                    <div className="bg-slate-50 p-4 rounded-lg border flex flex-col items-center">
                                        <img src={leadDetails.signature} alt="Lead Signature" className="max-h-40 bg-white border rounded" />
                                        <p className="text-xs text-muted-foreground mt-2 italic text-center">
                                            Digitally signed on {new Date(leadDetails.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete lead <span className="font-bold text-slate-900">{deleteConfirmId}</span>?
                            This action cannot be undone and will remove all associated feedback and interactions.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex sm:justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete Lead
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Helper component for detail items
const DetailItem = ({ label, value, icon }: { label: string, value: any, icon?: React.ReactNode }) => {
    if (!value || value === '' || value === 'N/A') return null;

    return (
        <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
            <div className="flex items-center gap-2">
                {icon && <span className="text-slate-400">{icon}</span>}
                <p className="font-semibold text-slate-900 truncate">{value}</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
