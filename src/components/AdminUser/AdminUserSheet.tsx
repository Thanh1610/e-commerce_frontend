import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import AdminUserform from '@/components/AdminUser/AdminUserform';

export type AdminUserModalProps = {
    title: string;
};

function AdminUserSheet({ title }: AdminUserModalProps) {
    return (
        <Sheet>
            <SheetTrigger asChild className="mt-5">
                <Button variant="outline" className="cursor-pointer bg-neutral-900 text-neutral-200">
                    <User />
                    {title}
                </Button>
            </SheetTrigger>
            <AdminUserform />
        </Sheet>
    );
}

export default AdminUserSheet;
