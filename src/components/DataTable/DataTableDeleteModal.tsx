import { Button } from '@/components/ui/button';
import type { Table } from '@tanstack/react-table';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { deleteManyUser } from '@/services/userApi';
import { toast } from 'react-toastify';
import { deleteManyProduct } from '@/services/productApi';
import { useProductContext } from '@/contexts/ProductContext';

interface DeleteSelectedButtonProps<TData> {
    table: Table<TData>;
    type: 'product' | 'user';
}
function DataTableDeleteModal<TData>({ table, type }: DeleteSelectedButtonProps<TData>) {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { refreshProducts } = useProductContext();

    const handleClick = async () => {
        setLoading(true);
        try {
            const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => (row.original as any)._id);
            console.log('Selected IDs to delete:', selectedIds);
            console.log('Selected rows:', table.getFilteredSelectedRowModel().rows);
            let res;
            if (type === 'user') {
                res = await deleteManyUser(selectedIds);
            } else if (type === 'product') {
                res = await deleteManyProduct(selectedIds);
            }

            if (res?.status === 'SUCCESS') {
                await refreshProducts();
                toast.success(res?.message || 'Xóa thành công!');
                setOpen(false);
            } else {
                toast.error(res?.message || 'Xóa thất bại!');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="ml-4">
                    Xóa {table.getFilteredSelectedRowModel().rows.length}/{table.getFilteredRowModel().rows.length} mục
                    đã chọn
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn tài khoản hoặc sản phẩm của bạn
                        khỏi máy chủ của chúng tôi.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {loading ? (
                        <Button size="default" disabled>
                            <RotateCw className="animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button
                            size="default"
                            onClick={handleClick}
                            type="submit"
                            className="cursor-pointer hover:bg-red-500"
                        >
                            Continue
                        </Button>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DataTableDeleteModal;
