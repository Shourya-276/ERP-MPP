import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Camera, 
  Check, 
  X, 
  Plus,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const SectionHeader = ({ title, isOpen, onToggle }: any) => (
  <button 
    onClick={onToggle}
    className="w-full flex items-center justify-between p-6 bg-white rounded-t-[24px] border-b border-gray-50 group transition-all"
  >
    <div className="flex items-center gap-3">
      {isOpen ? <ChevronDown className="w-5 h-5 text-[#371D45]" /> : <ChevronUp className="w-5 h-5 text-[#371D45]" />}
      <span className="text-lg font-black text-[#371D45] tracking-tight">{title}</span>
      {title === "Lead Information" && <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-2">(Personal details locked)</span>}
    </div>
  </button>
);

const FormField = ({ label, placeholder, value, type = "text", required, prefix }: any) => (
  <div className="space-y-2 flex-1 min-w-[200px]">
    <label className="text-[11px] font-black text-[#371D45] uppercase tracking-wider flex items-center gap-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {prefix && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-2 border-r border-gray-200">
          {prefix}
        </div>
      )}
      <Input 
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className={cn(
          "h-12 bg-[#FBF2FF]/30 border-none rounded-xl text-sm font-medium placeholder:text-gray-300 focus-visible:ring-2 focus-visible:ring-purple-100 transition-all",
          prefix && "pl-20"
        )}
      />
    </div>
  </div>
);

