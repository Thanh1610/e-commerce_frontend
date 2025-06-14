import type { ProductFormData } from '@/services/productApi';
import { Link } from 'react-router';
import config from '@/config';

interface SearchResultsProps {
    showResults: boolean;
    results: ProductFormData[];
}

function SearchResults({ showResults, results }: SearchResultsProps) {
    return (
        <>
            {showResults && results.length > 0 && (
                <div className="absolute top-10 right-0 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded border bg-white shadow">
                    <h3 className="p-2 text-xl font-bold">Kết quả tìm kiếm</h3>
                    {results.map((item) => (
                        <Link
                            to={config.routes.home}
                            key={item._id}
                            className="flex transform items-center gap-3 p-2 transition-all duration-150 hover:bg-neutral-200"
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <img src={item.image} className="h-10 w-10 rounded object-cover" alt={item.name} />
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                    {item.price.toLocaleString()}₫
                                    {item.oldPrice && (
                                        <span className="ml-2 text-xs text-red-500">
                                            -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
                                        </span>
                                    )}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

export default SearchResults;
