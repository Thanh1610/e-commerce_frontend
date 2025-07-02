import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import { deleteOrder } from '@/services/cartApi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

interface DeleteOrderModalProps {
    orderId: string;
    onSuccess?: () => void;
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function DeleteOrderModal({ orderId, onSuccess, open, onOpenChange }: DeleteOrderModalProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = typeof open === 'boolean' && typeof onOpenChange === 'function';
    const dialogOpen = isControlled ? open : internalOpen;
    const setDialogOpen = isControlled ? onOpenChange! : setInternalOpen;

    const deleteMutation = useMutation({
        mutationFn: async () => await deleteOrder(orderId),
        onSuccess: (res) => {
            if (res.status === 'SUCCESS') {
                toast.success('Xóa đơn hàng thành công!');
                setDialogOpen(false);
                if (onSuccess) onSuccess();
            } else {
                toast.error(res.message || 'Xóa thất bại!');
            }
        },
        onError: () => {
            toast.error('Có lỗi xảy ra!');
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    };

    return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn xóa đơn hàng này?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này không thể hoàn tác. Đơn hàng sẽ bị xóa vĩnh viễn khỏi hệ thống.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Quay lại</AlertDialogCancel>
                    <LoadingButton
                        loading={deleteMutation.isPending}
                        onClick={handleDelete}
                        idleText="Xóa"
                        loadingText="Đang xóa..."
                        className="hover:bg-red-500"
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
