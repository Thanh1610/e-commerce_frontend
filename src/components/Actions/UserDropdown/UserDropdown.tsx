import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, LogOut, Info, RotateCw } from 'lucide-react';
import { logoutUser } from '@/utils/userApi';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/redux/slices/userSlice';
import { useState } from 'react';

type User = {
    name: string;
};

interface Props {
    user: User;
}

function UserDropdown({ user }: Props) {
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleLogout = async () => {
        setLoading(true);
        await logoutUser();
        dispatch(clearUser());
        localStorage.removeItem('access_token');
        setLoading(false);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
                {loading ? (
                    <Button size="default" disabled>
                        <RotateCw className="animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button variant="outline" className="cursor-pointer">
                        <User /> {user?.name}
                    </Button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start">
                <DropdownMenuItem>
                    <Info /> Thông tin người dùng
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut /> Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserDropdown;
