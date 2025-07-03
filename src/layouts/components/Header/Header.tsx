import ProductCategory from '@/components/ProductCategory/ProductCategory';
import Actions from '@/components/Actions/Actions';
import { Link } from 'react-router';
import config from '@/config';
import Search from '@/layouts/components/Search/Search';
import SyberShopLogo from '@/assets/icon/SyberShopLogo';
import MobileSearchBar from '@/layouts/components/Search/MobileSearchBar';

function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#eff6ff] py-2.5 shadow">
            <div className="container mx-auto my-0 flex max-w-screen-lg items-center justify-between">
                {/* logo */}
                <Link to={config.routes.home}>
                    <SyberShopLogo width={220} height={60} />
                </Link>

                {/* search */}
                <div className="hidden items-center justify-center md:flex">
                    <Search />
                </div>

                {/* actions */}
                <div className="flex items-center justify-end gap-2">
                    <Actions />
                </div>
            </div>
            <div className="container mx-auto my-0 hidden w-full max-w-screen-lg items-center justify-center md:flex">
                <ProductCategory />
            </div>

            <div className="container mx-auto my-0 flex w-full max-w-screen-lg items-center justify-center md:hidden">
                <MobileSearchBar />
            </div>
        </header>
    );
}

export default Header;
