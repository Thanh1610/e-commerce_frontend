import {
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/slices/cartSlice';

type Props = {
    productId: string;
    productName: string;
    onClose?: () => void;
};

function DeleteCartDialogContent({ productId, productName, onClose }: Props) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removeFromCart(productId));
        toast.success(`Đã xoá ${productName} khỏi giỏ hàng.`);
        onClose?.();
    };

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Xoá sản phẩm?</AlertDialogTitle>
                <AlertDialogDescription>
                    Bạn có chắc chắn muốn xoá <strong>{productName}</strong> khỏi giỏ hàng không?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Huỷ</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Xoá</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}

export default DeleteCartDialogContent;
