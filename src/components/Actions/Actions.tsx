import { Button } from '@/components/ui/button';
import { User, ShoppingCart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router';
import config from '@/config';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
function Actions() {
    const user = useSelector((state: RootState) => state.user);
    console.log(user);
    return (
        <div className="col-span-3 flex items-center justify-end gap-2">
            {user?.name ? (
                <Link to={config.routes.home}>
                    <Button variant="outline">
                        <User /> {user?.name}
                    </Button>
                </Link>
            ) : (
                <Link to={config.routes.login}>
                    <Button variant="outline">
                        <User /> Đăng nhập
                    </Button>
                </Link>
            )}

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
