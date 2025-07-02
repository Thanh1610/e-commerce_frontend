import CardList from '@/components/CardList/CardList';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import type { ProductFormData } from '@/types/product';

type SectionsProps = {
    heading?: string;
    products: ProductFormData[];
    onShowMore?: () => void;
    showMoreDisabled?: boolean;
    children?: React.ReactNode;
};

function Sections({ heading, products, onShowMore, showMoreDisabled, children }: SectionsProps) {
    return (
        <div className="mt-5 rounded-2xl bg-white">
            {heading && <h3 className="px-5 pt-5 text-2xl font-bold">{heading}</h3>}
            {children ? (
                children
            ) : products.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Không có sản phẩm phù hợp.</div>
            ) : (
                <CardList products={products} />
            )}
            {onShowMore && (
                <div className="mt-[5px] mb-[15px] flex items-center justify-center">
                    <Button
                        onClick={onShowMore}
                        variant="ghost"
                        disabled={showMoreDisabled}
                        className="flex items-center justify-center"
                    >
                        <span>Xem thêm</span>
                        <ChevronDown />
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Sections;
