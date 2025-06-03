import { Button } from '@/components/ui/button';
import { User, ShoppingCart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router';
import config from '@/config';
function Actions() {
    return (
        <div className="col-span-3 flex items-center justify-end gap-2">
            <Link to={config.routes.login}>
                <Button variant="outline">
                    <User /> Đăng nhập
                </Button>
            </Link>

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
