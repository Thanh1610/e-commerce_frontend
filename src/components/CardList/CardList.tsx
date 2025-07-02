import Card from '@/components/Card/Card';
import type { ProductFormData } from '@/types/product';

type CardListProps = {
    products: ProductFormData[];
};

function CardList({ products }: CardListProps) {
    return (
        <div className="mt-5 grid grid-cols-2 gap-4 px-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {products.map((product) => (
                <Card key={product?._id} product={product} />
            ))}
        </div>
    );
}

export default CardList;
