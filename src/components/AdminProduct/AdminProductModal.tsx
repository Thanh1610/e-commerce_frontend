import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { ListPlus } from 'lucide-react';
import AdminProductForm from './AdminProductForm';

function AdminUserModal() {
    return (
        <Dialog>
            <DialogTrigger asChild className="mt-5 bg-neutral-800">
                <Button variant="outline" className="text-neutral-200">
                    <ListPlus />
                    Thêm sản phẩm
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="max-h-[90vh] overflow-auto sm:max-w-2xl">
                <AdminProductForm />
            </DialogContent>
        </Dialog>
    );
}

export default AdminUserModal;
