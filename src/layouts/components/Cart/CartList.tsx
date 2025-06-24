import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import CartItem from '@/layouts/components/Cart/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import type { CartState } from '@/redux/slices/cartSlice';
import type { RootState } from '@/redux/store';
import { useState } from 'react';
import { removeMultipleFromCart } from '@/redux/slices/cartSlice';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

function CartList() {
    const order: CartState = useSelector((state: RootState) => state.cart);
    const [checkedIds, setCheckedIds] = useState<string[]>([]);
    const dispatch = useDispatch();
    const [openBulkDelete, setOpenBulkDelete] = useState(false);

    const allChecked = checkedIds.length === order.cartItem.length;

    const handleToggleAll = (checked: boolean) => {
        if (checked) {
            setCheckedIds(order.cartItem.map((item) => item.product));
        } else {
            setCheckedIds([]);
        }
    };

    const handleToggleItem = (id: string, checked: boolean) => {
        setCheckedIds((prev) => (checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)));
    };

    const handleRemoveChecked = () => {
        dispatch(removeMultipleFromCart(checkedIds));
        setCheckedIds([]);
        setOpenBulkDelete(false);
    };

    return (
        <Card className="flex-1">
            <CardContent className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="all"
                            checked={allChecked}
                            onCheckedChange={(checked) => handleToggleAll(!!checked)}
                        />
                        <label htmlFor="all" className="text-sm font-medium">
                            Tất cả ({order?.cartItem.length} sản phẩm)
                        </label>
                        {checkedIds.length > 0 && (
                            <AlertDialog open={openBulkDelete} onOpenChange={setOpenBulkDelete}>
                                <AlertDialogTrigger asChild>
                                    <button className="ml-4 rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600">
                                        Xóa đã chọn ({checkedIds.length})
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Xóa các sản phẩm đã chọn?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Bạn có chắc chắn muốn xóa <strong>{checkedIds.length}</strong> sản phẩm khỏi
                                            giỏ hàng không?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Huỷ</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleRemoveChecked}>Xóa</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                    <div className="text-muted-foreground hidden w-1/2 grid-cols-4 text-center text-sm md:grid">
                        <span>Đơn giá</span>
                        <span>Số lượng</span>
                        <span>Thành tiền</span>
                        <span>
                            <Trash2 size={16} className="mx-auto" />
                        </span>
                    </div>
                </div>

                <Separator />
                {order?.cartItem.map((item) => (
                    <CartItem
                        key={item?.product}
                        cartItem={item}
                        checked={checkedIds.includes(item.product)}
                        onCheckedChange={(checked) => handleToggleItem(item.product, checked)}
                    />
                ))}
            </CardContent>
        </Card>
    );
}

export default CartList;
