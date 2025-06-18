import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AdminProductActions from './AdminProductActions';
import type { ProductFormData } from '@/types/product';

export const columns: ColumnDef<ProductFormData>[] = [
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
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'image',
        header: 'Hình ảnh',
        cell: ({ row }) => {
            const image = row.getValue('image') as string;
            return (
                <div className="h-10 w-10">
                    <img src={image} alt={row.getValue('name')} className="h-full w-full rounded-md object-cover" />
                </div>
            );
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Tên sản phẩm
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'type',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Loại
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Giá
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const price = row.getValue('price') as number;
            return <div>{price.toLocaleString('vi-VN')}đ</div>;
        },
    },
    {
        accessorKey: 'countInStock',
        header: 'Tồn kho',
    },
    {
        accessorKey: 'rating',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Đánh giá
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const rating = row.getValue('rating') as number;
            return <div>{rating.toFixed(1)} ⭐</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const product = row.original;
            return <AdminProductActions product={product} />;
        },
    },
];
