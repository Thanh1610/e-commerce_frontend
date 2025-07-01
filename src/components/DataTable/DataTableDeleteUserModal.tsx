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
import { deleteManyUser } from '@/services/userApi';
import { useMutation } from '@tanstack/react-query';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import { useUserContext } from '@/contexts/UserContext';
import { toast } from 'react-toastify';

interface DeleteSelectedButtonProps<TData> {
    table: Table<TData>;
    onResetSelection: () => void;
}
function DataTableDeleteUserModal<TData>({ table, onResetSelection }: DeleteSelectedButtonProps<TData>) {
    const [open, setOpen] = useState<boolean>(false);
    const { refreshUsers } = useUserContext();

    const handleClick = async () => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => (row.original as any)._id);
        deleteManyMutation.mutate(selectedIds);
    };

    const deleteManyMutation = useMutation({
        mutationFn: async (selectedIds: string[]) => await deleteManyUser(selectedIds),
        onSuccess: async (res) => {
            if (res?.status === 'SUCCESS') {
                await refreshUsers();
                toast.success(res?.message || 'Xóa thành công!');
                setOpen(false);
                onResetSelection();
            } else {
                toast.error(res?.message || 'Xóa thất bại!');
            }
        },
    });

    const loading = deleteManyMutation.isPending;
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
                        Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn tài khoản khỏi máy chủ của chúng
                        tôi.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Quay lại</AlertDialogCancel>
                    <LoadingButton
                        loading={loading}
                        onClick={handleClick}
                        className="hover:bg-red-500"
                        size="default"
                        type="submit"
                        idleText="Xóa"
                        loadingText="Đang xử lý..."
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DataTableDeleteUserModal;
