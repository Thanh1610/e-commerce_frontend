import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import RegisterForm from '@/pages/Register/RegisterForm/RegisterForm';
import { UserRoundPlus } from 'lucide-react';

function AdminUserModal() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild className="mt-5 bg-neutral-800">
                    <Button variant="outline" className="text-neutral-200">
                        <UserRoundPlus />
                        Thêm Người dùng
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <RegisterForm />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default AdminUserModal;
