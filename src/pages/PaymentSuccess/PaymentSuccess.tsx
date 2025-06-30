import { removeMultipleFromCart } from '@/redux/slices/cartSlice';
import { createOrder } from '@/services/cartApi';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
import config from '@/config';

function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const calledRef = useRef(false);

    const createOrderMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: (res) => {
            if (res?.data?.status === 'SUCCESS') {
                const payload = JSON.parse(localStorage.getItem('zalo_order_payload') || '{}');
                if (payload?.cartItem) {
                    const checkedIds = payload.cartItem.map((item: any) => item.product);
                    dispatch(removeMultipleFromCart(checkedIds));
                }
                localStorage.removeItem('zalo_order_payload');
                setTimeout(() => navigate(config.routes.orders), 1500);
            }
        },
        onError: () => {
            toast.error('Lỗi tạo đơn hàng!');
        },
    });

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;

        const appTransId = searchParams.get('app_trans_id');
        if (!appTransId) {
            toast.error('Không xác định được giao dịch.');
            return;
        }

        // Lấy lại dữ liệu từ localStorage
        const payloadRaw = localStorage.getItem('zalo_order_payload');
        if (!payloadRaw) {
            toast.error('Không tìm thấy dữ liệu đơn hàng.');
            return;
        }

        const parsed = JSON.parse(payloadRaw);
        const payload = {
            ...parsed,
            isPaid: true,
        };
        createOrderMutation.mutate(payload);
    }, [searchParams, createOrderMutation]);

    return (
        <div className="min-h-[100vh] p-10 text-center">
            <h1 className="text-2xl font-bold text-green-600">🎉 Thanh toán thành công!</h1>
            <p className="mt-4 text-gray-600">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
        </div>
    );
}

export default PaymentSuccess;
