import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { User } from '@/types/user';
import { deleteUser } from '@/services/userApi';
import { toast } from 'react-toastify';
import { useUserContext } from '@/contexts/UserContext';
import { useMutation } from '@tanstack/react-query';
import LoadingButton from '@/components/LoadingButton/LoadingButton';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User;
};
function AdminUserDeleteModal({ open, onOpenChange, user }: Props) {
    const { refreshUsers } = useUserContext();

    const handleSubmit = () => {
        deleteUserMutate({ _id: user._id });
    };

    const { mutate: deleteUserMutate, isPending: loading } = useMutation({
        mutationFn: deleteUser,
        onSuccess: async (res) => {
            if (res?.status === 'SUCCESS') {
                toast.success(res?.message);
                await refreshUsers();
                onOpenChange(false);
            } else {
                toast.error(res?.message);
            }
        },
        onError: (error: any) => {
            console.error(error);
            toast.error('Lỗi kết nối máy chủ!');
        },
    });
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>

                    <AlertDialogDescription>
                        Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn tài khoản của bạn khỏi máy chủ
                        của chúng tôi.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Quay lại</AlertDialogCancel>
                    <LoadingButton
                        loading={loading}
                        onClick={handleSubmit}
                        className="cursor-pointer hover:bg-red-500"
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

export default AdminUserDeleteModal;
