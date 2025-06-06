import { Button } from '@/components/ui/button';
import { User, ShoppingCart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router';
import config from '@/config';
import UserDropdown from '@/components/Actions/UserDropdown/UserDropdown';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
function Actions() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="col-span-3 flex items-center justify-end gap-2">
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
