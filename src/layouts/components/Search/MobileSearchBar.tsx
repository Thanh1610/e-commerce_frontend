import CartBtn from '@/components/CartBtn/CartBtn';
import Search from '@/layouts/components/Search/Search';
import MobileProductCategory from '@/layouts/components/MobileProductCategory/MobileProductCategory';

const MobileSearchBar = () => (
    <div className="flex w-full max-w-full items-center rounded bg-white px-2 py-1 shadow">
        <MobileProductCategory />
        <div className="mx-2 flex min-w-0 flex-1 items-center">
            <Search className="min-w-0" />
        </div>
        <CartBtn className="relative cursor-pointer" />
    </div>
);

export default MobileSearchBar;
