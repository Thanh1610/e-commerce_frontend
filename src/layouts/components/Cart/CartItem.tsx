import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { addToCart, type CartItems } from '@/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DeleteCartDialogContent from './DeleteCartDialogContent';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';

type CartItemProps = {
    cartItem: CartItems;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};
function CartItem({ cartItem, checked, onCheckedChange }: CartItemProps) {
    const [quantity, setQuantity] = useState(cartItem?.amount);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleQuantityChange = (newQuantity: number) => {
        if (!cartItem?.product) return;
        setQuantity(newQuantity);
        dispatch(addToCart({ ...cartItem, amount: newQuantity }));
        toast.info(`Đã cập nhật số lượng cho sản phẩm ${cartItem?.name}: ${newQuantity}`);
    };

    const handleDecrease = () => {
        if (quantity === 1) {
            setOpen(true);
        } else {
            handleQuantityChange(Math.max(0, quantity - 1));
        }
    };

    const subtotal = quantity * cartItem.price;

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <div className="flex items-center gap-4">
                <Checkbox checked={checked} onCheckedChange={onCheckedChange} />

                {/* Hình + tên */}
                <div className="flex flex-1 items-center gap-4">
                    <img src={cartItem.image} alt={cartItem.name} className="h-16 w-16 rounded border object-cover" />
                    <p className="text-sm font-medium">{cartItem.name}</p>
                </div>

                {/* Giá - Số lượng - Thành tiền */}
                <div className="hidden w-1/2 grid-cols-4 items-center text-center md:grid">
                    {/* Giá */}
                    <div>
                        <span className="mr-1 font-medium text-red-500">{cartItem.price.toLocaleString('vi-VN')}đ</span>
                    </div>

                    {/* Số lượng */}
                    <div className="inline-flex overflow-hidden rounded-md border text-sm">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDecrease}
                            className="border-border h-9 w-9 rounded-none border-r select-none"
                        >
                            −
                        </Button>

                        <div className="border-border flex h-9 w-9 items-center justify-center border-r">
                            {quantity}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="h-9 w-9 rounded-none select-none"
                        >
                            +
                        </Button>
                    </div>

                    {/* Thành tiền */}
                    <div className="font-semibold text-red-500">{subtotal.toLocaleString('vi-VN')}đ</div>

                    {/* Icon Xóa */}
                    <div className="flex justify-center">
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
                                <Trash2 size={16} />
                            </Button>
                        </AlertDialogTrigger>

                        {/* Dialog nội dung */}
                        <DeleteCartDialogContent
                            productId={cartItem.product}
                            productName={cartItem.name}
                            onClose={() => setOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </AlertDialog>
    );
}

export default CartItem;
