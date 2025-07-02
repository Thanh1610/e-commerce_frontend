import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { Order } from '@/types/cart';
import AdminOrderActions from '@/components/AdminOrder/AdminOrderActions';

export const columns: ColumnDef<Order>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: '_id',
        header: 'Mã đơn',
        cell: ({ row }) => <span className="font-mono text-xs text-gray-700">{row.getValue('_id')}</span>,
    },
    {
        accessorKey: 'cartItem',
        header: 'Sản phẩm',
        cell: ({ row }) => {
            const cartItemsRaw = row.getValue('cartItem');
            if (!Array.isArray(cartItemsRaw)) return null;
            return (
                <div className="flex flex-wrap gap-2">
                    {cartItemsRaw.map((product, index) => {
                        const productName = product.name;
                        const productQuantity = product.qty || 1;
                        return (
                            <span
                                key={product._id || index}
                                className="inline-flex items-center rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-800 shadow-sm"
                            >
                                <span className="mr-1 font-bold">{productName}</span>
                                <span className="text-red-500">x{productQuantity}</span>
                            </span>
                        );
                    })}
                </div>
            );
        },
    },
    {
        accessorKey: 'totalPrice',
        header: 'Tổng tiền',
        cell: ({ row }) => {
            const price = row.getValue('totalPrice') as number;
            return <div className="font-bold text-red-600">{price.toLocaleString('vi-VN')}đ</div>;
        },
    },
    {
        accessorKey: 'isPaid',
        header: 'Đã thanh toán',
        cell: ({ row }) =>
            row.getValue('isPaid') ? (
                <span className="flex justify-center font-bold text-lime-600">✔️</span>
            ) : (
                <span className="flex justify-center font-bold text-red-500">❌</span>
            ),
    },
    {
        accessorKey: 'isDelivered',
        header: 'Đã giao',
        cell: ({ row }) =>
            row.getValue('isDelivered') ? (
                <span className="flex justify-center font-bold text-lime-600">✔️</span>
            ) : (
                <span className="flex justify-center font-bold text-red-500">❌</span>
            ),
    },
    {
        accessorKey: 'shippingAddress',
        header: 'Địa chỉ',
        cell: ({ row }) => {
            const shippingAddress = row.getValue('shippingAddress') as { address?: string };
            return (
                <div className="max-w-[180px] text-xs break-words whitespace-pre-line text-gray-700">
                    {shippingAddress && shippingAddress.address ? shippingAddress.address : ''}
                </div>
            );
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Ngày tạo',
        cell: ({ row }) => (
            <span className="font-mono text-xs text-gray-500">
                {new Date(row.getValue('createdAt')).toLocaleString('vi-VN')}
            </span>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const order = row.original;
            return <AdminOrderActions order={order} />;
        },
    },
];
