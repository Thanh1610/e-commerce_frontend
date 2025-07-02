import Banner from '@/components/Banner/Banner';
import slider1 from '@/assets/images/slider1.png';
import slider2 from '@/assets/images/slider2.webp';
import slider3 from '@/assets/images/slider3.webp';
import Sections from '@/components/Sections/Sections';
import { getAllProduct, getSaleProducts, getTopRatedProducts } from '@/services/productApi';
import type { ProductFormData } from '@/types/product';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { shuffleArray } from '@/utils/helpers/shuffleArray';
import SkeletonCardList from '@/components/Loading/SkeletonCardList';

function HomePage() {
    const [limit, setLimit] = useState(12);
    const MAX_LIMIT = 24;
    // Sản phẩm gợi ý
    const query = useQuery({
        queryKey: ['product', limit],
        queryFn: () => getAllProduct(limit),
    });
    const products: ProductFormData[] = query.data?.data || [];
    const shuffledProducts = shuffleArray(products);

    // Sản phẩm giảm giá
    const saleQuery = useQuery({
        queryKey: ['saleProducts'],
        queryFn: () => getSaleProducts(6),
    });
    const saleProducts: ProductFormData[] = saleQuery.data?.data || [];

    // Sản phẩm đánh giá cao
    const topRatedQuery = useQuery({
        queryKey: ['topRatedProducts'],
        queryFn: () => getTopRatedProducts(6),
    });
    const topRatedProducts: ProductFormData[] = topRatedQuery.data?.data || [];

    // Hàm xử lý khi bấm "Xem thêm"
    const handleShowMore = () => setLimit((prev) => Math.min(prev + 12, MAX_LIMIT));
    return (
        <div className="container mx-auto my-0 max-w-screen-lg">
            <Banner bannerImg={[slider1, slider2, slider3]} />
            {/* Gợi ý cho bạn */}
            {query.isLoading ? (
                <Sections heading="Gợi ý cho bạn" products={[]}>
                    <SkeletonCardList count={limit} />
                </Sections>
            ) : (
                <Sections
                    heading="Gợi ý cho bạn"
                    products={shuffledProducts}
                    onShowMore={handleShowMore}
                    showMoreDisabled={limit >= MAX_LIMIT}
                />
            )}

            {/* Đang giảm giá */}
            {saleQuery.isLoading ? (
                <Sections heading="Đang giảm giá" products={[]}>
                    <SkeletonCardList count={6} />
                </Sections>
            ) : (
                <Sections heading="Đang giảm giá" products={saleProducts} />
            )}

            {/* Đánh giá cao nhất */}
            {topRatedQuery.isLoading ? (
                <Sections heading="Đánh giá cao nhất" products={[]}>
                    <SkeletonCardList count={6} />
                </Sections>
            ) : (
                <Sections heading="Đánh giá cao nhất" products={topRatedProducts} />
            )}
        </div>
    );
}

export default HomePage;
