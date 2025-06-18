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
import AdminProductUpdateForm from './AdminProductUpdateForm';
import type { Product } from '@/pages/Home/HomePage';
import { useState } from 'react';
import AdminProductDeleteModal from './AdminProductDeleteModal';

export interface AdminProductActionsProps {
    product: Product;
}

function AdminProductActions({ product }: AdminProductActionsProps) {
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
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product._id)}>
                        Sao chép ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>Sửa sản phẩm</DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600">
                        Xóa sản phẩm
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild className="mt-5 bg-neutral-800"></DialogTrigger>
                <DialogContent aria-describedby={undefined} className="max-h-[90vh] overflow-auto sm:max-w-2xl">
                    <AdminProductUpdateForm product={product} />
                </DialogContent>
            </Dialog>

            <AdminProductDeleteModal open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} product={product} />
        </>
    );
}

export default AdminProductActions;
