import { Button } from '@/components/ui/button';
import { User, ShoppingCart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
function Actions() {
    return (
        <div className="col-span-3 flex items-center justify-end gap-2">
            <Button variant="outline">
                <User /> Đăng nhập
            </Button>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">
                        <ShoppingCart />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Giỏ hàng</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}

export default Actions;
