import { User } from 'lucide-react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import { Button } from '@/components/ui/button';
import UserDropdown from '@/components/Actions/UserDropdown/UserDropdown';
import config from '@/config';
import CartBtn from '@/components/CartBtn/CartBtn';

function Actions() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <>
            <CartBtn className="relative hidden cursor-pointer md:flex" />

            {user?.name ? (
                <UserDropdown user={user} />
            ) : (
                <Link to={config.routes.login}>
                    <Button variant="outline">
                        <User /> Đăng nhập
                    </Button>
                </Link>
            )}
        </>
    );
}

export default Actions;
