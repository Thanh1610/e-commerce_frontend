import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ProductCategory from '@/components/ProductCategory/ProductCategory';
import Actions from '@/components/Actions/Actions';

function Header() {
    return (
        <header className="flex flex-col gap-4 border-b border-neutral-200 bg-[#eff6ff] py-2.5 shadow">
            <div className="container mx-auto my-0 grid grid-cols-12 items-center">
                {/* logo */}
                <div className="col-span-3">E-commerce</div>

                {/* search */}
                <div className="col-span-6 flex items-center justify-center">
                    <div className="flex w-full max-w-sm items-center gap-2">
                        <Input type="text" placeholder="Search..." />
                        <Button type="submit" variant="outline">
                            <Search />
                        </Button>
                    </div>
                </div>

                {/* actions */}
                <Actions />
            </div>
            <ProductCategory />
        </header>
    );
}

export default Header;
