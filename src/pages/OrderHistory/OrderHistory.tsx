import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/services/cartApi';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import OrderCard from '@/layouts/components/OrderHistory/OrderCard';

function OrderHistory() {
    const user = useSelector((state: RootState) => state.user);

    const {
        data: orders = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['orders', user?._id],
        queryFn: () => getOrders(user._id),
        enabled: !!user._id,
    });

    if (isLoading) return <div className="p-4 text-center text-sm">Đang tải đơn hàng...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Không thể tải đơn hàng.</div>;

    return (
        <div className="mx-auto max-w-3xl p-4">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">🛍️ Lịch sử mua hàng</h1>

            {orders.length === 0 ? (
                <div className="text-center text-gray-500">Bạn chưa có đơn hàng nào.</div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} refetch={refetch} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistory;
