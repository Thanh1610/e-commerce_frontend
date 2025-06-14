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
import type { Product } from '@/pages/Home/HomePage';
import { deleteProduct } from '@/services/productApi';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { useProductContext } from '@/contexts/ProductContext';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: Product;
};
function AdminProductDeleteModal({ open, onOpenChange, product }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const { refreshProducts } = useProductContext();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await deleteProduct({ _id: product._id });
            if (res?.status === 'SUCCESS') {
                toast.success(res?.message);
                await refreshProducts();
                onOpenChange(false);
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
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
