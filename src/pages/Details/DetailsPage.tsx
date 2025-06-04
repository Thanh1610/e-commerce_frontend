import ProductBreadcrumb from '@/components/ProductBreadcrumb/ProductBreadcrumb';
import { Star } from 'lucide-react';
import DetailsImgCarousel from '@/components/DetailsImgCarousel/DetailsImgCarousel';

function DetailsPage() {
    return (
        <div className="container mx-auto my-0 pt-2.5">
            <ProductBreadcrumb />
            <div className="flex w-full items-center justify-start gap-2.5">
                <h1 className="text-xl font-bold">Asus Vivobook 15 X1504ZA i3 1215U (NJ102W)</h1>
                <span className="text-muted-foreground text-xs">đã bán 18.3k</span>
                <span className="flex cursor-pointer items-center gap-1">
                    <Star className="text-yellow-300" size={12} />
                    <span className="text-muted-foreground text-xs">4.9</span>
                </span>
            </div>

            <div className="grid grid-cols-12 justify-start gap-4">
                <div className="col-span-8 w-full rounded-2xl bg-white">
                    <DetailsImgCarousel />
                </div>
                <div className="col-span-4 rounded-2xl bg-white">
                    <div className="p-[15px]">
                        <div
                            className="h-30 w-full rounded-xl p-1"
                            style={{ backgroundImage: "url('https://i.postimg.cc/9zGdHKtQ/olgr-dt-min.png')" }}
                        >
                            <p className="pt-1 text-xs font-semibold text-white">Giá ưu đãi</p>
                            <div className="flex flex-col gap-0.5 pt-1">
                                <span className="text-[16px] font-semibold text-yellow-300">10.190.000₫</span>
                                <div className="text-white">
                                    <span className="text-xs line-through">12.290.000₫</span>
                                    <span className="ml-1 text-xs"> -17%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
