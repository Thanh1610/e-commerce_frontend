import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import type { Order } from '@/types/cart';
import { updateOrderStatus } from '@/services/cartApi';
import { toast } from 'react-toastify';
import { useOrderContext } from '@/contexts/OrderContext';
import DeleteOrderModal from '@/components/AdminOrder/DeleteOrderModal';
import { useState } from 'react';

export interface AdminOrderActionsProps {
    order: Order;
    onUpdatePaid?: (order: Order) => void;
    onUpdateStatus?: (order: Order) => void;
}

function AdminOrderActions({ order, onUpdatePaid, onUpdateStatus }: AdminOrderActionsProps) {
    const { refreshOrders } = useOrderContext();
    const [openDelete, setOpenDelete] = useState(false);
    // Copy mã đơn
    const handleCopyOrderId = () => {
        if (order?._id) {
            navigator.clipboard.writeText(order._id);
        }
    };
    // Copy userId
    const handleCopyUserId = () => {
        if (order?.user) {
            navigator.clipboard.writeText(order.user);
        }
    };
    // Cập nhật thanh toán
    const handleUpdatePaid = async () => {
        try {
            const res = await updateOrderStatus(order._id, { isPaid: !order.isPaid });
            if (res.status === 'SUCCESS') {
                if (onUpdatePaid) onUpdatePaid(order);
                refreshOrders();
                toast.success('Cập nhật trạng thái thanh toán thành công!');
            } else {
                toast.error(res.message || 'Cập nhật thất bại!');
            }
        } catch {
            toast.error('Có lỗi xảy ra!');
        }
    };
    // Cập nhật trạng thái giao hàng
    const handleUpdateStatus = async () => {
        try {
            const res = await updateOrderStatus(order._id, { isDelivered: !order.isDelivered });
            if (res.status === 'SUCCESS') {
                if (onUpdateStatus) onUpdateStatus(order);
                refreshOrders();
                toast.success('Cập nhật trạng thái giao hàng thành công!');
            } else {
                toast.error(res.message || 'Cập nhật thất bại!');
            }
        } catch {
            toast.error('Có lỗi xảy ra!');
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleCopyOrderId}>Sao chép mã đơn</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyUserId}>Sao chép User ID</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleUpdatePaid}>Cập nhật thanh toán</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleUpdateStatus}>Cập nhật trạng thái</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => setOpenDelete(true)}>
                        Xóa đơn hàng
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteOrderModal
                orderId={order._id}
                onSuccess={refreshOrders}
                open={openDelete}
                onOpenChange={setOpenDelete}
            />
        </>
    );
}

export default AdminOrderActions;
