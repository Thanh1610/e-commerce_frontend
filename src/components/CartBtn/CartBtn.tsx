import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import config from '@/config';

function CartBtn({ className = '' }) {
    const user = useSelector((state: RootState) => state.user);
    const cartItems = useSelector((state: RootState) => state.cart.cartItem);
    const itemCount = cartItems.length;
    const navigate = useNavigate();

    const handleClick = () => {
        if (!user?._id) {
            navigate(config.routes.login, { state: location?.pathname });
            return;
        }
        navigate(config.routes.cart);
    };
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleClick} className={className}>
                    <ShoppingCart />
                    {itemCount > 0 && (
                        <Badge
                            className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                            variant="destructive"
                        >
                            {itemCount}
                        </Badge>
                    )}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Giỏ hàng</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default CartBtn;
