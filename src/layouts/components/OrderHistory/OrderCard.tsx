import { useMutation } from '@tanstack/react-query';
import { deleteOrder, type Order } from '@/services/cartApi';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
    order: Order;
    refetch: () => void;
}

function OrderCard({ order, refetch }: Props) {
    const [openDeleteDialogs, setOpenDeleteDialogs] = useState<Record<string, boolean>>({});

    const cancelOrderMutation = useMutation({
        mutationFn: (id: string) => deleteOrder(id),
        onSuccess: (res, id) => {
            if (res?.status === 'SUCCESS') {
                toast.success(res?.message || 'Hủy đơn hàng thành công!');
                setOpenDeleteDialogs((prev) => ({ ...prev, [id]: false }));
                refetch();
            } else {
                toast.error(res?.message || 'Huỷ đơn hàng thất bại');
            }
        },
        onError: () => {
            toast.error('Có lỗi xảy ra khi huỷ đơn hàng');
        },
    });

    const handleCancelOrder = async (id: string) => {
        cancelOrderMutation.mutate(id);
    };

    const handleOpenDeleteDialog = (orderId: string, open: boolean) => {
        setOpenDeleteDialogs((prev) => ({ ...prev, [orderId]: open }));
    };

    return (
        <Card key={order._id}>
            <CardContent className="space-y-4 p-6">
                <div className="flex flex-wrap justify-between text-sm text-gray-600">
                    <span className="font-medium text-gray-800">🧾 Mã đơn: {order._id}</span>
                    <span className="italic">{new Date(order.createdAt).toLocaleString()}</span>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <p>
                        💰 <strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString('vi-VN')}đ
                    </p>
                    <p>
                        🏷️ <strong>Phương thức:</strong> {order.paymentMethod}
                    </p>
                    <p>
                        ✅ <strong>Thanh toán:</strong>{' '}
                        <Badge variant={order.isPaid ? 'success' : 'destructive'}>
                            {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </Badge>
                    </p>
                    <p>
                        🚚 <strong>Giao hàng:</strong>{' '}
                        <Badge variant={order.isDelivered ? 'success' : 'warning'}>
                            {order.isDelivered ? 'Đã giao' : 'Đang xử lý'}
                        </Badge>
                    </p>
                </div>

                <Separator />

                <div className="text-sm text-gray-700">
                    <p className="mb-1 font-semibold">📍 Địa chỉ giao hàng</p>
                    <p>
                        {order.shippingAddress.fullname} - {order.shippingAddress.phone}
                    </p>
                    <p>{order.shippingAddress.address}</p>
                </div>

                <Separator />

                <div>
                    <p className="mb-2 text-sm font-semibold text-gray-800">📦 Sản phẩm:</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                        {order.cartItem.map((item) => (
                            <li key={item.product} className="flex justify-between">
                                <span>
                                    {item.name} × {item.amount}
                                </span>
                                <span>{item.price.toLocaleString('vi-VN')}đ</span>
                            </li>
                        ))}
                    </ul>

                    {!order.isDelivered && (
                        <AlertDialog
                            open={openDeleteDialogs[order._id] || false}
                            onOpenChange={(open) => handleOpenDeleteDialog(order._id, open)}
                        >
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-5 h-7 border-red-500 text-red-500 hover:bg-red-50"
                                >
                                    Huỷ đơn
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Hủy đơn hàng?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Bạn có chắc chắn muốn hủy đơn hàng không?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Huỷ</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleCancelOrder(order._id)}>
                                        Chắc chắn
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default OrderCard;
