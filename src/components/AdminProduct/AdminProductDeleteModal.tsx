import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { ProductFormData } from '@/types/product';
import { deleteProduct } from '@/services/productApi';

import { RotateCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { useProductContext } from '@/contexts/ProductContext';
import { useMutation } from '@tanstack/react-query';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: ProductFormData;
};
function AdminProductDeleteModal({ open, onOpenChange, product }: Props) {
    const { refreshProducts } = useProductContext();

    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: async (res) => {
            if (res?.status === 'SUCCESS') {
                toast.success(res?.message);
                await refreshProducts();
                onOpenChange(false);
            } else {
                toast.error(res?.message);
            }
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Lỗi kết nối máy chủ!';
            toast.error(message);
        },
    });

    const handleSubmit = async () => {
        if (product?._id) {
            deleteProductMutation.mutate({ _id: product._id });
        }
    };

    const loading = deleteProductMutation.isPending;
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>

                    <AlertDialogDescription>
                        Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn sản phẩm của bạn khỏi máy chủ
                        của chúng tôi.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    {loading ? (
                        <Button size="default" disabled>
                            <RotateCw className="animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button
                            size="default"
                            onClick={handleSubmit}
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

export default AdminProductDeleteModal;
