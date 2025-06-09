import Card from '@/components/Card/Card';
import type { Product } from '@/pages/Home/HomePage';

type CardListProps = {
    colSpan: string;
    products: Product[];
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
