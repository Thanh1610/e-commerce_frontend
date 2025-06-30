import config from '@/config';
import type { UserState } from '@/redux/slices/userSlice';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import type { ProductFormData } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '@/redux/slices/cartSlice';
import { toast } from 'react-toastify';
import ShippingInfo from '@/layouts/components/Cart/ShippingInfo';

type DetailActionsProps = {
    product: ProductFormData | undefined;
};

function DetailActions({ product }: DetailActionsProps) {
    const user: UserState = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCartClick = () => {
        handleAddProductToCart(() => {
            toast.success('Thêm vào giỏ thành công!');
        });
    };

    const handlePayClick = () => {
        handleAddProductToCart(() => {
            navigate(config.routes.cart);
        });
    };

    const handleAddProductToCart = (onSuccess?: () => void) => {
        if (!user?._id) {
            navigate(config.routes.login, { state: location?.pathname });
        } else {
            dispatch(
                addToCart({
                    name: product?.name ?? '',
                    amount: 1,
                    image: product?.image ?? '',
                    price: product?.price ?? 0,
                    product: product?._id ?? '',
                }),
            );

            onSuccess?.();
        }
    };
    return (
        <div className="space-y-4 p-4">
            {/* Box giá ưu đãi */}
            <div
                className="relative h-28 w-full rounded-xl bg-cover bg-center p-4 text-white shadow-sm"
                style={{ backgroundImage: "url('https://i.postimg.cc/9zGdHKtQ/olgr-dt-min.png')" }}
            >
                <p className="text-lg font-semibold">Giá ưu đãi</p>
                <div className="mt-2">
                    <p className="text-2xl font-bold text-yellow-300">{product?.price.toLocaleString('vi-VN')}₫</p>
                    <div className="text-sm text-white">
                        <span className="line-through opacity-80">{product?.oldPrice?.toLocaleString('vi-VN')}₫</span>
                        {product?.oldPrice && (
                            <span className="ml-2 text-neutral-200">
                                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Thông tin giao hàng */}
            <ShippingInfo address={user?.address} />

            {/* Nút hành động */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button onClick={handleAddToCartClick} variant="outline" size="lg" className="w-full sm:w-auto">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Thêm vào giỏ
                </Button>

                <Button onClick={handlePayClick} size="lg" className="w-full bg-red-500 hover:bg-red-600 sm:w-auto">
                    Mua ngay
                </Button>
            </div>
        </div>
    );
}

export default DetailActions;
