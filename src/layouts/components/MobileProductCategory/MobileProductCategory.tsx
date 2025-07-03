import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import ProductCategory from '@/components/ProductCategory/ProductCategory';

function MobileProductCategory() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    <Menu size={22} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
                <SheetHeader>
                    <SheetTitle>Danh Mục Sản Phẩm</SheetTitle>
                </SheetHeader>
                <ProductCategory />
                <SheetFooter>
                    <SheetClose asChild>
                        <Button className="mt-2">Đóng</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default MobileProductCategory;
