import { Button } from '@/components/ui/button';
import { User, ShoppingCart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, useNavigate } from 'react-router';
import config from '@/config';
import UserDropdown from '@/components/Actions/UserDropdown/UserDropdown';
import { Badge } from '@/components/ui/badge';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
function Actions() {
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
        <div className="col-span-3 flex items-center justify-end gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" onClick={handleClick} className="relative">
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

            {user?.name ? (
                <UserDropdown user={user} />
            ) : (
                <Link to={config.routes.login}>
                    <Button variant="outline">
                        <User /> Đăng nhập
                    </Button>
                </Link>
            )}
        </div>
    );
}

export default Actions;
