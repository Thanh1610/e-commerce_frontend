import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateUser } from '@/services/userApi';

export function useUpdateUser(afterUpdate?: (resData: any) => void) {
    return useMutation({
        mutationFn: updateUser,
        onSuccess: async (res) => {
            if (res?.status === 'SUCCESS') {
                afterUpdate?.(res.data);
                toast.success(res?.message || 'Cập nhật thành công!');
            } else {
                toast.error(res?.message || 'Cập nhật thất bại!');
            }
        },
        onError: (error: any) => {
            const message = error?.response?.data?.EM || 'Lỗi kết nối máy chủ!';
            toast.error(message);
        },
    });
}
