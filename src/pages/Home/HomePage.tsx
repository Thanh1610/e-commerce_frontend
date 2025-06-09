import Banner from '@/components/Banner/Banner';
import slider1 from '@/assets/images/slider1.png';
import slider2 from '@/assets/images/slider2.webp';
import slider3 from '@/assets/images/slider3.webp';
import Sections from '@/components/Sections/Sections';
import { useEffect, useState } from 'react';
import { getAllProduct } from '@/services/productApi';

export type Product = {
    _id: string;
    countInStock: number;
    description: string;
    image: string;
    name: string;
    price: number;
    rating: string;
    type: string;
};

function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const res = await getAllProduct();
                setProducts(res?.data || []);
            };

            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="container mx-auto my-0 max-w-screen-lg">
            <Banner bannerImg={[slider1, slider2, slider3]} />
            <Sections heading="Gợi ý cho bạn" products={products} />
        </div>
    );
}

export default HomePage;
