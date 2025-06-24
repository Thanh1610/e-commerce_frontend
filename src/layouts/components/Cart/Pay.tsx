import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

function Pay() {
    return (
        <Card className="w-full lg:w-80">
            <CardContent className="space-y-3 p-4 text-sm">
                <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>0</span>
                </div>
                <div className="flex justify-between">
                    <span>Giảm giá</span>
                    <span>0</span>
                </div>
                <div className="flex justify-between">
                    <span>Thuế</span>
                    <span>0</span>
                </div>
                <div className="flex justify-between">
                    <span>Phí giao hàng</span>
                    <span>0</span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between text-lg font-semibold text-red-600">
                    <span>Tổng tiền</span>
                    <span>0213</span>
                </div>
                <p className="text-muted-foreground text-xs">(Đã bao gồm VAT nếu có)</p>

                <Button className="w-full bg-red-500 hover:bg-red-600">Mua hàng</Button>
            </CardContent>
        </Card>
    );
}

export default Pay;
