import ProductBreadcrumb from '@/components/ProductBreadcrumb/ProductBreadcrumb';
import { Star, PackageOpen, ShieldUser } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ProductFormData } from '@/types/product';
import { getDetailProductBySlug } from '@/services/productApi';
import { useParams } from 'react-router';
import DetailActions from '@/components/DetailActions/DetailActions';
import DetailsImgCarousel from '@/components/DetailsImgCarousel/DetailsImgCarousel';

function DetailsPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState<ProductFormData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (slug) {
                try {
                    const res = await getDetailProductBySlug(slug);
                    setProduct(res?.data);
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
                }
            }
        };

        fetchData();
    }, [slug]);

    return (
        <div className="container mx-auto my-0 max-w-screen-lg pt-2.5">
            <ProductBreadcrumb product={product} />
            <div className="flex w-full items-center justify-start gap-2.5">
                <h1 className="text-xl font-bold">{product?.name}</h1>
                <span className="text-muted-foreground text-xs">đã bán {product?.selled}</span>
                <span className="flex cursor-pointer items-center gap-1">
                    <Star className="text-yellow-300" size={12} />
                    <span className="text-muted-foreground text-xs">{product?.rating}</span>
                </span>
            </div>

            <div className="grid grid-cols-12 justify-start gap-4">
                <div className="col-span-8 w-full rounded-2xl">
                    <div className="rounded-2xl bg-black">
                        <DetailsImgCarousel img={product?.image} />
                    </div>

                    <div className="mt-5 bg-white">
                        <h3 className="text-xl font-medium">Cam kết</h3>
                        <div className="mt-5 flex items-center gap-2">
                            <PackageOpen />
                            Sản phẩm mới (Cần thanh toán trước khi mở hộp).
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            <ShieldUser />
                            Bảo hành chính hãng 1 năm tại các trung tâm bảo hành hãng{' '}
                        </div>
                    </div>
                </div>
                <div className="col-span-4 rounded-2xl bg-white">
                    <DetailActions product={product} />
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
