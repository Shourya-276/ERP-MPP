import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';

/**
 * Interface for Search Result Item
 */
export interface SearchResult {
    friendlyId: string;
    customerName: string;
    phone: string;
    hasFeedback: boolean;
}

interface IpadSearchProps {
    onGiveFeedback: (lead: SearchResult) => void;
}

/**
 * IpadSearch Component
 * 
 * Handles the search functionality for the iPad View.
 * Includes:
 * - Search Input with Clear button
 * - Real API integration for searching leads
 * - Click-outside handling
 * - Search Results Dropdown with "already feedback" state
 */
export const IpadSearch: React.FC<IpadSearchProps> = ({ onGiveFeedback }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                setIsLoading(true);
                try {
                    const response = await api.get(`/leads/search/${searchQuery}`);
                    // Ensure response.data matches SearchResult structure
                    setResults(response.data);
                    setShowDropdown(true);
                } catch (error) {
                    console.error('Search error:', error);
                    setResults([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

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

    const maskPhone = (phone: string) => {
        if (!phone) return '';
        return `******${phone.slice(-4)}`;
    };

    return (
        <div className="relative mb-8" ref={searchContainerRef}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
            <Input
                className="w-full h-14 px-12 bg-[#F3E8FF] border-none text-lg placeholder:text-muted-foreground/70 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Search by Unique ID, Name or Phone"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length === 0) setShowDropdown(false);
                }}
                onFocus={() => {
                    if (results.length > 0) setShowDropdown(true);
                }}
            />

            {/* Loading Indicator / Clear Button */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isLoading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
                {searchQuery && (
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setResults([]);
                            setShowDropdown(false);
                        }}
                        className="text-muted-foreground hover:text-foreground p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 p-2 max-h-[400px] overflow-y-auto">
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <div key={index} className="flex items-center py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors border-b last:border-0 border-gray-50">
                                <div className="w-24 font-bold text-[#4A1D59]">{result.friendlyId}</div>
                                <div className="flex-1 text-gray-900 font-semibold">{result.customerName}</div>
                                <div className="w-32 text-gray-500 font-medium tracking-wider">{maskPhone(result.phone)}</div>
                                <div className="flex gap-6 items-center">
                                    <button className="text-[#4A1D59] hover:text-[#2E1A47] font-semibold underline underline-offset-4 text-sm">
                                        View Details
                                    </button>
                                    {result.hasFeedback ? (
                                        <button
                                            disabled
                                            className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed text-sm font-semibold flex items-center gap-2"
                                        >
                                            Feedback Saved
                                        </button>
                                    ) : (
                                        <button
                                            className="px-4 py-2 bg-[#4A1D59] text-white rounded-lg hover:bg-[#32103E] transition-colors text-sm font-semibold"
                                            onClick={() => {
                                                onGiveFeedback(result);
                                                setShowDropdown(false);
                                            }}
                                        >
                                            Give Feedback
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : searchQuery.length >= 2 && !isLoading && (
                        <div className="p-8 text-center text-muted-foreground">
                            No leads found matching "{searchQuery}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
