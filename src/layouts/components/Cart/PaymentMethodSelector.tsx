import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Wallet, Landmark } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type Props = {
    value: string;
    onValueChange: (val: string) => void;
};
function PaymentMethodSelector({ value, onValueChange }: Props) {
    return (
        <div className="space-y-2">
            <h3 className="text-base font-medium">Hình thức thanh toán</h3>
            <RadioGroup value={value} onValueChange={onValueChange} className="space-y-1">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="cursor-pointer">
                        <Wallet className="text-muted-foreground h-4 w-4" />
                        Tiền mặt khi nhận hàng
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="zalopay" id="zalopay" />
                    <Label htmlFor="zalopay" className="cursor-pointer">
                        <Landmark className="text-muted-foreground h-4 w-4" />
                        Thanh toán bằng Zalopay
                    </Label>
                </div>
            </RadioGroup>
            <Separator className="my-2" />
        </div>
    );
}

export default PaymentMethodSelector;
