import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, LogOut, RotateCw, UserPen, MonitorCog, History } from 'lucide-react';
import { logoutUser } from '@/services/userApi';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/redux/slices/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import config from '@/config';
import type { UserState } from '@/redux/slices/userSlice';

interface Props {
    user: UserState;
}

function UserDropdown({ user }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = async () => {
        setLoading(true);
        await logoutUser();
        dispatch(clearUser());
        localStorage.removeItem('access_token');
        setLoading(false);
        navigate(config.routes.home);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
                {loading ? (
                    <Button size="default" disabled>
                        <RotateCw className="animate-spin" />
                        Đang xử lý...
                    </Button>
                ) : (
                    <Button variant="outline" className="cursor-pointer">
                        {user?.avatar ? (
                            <img src={user?.avatar} alt="avatar" className="h-6 w-6 rounded-full" />
                        ) : (
                            <User />
                        )}{' '}
                        {user?.name}
                    </Button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start">
                <DropdownMenuItem onClick={() => navigate(config.routes.profile)}>
                    <UserPen />
                    Trang cá nhân
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate(config.routes.orders)}>
                    <History />
                    Lịch sử mua hàng
                </DropdownMenuItem>

                {user.isAdmin && (
                    <DropdownMenuItem onClick={() => navigate(config.routes.admin)}>
                        <MonitorCog /> Quản lý hệ thống
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut /> Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserDropdown;
