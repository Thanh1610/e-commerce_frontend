import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useNavigate } from 'react-router';
import config from '@/config';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/services/cartApi';
import { removeMultipleFromCart } from '@/redux/slices/cartSlice';
import { createZaloOrder } from '@/services/zaloPayment';
import ShippingInfo from './ShippingInfo';
import PaymentMethodSelector from './PaymentMethodSelector';
import OrderSummary from './OrderSummary';
import LoadingButton from '@/components/LoadingButton/LoadingButton';

function Pay() {
    const user = useSelector((state: RootState) => state.user);
    const checkedIds = useSelector((state: RootState) => state.cart.checkedIds);
    const cartItems = useSelector((state: RootState) => state.cart.cartItem);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    //lọc ra số sản phẩm được check
    const checkedItems = cartItems.filter((item) => checkedIds.includes(item.product));

    const subTotal = checkedItems.reduce((total, item) => total + item?.price * item?.amount, 0); //Tạm tính
    const discount = 0; //Giảm giá
    const tax = 0; // tạm thời chưa có
    const shippingFee = subTotal > 0 ? 20000 : 0;
    const total = subTotal - discount + tax + shippingFee;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createOrderMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: async (res) => {
            if (res?.data?.status === 'SUCCESS') {
                toast.success(res?.data?.message || 'Đặt hàng thành công!');
                dispatch(removeMultipleFromCart(checkedItems.map((item) => item.product)));
                navigate(config.routes.orders);
            } else {
                toast.error(res?.data?.message || 'Đặt hàng thất bại!');
            }
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Lỗi kết nối máy chủ!';
            toast.error(message);
        },
    });

    const zaloPayMutation = useMutation({
        mutationFn: () => createZaloOrder(total),
        onSuccess: (res) => {
            if (res?.return_code === 1 && res.order_url) {
                window.location.href = res.order_url; // Chuyển hướng người dùng sang ZaloPay
            } else {
                toast.error('Không tạo được đơn hàng ZaloPay');
            }
        },
        onError: () => {
            toast.error('Lỗi kết nối ZaloPay');
        },
    });

    const handlePayClick = () => {
        if (!user?.address) {
            toast.warning('Vui lòng cập nhật địa chỉ!');
            navigate(config.routes.profile);
            return;
        }

        const payload = {
            cartItem: checkedItems,
            paymentMethod,
            itemsPrice: subTotal,
            shippingPrice: shippingFee,
            totalPrice: total,
            fullname: user?.name,
            address: user?.address,
            phone: user?.phone,
            user: user?._id,
            email: user?.email,
        };

        if (paymentMethod === 'zalopay') {
            localStorage.setItem('zalo_order_payload', JSON.stringify(payload));
            zaloPayMutation.mutate();
            return;
        }

        createOrderMutation.mutate(payload);
    };

    const loading = createOrderMutation.isPending;
    return (
        <Card className="w-full xl:w-80">
            <CardContent className="space-y-3 p-4 text-sm">
                {/* Địa chỉ */}
                <ShippingInfo address={user?.address} />

                {/* Phương thức thanh toán */}
                <PaymentMethodSelector value={paymentMethod} onValueChange={setPaymentMethod} />

                {/* Thanh toán */}
                <OrderSummary
                    subTotal={subTotal}
                    discount={discount}
                    tax={tax}
                    shippingFee={shippingFee}
                    total={total}
                />

                <LoadingButton
                    loading={loading}
                    onClick={handlePayClick}
                    disabled={checkedItems.length === 0}
                    className="w-full cursor-pointer select-none"
                    variant="destructive"
                    size="default"
                    idleText="Mua hàng"
                    loadingText="Đang xử lý..."
                />
            </CardContent>
        </Card>
    );
}

export default Pay;