const CheckboxGroup = ({ label, options, selected, onChange }: any) => (
  <div className="space-y-4">
    <p className="text-sm font-black text-[#371D45] tracking-tight">{label}</p>
    <div className="flex flex-wrap gap-4">
      {options.map((opt: any) => (
        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
          <div className={cn(
            "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
            selected.includes(opt) ? "bg-[#371D45] border-[#371D45]" : "border-gray-200 group-hover:border-purple-200"
          )}>
            {selected.includes(opt) && <Check className="w-4 h-4 text-white" />}
          </div>
          <span className="text-sm font-bold text-gray-600">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const EditLeadPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Lead Info');
  const [openSections, setOpenSections] = useState({
    leadInfo: true,
    contactWork: false,
    enquiryInfo: false
  });

  const [propertyConfig, setPropertyConfig] = useState(['1 BHK']);
  const [investment, setInvestment] = useState(['1.01 Cr to 1.20 Cr', '1.20 Cr & Above']);
  const [purpose, setPurpose] = useState(['Second Home']);
  const [floor, setFloor] = useState(['Upper Level']);
  const [view, setView] = useState(['Both']);
  const [possession, setPossession] = useState(['2029']);

  const handleTabClick = (tab: string) => {
    const sectionMap: any = {
      'Lead Info': 'leadInfo',
      'Contact & Work info': 'contactWork',
      'Enquiry info': 'enquiryInfo'
    };
    const section = sectionMap[tab];
    
    if (openSections[section as keyof typeof openSections]) {
      setOpenSections(prev => ({ ...prev, [section]: false }));
      setActiveTab('');
    } else {
      setActiveTab(tab);
      setOpenSections({
        leadInfo: tab === 'Lead Info',
        contactWork: tab === 'Contact & Work info',
        enquiryInfo: tab === 'Enquiry info'
      });
    }
  };

  const toggleSection = (section: 'leadInfo' | 'contactWork' | 'enquiryInfo', tab: string) => {
    if (openSections[section]) {
      setOpenSections(prev => ({ ...prev, [section]: false }));
      setActiveTab('');
    } else {
      setOpenSections({
        leadInfo: section === 'leadInfo',
        contactWork: section === 'contactWork',
        enquiryInfo: section === 'enquiryInfo'
      });
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-24">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/sales/leads')}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all active:scale-90"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-full">
            {['Lead Info', 'Contact & Work info', 'Enquiry info'].map(tab => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={cn(
                  "px-8 py-2.5 rounded-full text-xs font-black transition-all",
                  activeTab === tab ? "bg-[#FFF6D8] text-[#371D45] shadow-sm" : "text-gray-400 hover:text-gray-600"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <SectionHeader 
            title="Lead Information" 
            isOpen={openSections.leadInfo} 
            onToggle={() => toggleSection('leadInfo', 'Lead Info')} 
          />
          {openSections.leadInfo && (
            <div className="p-8 pt-2 space-y-8">
              <div className="flex flex-wrap gap-6">
                <FormField label="Date" value="19-12-2025" required />
                <div className="space-y-2 flex-1 min-w-[200px]">
                  <label className="text-[11px] font-black text-[#371D45] uppercase tracking-wider flex items-center gap-1">
                    Photo <span className="text-red-500">*</span>
                  </label>
                  <div className="h-12 bg-[#FBF2FF]/30 border border-dashed border-purple-200 rounded-xl flex items-center justify-between px-4 cursor-pointer hover:bg-[#FBF2FF]/50 transition-all">
                    <span className="text-sm font-bold text-gray-400">JPG-1029</span>
                    <Camera className="w-5 h-5 text-purple-300" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <FormField label="Title" value="Mr" required />
                <FormField label="First Name" value="Rajesh" required />
                <FormField label="Middle" value="Pradeep" required />
                <FormField label="Last Name" value="Kumar" required />
              </div>

              <div className="flex flex-wrap gap-6">
                <FormField label="Gender" value="Male" required />
                <FormField label="Age" value="29" required />
                <FormField label="Nationality" value="Indian" required />
              </div>

              <FormField label="Email Address" value="abc@gmail.com" required />

              <FormField 
                label="Phone Number" 
                value="9999999999" 
                required 
                prefix={<div className="flex items-center gap-2 font-bold text-xs"><span className="text-lg">🇮🇳</span> +91</div>}
              />

              <p className="text-[10px] font-black text-[#371D45] uppercase tracking-widest cursor-pointer hover:text-purple-600 transition-all flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add alternate number
              </p>

              <div className="flex flex-wrap gap-6">
                <FormField label="Marital Status" value="Married" required />
                <FormField label="Spouse Name" value="Richa Kumar" required />
                <FormField 
                  label="Phone Number" 
                  value="0000000000" 
                  prefix={<div className="flex items-center gap-2 font-bold text-xs"><span className="text-lg">🇮🇳</span> +91</div>}
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <SectionHeader 
            title="Contact & Work Info" 
            isOpen={openSections.contactWork} 
            onToggle={() => toggleSection('contactWork', 'Contact & Work info')} 
          />
          {openSections.contactWork && (
             <div className="p-8 pt-2 space-y-8">
                <div className="space-y-4">
                  <p className="text-sm font-black text-[#371D45] tracking-tight">What is your current residence type? <span className="text-red-500">*</span></p>
                  <div className="flex gap-4">
                    <button className="flex-1 h-14 bg-[#FBF2FF] border-2 border-[#371D45] rounded-xl flex items-center gap-4 px-6 transition-all">
                      <div className="w-6 h-6 rounded-md bg-[#371D45] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-bold text-[#371D45]">Owned House</span>
                    </button>
                    <button className="flex-1 h-14 bg-white border-2 border-gray-100 rounded-xl flex items-center gap-4 px-6 transition-all hover:bg-gray-50">
                      <div className="w-6 h-6 rounded-md border-2 border-gray-200"></div>
                      <span className="font-bold text-gray-400">Rented House</span>
                    </button>
                  </div>
                </div>

                <FormField label="Share Your Current Address" value="213, Dream View Apartment" required />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Location" value="Vikhroli" required />
                  <FormField label="Sub Location" value="Kannamwar Nagar" required />
                  <FormField label="Pin Code" value="400720" required />
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-black text-[#371D45] tracking-tight">Describe Your Work Type <span className="text-red-500">*</span></p>
                  <Badge className="bg-[#371D45] hover:bg-[#371D45] px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">Salaried</Badge>
                </div>

                <div className="bg-[#FBF2FF]/40 border border-purple-100 rounded-3xl p-6 space-y-6">
                  <p className="text-xs font-black text-[#371D45] flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Salaried Employment Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField label="Job Title" value="Software Engineer" required />
                    <FormField label="Company Name" value="Acer" required />
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#371D45] uppercase tracking-wider">Company Type <span className="text-red-500">*</span></label>
                      <div className="h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-between px-4">
                        <span className="text-sm font-bold text-gray-600">Private</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          )}
        </div>

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <SectionHeader 
            title="Edit Property details" 
            isOpen={openSections.enquiryInfo} 
            onToggle={() => toggleSection('enquiryInfo', 'Enquiry info')} 
          />
          {openSections.enquiryInfo && (
            <div className="p-8 pt-2 space-y-10">
              <CheckboxGroup 
                label="Which configuration suits you best?"
                options={['1 BHK', '2 BHK', 'Jodi']}
                selected={propertyConfig}
                onChange={setPropertyConfig}
              />
              <CheckboxGroup 
                label="How much do you want to invest?"
                options={['71 lacs to 80 lacs', '81 lacs to 90 lacs', '91 lacs to 1 CR', '1.01 Cr to 1.20 Cr', '1.20 Cr & Above']}
                selected={investment}
                onChange={setInvestment}
              />
              <CheckboxGroup 
                label="What is your purpose of buying?"
                options={['Personal Stay', 'Investment', 'Second Home']}
                selected={purpose}
                onChange={setPurpose}
              />
              <CheckboxGroup 
                label="What is your preferred floor level?"
                options={['Lower Level', 'Middle Level', 'Upper Level']}
                selected={floor}
                onChange={setFloor}
              />
              <CheckboxGroup 
                label="What view are you interested in?"
                options={['City View', 'Mangrove View', 'Both']}
                selected={view}
                onChange={setView}
              />
              <CheckboxGroup 
                label="What's your target possession date?"
                options={['2027', '2028', '2029']}
                selected={possession}
                onChange={setPossession}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 px-12 flex justify-end gap-4 z-50">
        <Button 
          variant="outline" 
          onClick={() => navigate('/sales/leads')}
          className="h-12 px-12 rounded-xl text-gray-500 font-bold hover:bg-gray-50 border-gray-100 shadow-sm"
        >
          Cancel
        </Button>
        <Button 
          onClick={() => navigate('/sales/leads')}
          className="h-12 px-16 rounded-xl bg-[#371D45] hover:bg-[#25132F] text-white font-black shadow-xl shadow-purple-100 transition-all active:scale-95"
        >
          Save
        </Button>
      </footer>
    </div>
  );
};

export default EditLeadPage;
