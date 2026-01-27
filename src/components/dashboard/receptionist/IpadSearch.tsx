import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

/**
 * Interface for Search Result Item
 */
export interface SearchResult {
    id: string;
    name: string;
    phone: string;
}

interface IpadSearchProps {
    onGiveFeedback: () => void;
}

/**
 * IpadSearch Component
 * 
 * Handles the search functionality for the iPad View.
 * Includes:
 * - Search Input with Clear button
 * - Auto-request focus/dropdown logic
 * - Click-outside handling
 * - Search Results Dropdown
 */
export const IpadSearch: React.FC<IpadSearchProps> = ({ onGiveFeedback }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Mock Data for Search Results
    const mockSearchResults: SearchResult[] = [
        { id: 'ID-023', name: 'Pooja Jain', phone: '******4625' },
        { id: 'ID-025', name: 'Mira Bhatt', phone: '******7230' },
        { id: 'ID-025', name: 'Rhea Rao', phone: '******1192' },
    ];

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative mb-8" ref={searchContainerRef}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
            <Input
                className="w-full h-14 px-12 bg-[#F3E8FF] border-none text-lg placeholder:text-muted-foreground/70 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Search by Unique ID"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
            />

            {/* Clear Button */}
            {searchQuery && (
                <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                >
                    <X className="w-5 h-5" />
                </button>
            )}

            {/* Search Results Dropdown */}
            {searchQuery && showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 p-2">
                    {mockSearchResults.map((result, index) => (
                        <div key={index} className="flex items-center py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-24 font-medium text-[#4A1D59]">{result.id}</div>
                            <div className="flex-1 text-gray-900 font-medium">{result.name}</div>
                            <div className="w-32 text-gray-600 font-medium tracking-wider">{result.phone}</div>
                            <div className="flex gap-6 items-center">
                                <button className="text-[#4A1D59] hover:text-[#2E1A47] font-semibold underline underline-offset-4 text-sm">
                                    View Details
                                </button>
                                <button
                                    className="text-[#4A1D59] hover:text-[#2E1A47] font-semibold underline underline-offset-4 text-sm"
                                    onClick={onGiveFeedback}
                                >
                                    Give Feedback
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
