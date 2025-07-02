import { DataTableOrder } from '@/components/AdminOrder/DataTableOrder';
import { columns } from '@/components/AdminOrder/Column';
import { getAllOrder } from '@/services/cartApi';
import { useQuery } from '@tanstack/react-query';
import type { Order } from '@/types/cart';

import { OrderContext } from '@/contexts/OrderContext';
import ExportOrderExcel from '@/components/AdminOrder/ExportOrderExcel';

export default function AdminOrder() {
    const {
        data: res,
        isPending: loading,
        refetch,
    } = useQuery({
        queryKey: ['order'],
        queryFn: getAllOrder,
    });

    const data: Order[] = Array.isArray(res?.data) ? res.data : [];

    return (
        <OrderContext.Provider value={{ refreshOrders: refetch }}>
            <div className="w-full p-[15px]">
                <h2 className="text-2xl font-bold">Quản lý Đơn hàng</h2>
                <div className="mt-5">
                    <ExportOrderExcel data={data} />
                </div>
                {loading ? (
                    <div className="py-10 text-center text-gray-500">Đang tải dữ liệu đơn hàng...</div>
                ) : (
                    <DataTableOrder columns={columns} data={data} />
                )}
            </div>
        </OrderContext.Provider>
    );
}
