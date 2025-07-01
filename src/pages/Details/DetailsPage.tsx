import ProductBreadcrumb from '@/components/ProductBreadcrumb/ProductBreadcrumb';
import { Star, PackageOpen, ShieldUser } from 'lucide-react';
import type { ProductFormData } from '@/types/product';
import { getDetailProduct } from '@/services/productApi';
import { useParams } from 'react-router';
import DetailActions from '@/components/DetailActions/DetailActions';
import DetailsImgCarousel from '@/components/DetailsImgCarousel/DetailsImgCarousel';
import { useQuery } from '@tanstack/react-query';

function DetailsPage() {
    const { id } = useParams();
    const query = useQuery({
        queryKey: ['product', id],
        queryFn: () => getDetailProduct(id as string),
        enabled: !!id,
    });

    const product: ProductFormData | undefined = query.data?.data;

    return (
        <div className="container mx-auto max-w-screen-lg px-4 py-6">
            {/* Breadcrumb */}
            <ProductBreadcrumb product={product} />

            {/* Tiêu đề */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold">{product?.name}</h1>
                <span className="text-muted-foreground text-sm">Đã bán: {product?.selled}</span>
                <span className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star size={14} />
                    <span className="text-muted-foreground">{product?.rating}</span>
                </span>
            </div>

            {/* Nội dung chính */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
                {/* Cột ảnh và cam kết */}
                <div className="space-y-6 md:col-span-8">
                    {/* Ảnh sản phẩm */}
                    <div className="rounded-2xl bg-white p-4 shadow-sm select-none">
                        <DetailsImgCarousel img={product?.image} />
                    </div>

                    {/* Cam kết */}
                    <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
                        <h3 className="text-lg font-medium">Cam kết</h3>
                        <div className="text-muted-foreground flex items-center gap-3 text-sm">
                            <PackageOpen className="text-primary" size={18} />
                            <span>Sản phẩm mới (Cần thanh toán trước khi mở hộp)</span>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-3 text-sm">
                            <ShieldUser className="text-primary" size={18} />
                            <span>Bảo hành chính hãng 1 năm tại các trung tâm bảo hành</span>
                        </div>
                    </div>
                </div>

                {/* Cột mua hàng */}
                <div className="md:col-span-4">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <DetailActions product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
