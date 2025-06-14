import ProductCategory from '@/components/ProductCategory/ProductCategory';
import Actions from '@/components/Actions/Actions';
import { Link } from 'react-router';
import config from '@/config';
import Search from '@/components/Search/Search';

function Header() {
    return (
        <header className="flex flex-col gap-4 border-b border-neutral-200 bg-[#eff6ff] py-2.5 shadow">
            <div className="container mx-auto my-0 grid max-w-screen-lg grid-cols-12 items-center">
                {/* logo */}
                <Link to={config.routes.home} className="col-span-3">
                    E-commerce
                </Link>

                {/* search */}
                <Search />

                {/* actions */}
                <Actions />
            </div>
            <ProductCategory />
        </header>
    );
}

export default Header;
