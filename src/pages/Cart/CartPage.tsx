import Pay from '@/layouts/components/Cart/Pay';
import CartList from '@/layouts/components/Cart/CartList';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

function CartPage() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItem);
    const hasItems = cartItems.length > 0;
    if (!hasItems) {
        return (
            <div className="mx-auto max-w-4xl p-6 text-center">
                <h1 className="mb-4 text-xl font-semibold">Giỏ hàng</h1>
                <p className="text-muted-foreground">Chưa có sản phẩm nào trong giỏ hàng.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-4 md:p-8">
            <h1 className="mb-6 text-xl font-semibold">Giỏ hàng</h1>

            <div className="flex flex-col gap-6 xl:flex-row">
                {/* Cart List */}
                <div className="max-h-[600px] overflow-x-hidden overflow-y-auto">
                    <CartList />
                </div>

                {/* Pay */}
                <div className="w-full self-start xl:w-auto">
                    <Pay />
                </div>
            </div>
        </div>
    );
}

export default CartPage;
