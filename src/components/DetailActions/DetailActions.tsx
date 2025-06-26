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

type DetailActionsProps = {
    product: ProductFormData | undefined;
};

function DetailActions({ product }: DetailActionsProps) {
    const user: UserState = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddressClick = () => {
        navigate(config.routes.profile);
    };

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
        <div className="p-[15px]">
            <div
                className="h-30 w-full rounded-xl p-2"
                style={{ backgroundImage: "url('https://i.postimg.cc/9zGdHKtQ/olgr-dt-min.png')" }}
            >
                <p className="pt-1 text-2xl font-semibold text-white">Giá ưu đãi</p>
                <div className="flex flex-col gap-0.5 pt-1">
                    <span className="text-[16px] font-semibold text-yellow-300">
                        {product?.price.toLocaleString('vi-VN')}₫
                    </span>
                    <div className="text-white">
                        <span className="text-xs line-through">{product?.oldPrice?.toLocaleString('vi-VN')}₫</span>
                        <span className="ml-1 text-xs">
                            {product?.oldPrice && (
                                <span className="ml-2 text-xs text-neutral-200">
                                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-[15px] flex flex-col gap-2 border-b pb-[15px]">
                <h3 className="mb-5 text-xl font-medium">Thông tin vận chuyển</h3>
                <span className="font-medium">Địa chỉ nhận hàng:</span>
                <p className="line-clamp-2 flex w-full break-all italic hover:underline">{user?.address}</p>
                <p className="cursor-pointer text-blue-400 hover:underline" onClick={handleAddressClick}>
                    Thay đổi ngay
                </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                <Button onClick={handleAddToCartClick} variant="outline" size="lg">
                    <ShoppingCart /> Thêm vào giỏ hàng
                </Button>

                <Button onClick={handlePayClick} size="lg">
                    Mua ngay
                </Button>

                <Button variant="outline">Mua trả chậm 0%</Button>
            </div>
        </div>
    );
}

export default DetailActions;
