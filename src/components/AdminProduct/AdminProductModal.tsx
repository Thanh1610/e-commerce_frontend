import { ListPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminProductForm from '@/components/AdminProduct/AdminProductForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export type AdminProductModalProps = {
    title: string;
};

function AdminProductModal({ title }: AdminProductModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild className="mt-5 bg-neutral-800">
                <Button variant="outline" className="text-neutral-200">
                    <ListPlus />
                    {title}
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="max-h-[90vh] overflow-auto sm:max-w-2xl">
                <AdminProductForm />
            </DialogContent>
        </Dialog>
    );
}

export default AdminProductModal;
