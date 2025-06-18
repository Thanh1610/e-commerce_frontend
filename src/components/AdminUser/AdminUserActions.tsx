import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import type { User } from '@/types/user';
import AdminUserDeleteModal from '@/components/AdminUser/AdminUserDeleteModal';
import AdminUserUpdateForm from '@/components/AdminUser/AdminUserUpdateForm';

export interface AdminUserActionsProps {
    user: User;
}

function AdminUserActions({ user }: AdminUserActionsProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user._id)}>
                        Sao chép ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>Cập nhật người dùng</DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600">
                        Xóa người dùng
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild className="mt-5 bg-neutral-800"></DialogTrigger>
                <DialogContent aria-describedby={undefined} className="max-h-[90vh] overflow-auto sm:max-w-2xl">
                    <AdminUserUpdateForm users={user} />
                </DialogContent>
            </Dialog>

            <AdminUserDeleteModal open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} user={user} />
        </>
    );
}

export default AdminUserActions;
