import { Separator } from '@/components/ui/separator';

type OrderSummaryProps = {
    subTotal: number;
    discount: number;
    tax: number;
    shippingFee: number;
    total: number;
};
function OrderSummary({ subTotal, discount, tax, shippingFee, total }: OrderSummaryProps) {
    return (
        <>
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
        </>
    );
}

export default OrderSummary;
