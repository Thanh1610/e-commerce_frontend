import { Input } from '@/components/ui/input';
import { Search as SreachBtn, Loader, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { searchProduct } from '@/services/productApi';
import type { ProductFormData } from '@/types/product';
import SearchResults from '@/components/Search/SearchResults/SearchResults';
import useDebounce from '@/hooks/useDebounce';

function Search() {
    const [searchValue, setSearchValue] = useState<string>('');
    const [showResults, setShowResults] = useState<boolean>(false);
    const [results, setResults] = useState<ProductFormData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        const fetchSearchApi = async () => {
            setLoading(true);
            try {
                if (debounced.trim() === '') {
                    setShowResults(false);
                    return;
                }

                const payload = {
                    name: debounced,
                    type: 'less',
                };
                const res = await searchProduct(payload);

                setResults(res?.data || []);
                setShowResults(true);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchApi();
    }, [debounced]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current?.focus();
    };
    return (
        <div className="col-span-6 flex items-center justify-center">
            <div ref={wrapperRef} className="relative flex w-full max-w-sm items-center gap-2">
                <Input
                    className="w-full bg-white pr-12 pl-10"
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    onFocus={() => {
                        if (results.length > 0) {
                            setShowResults(true);
                        }
                    }}
                />

                <div
                    onClick={handleClear}
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer px-1 text-2xl"
                >
                    {searchValue && (loading ? <Loader size={16} className="animate-spin" /> : <X size={16} />)}
                </div>

                <div className="absolute top-0 left-4 flex h-full items-center">
                    <SreachBtn size={16} />
                </div>

                <SearchResults showResults={showResults} results={results} />
            </div>
        </div>
    );
}

export default Search;
