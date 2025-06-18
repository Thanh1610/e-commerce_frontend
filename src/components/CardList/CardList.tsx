import Card from '@/components/Card/Card';
import type { ProductFormData } from '@/types/product';

type CardListProps = {
    colSpan: string;
    products: ProductFormData[];
};

function CardList({ colSpan, products }: CardListProps) {
    return (
        <div className="mt-5 grid grid-cols-6 gap-2.5 px-5">
            {products.map((product) => (
                <div key={product?._id} className={`col-span-${colSpan}`}>
                    <Card product={product} />
                </div>
            ))}
        </div>
    );
}

export default CardList;
