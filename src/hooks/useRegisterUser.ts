import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { registerApi } from '@/services/userApi';

export function useRegisterUser(afterRegister?: () => void) {
    return useMutation({
        mutationFn: registerApi,
        onSuccess: async (res) => {
            if (res.EC === 0) {
                afterRegister?.();
                toast.success('Đăng ký thành công!');
            } else {
                toast.error(res.EM || 'Email đã tồn tại!');
            }
        },
        onError: (error: any) => {
            const message = error?.response?.data?.EM || 'Lỗi kết nối máy chủ!';
            toast.error(message);
        },
    });
}
