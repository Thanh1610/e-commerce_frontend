import Banner from '@/components/Banner/Banner';
import slider1 from '@/assets/images/slider1.png';
import slider2 from '@/assets/images/slider2.webp';
import slider3 from '@/assets/images/slider3.webp';
import Sections from '@/components/Sections/Sections';
import { getAllProduct } from '@/services/productApi';
import type { ProductFormData } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

function HomePage() {
    const query = useQuery({
        queryKey: ['product'],
        queryFn: getAllProduct,
    });
    const products: ProductFormData[] = query.data?.data || [];

    return (
        <div className="container mx-auto my-0 max-w-screen-lg">
            <Banner bannerImg={[slider1, slider2, slider3]} />
            <Sections heading="Gợi ý cho bạn" products={products} />
        </div>
    );
}

export default HomePage;
