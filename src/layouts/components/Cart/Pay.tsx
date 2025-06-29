import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useNavigate } from 'react-router';
import config from '@/config';
import { toast } from 'react-toastify';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/services/cartApi';
import { Loader2Icon } from 'lucide-react';
import { removeMultipleFromCart } from '@/redux/slices/cartSlice';

function Pay() {
    const user = useSelector((state: RootState) => state.user);
    const checkedIds = useSelector((state: RootState) => state.cart.checkedIds);
    const cartItems = useSelector((state: RootState) => state.cart.cartItem);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    //lọc ra số sản phẩm được check
    const checkedItems = cartItems.filter((item) => checkedIds.includes(item.product));

    const subTotal = checkedItems.reduce((total, item) => total + item?.price * item?.amount, 0); //Tạm tính
    const discount = 0; //Giảm giá
    const tax = 0; // tạm thời chưa có
    const shippingFee = subTotal > 0 ? 20000 : 0;
    const total = subTotal - discount + tax + shippingFee;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createOrderMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: async (res) => {
            if (res?.data?.status === 'SUCCESS') {
                toast.success(res?.data?.message || 'Đặt hàng thành công!');
                dispatch(removeMultipleFromCart(checkedItems.map((item) => item.product)));
                navigate(config.routes.orders);
            } else {
                toast.error(res?.data?.message || 'Đặt hàng thất bại!');
            }
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Lỗi kết nối máy chủ!';
            toast.error(message);
        },
    });

    const handlePayClick = () => {
        if (!user?.address) {
            toast.warning('Vui lòng cập nhật địa chỉ!');
            navigate(config.routes.profile);
        } else {
            const payload = {
                cartItem: checkedItems,
                paymentMethod,
                itemsPrice: subTotal,
                shippingPrice: shippingFee,
                totalPrice: total,
                fullname: user?.name,
                address: user?.address,
                phone: user?.phone,
                user: user?._id,
            };
            createOrderMutation.mutate(payload);
        }
    };

    const handleAddressClick = () => {
        navigate(config.routes.profile);
    };

    const loading = createOrderMutation.isPending;
    return (
        <Card className="w-full lg:w-80">
            <CardContent className="space-y-3 p-4 text-sm">
                {/* Địa chỉ */}
                <div className="mt-[15px] flex flex-col gap-2 border-b pb-[15px]">
                    <h3 className="mb-5 text-xl font-medium">Thông tin vận chuyển</h3>
                    <span className="font-medium">Địa chỉ nhận hàng:</span>
                    <p className="line-clamp-2 flex w-full break-all italic hover:underline">{user?.address}</p>
                    <p className="cursor-pointer text-blue-400 hover:underline" onClick={handleAddressClick}>
                        Thay đổi ngay
                    </p>
                </div>

                {/* Phương thức thanh toán */}
                <div className="space-y-2">
                    <h3 className="text-base font-medium">Hình thức thanh toán</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod" className="cursor-pointer">
                                Tiền mặt khi nhận hàng
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="momo" id="momo" />
                            <Label htmlFor="momo" className="cursor-pointer">
                                Thanh toán bằng Momo
                            </Label>
                        </div>
                    </RadioGroup>
                    <Separator className="my-2" />
                </div>

                {/* Thanh toán */}
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

                {loading ? (
                    <Button disabled className="w-full cursor-pointer select-none">
                        <Loader2Icon className="animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button
                        onClick={handlePayClick}
                        className="w-full cursor-pointer bg-red-500 select-none hover:bg-red-600"
                        disabled={checkedItems.length === 0}
                    >
                        Mua hàng
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default Pay;
