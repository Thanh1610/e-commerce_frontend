import CardList from '@/components/CardList/CardList';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import type { Product } from '@/pages/Home/HomePage';

type TypeSectionsProps = {
    heading?: string;
    products: Product[];
    setLimit: React.Dispatch<React.SetStateAction<number>>;
};

function TypeSections({ heading, products, setLimit }: TypeSectionsProps) {
    return (
        <div className="mt-5 rounded-2xl bg-white">
            {heading && <h3 className="px-5 pt-5 text-2xl font-bold">{heading}</h3>}

            <CardList colSpan="2" products={products} />

            {products.length > 24 && (
                <div className="mt-[5px] mb-[15px] flex items-center justify-center">
                    <Button
                        onClick={() => setLimit((prev) => prev + 24)}
                        variant="ghost"
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

export default TypeSections;
