import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useNavigate } from 'react-router';
import config from '@/config';
import { toast } from 'react-toastify';

function Pay() {
    const user = useSelector((state: RootState) => state.user);
    const checkedIds = useSelector((state: RootState) => state.cart.checkedIds);
    const cartItems = useSelector((state: RootState) => state.cart.cartItem);
    //lọc ra số sản phẩm được check
    const checkedItems = cartItems.filter((item) => checkedIds.includes(item.product));

    const subTotal = checkedItems.reduce((total, item) => total + item?.price * item?.amount, 0); //Tạm tính
    const discount = 0; //Giảm giá
    const tax = 0; // tạm thời chưa có
    const shippingFee = subTotal > 0 ? 20000 : 0;
    const total = subTotal - discount + tax + shippingFee;

    const navigate = useNavigate();

    const handlePayClick = () => {
        if (!user?.address) {
            toast.warning('Vui lòng cập nhật địa chỉ!');
            navigate(config.routes.profile);
        }
    };
    return (
        <Card className="w-full lg:w-80">
            <CardContent className="space-y-3 p-4 text-sm">
                <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{subTotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between">
                    <span>Giảm giá</span>
                    <span>{discount.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between">
                    <span>Thuế</span>
                    <span>{tax.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between">
                    <span>Phí giao hàng</span>
                    <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between text-lg font-semibold text-red-600">
                    <span>Tổng tiền</span>
                    <span>{total.toLocaleString('vi-VN')}đ</span>
                </div>
                <p className="text-muted-foreground text-xs">(Đã bao gồm VAT nếu có)</p>

                <Button
                    onClick={handlePayClick}
                    className="w-full cursor-pointer bg-red-500 select-none hover:bg-red-600"
                    disabled={checkedItems.length === 0}
                >
                    Mua hàng
                </Button>
            </CardContent>
        </Card>
    );
}

export default Pay;
