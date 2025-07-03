import { useState } from 'react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import AdminUser from '@/components/AdminUser/AdminUser';
import AdminProduct from '@/components/AdminProduct/AdminProduct';
import AdminOrder from '@/components/AdminOrder/AdminOrder';
import Header from '@/layouts/components/Header/Header';

const menuItems = [
    { key: 'user', label: 'Người dùng' },
    { key: 'product', label: 'Sản phẩm' },
    { key: 'order', label: 'Đơn hàng' },
];

const pages: Record<string, React.JSX.Element> = {
    user: <AdminUser />,
    product: <AdminProduct />,
    order: <AdminOrder />,
};

const renderPage = (key: string) => pages[key] || <AdminUser />;

function AdminPage() {
    const [activeKey, setActiveKey] = useState<string>('user');
    const handleItemBtnClick = (key: string) => {
        setActiveKey(key);
    };
    return (
        <>
            <Header />
            <div className="flex h-screen flex-col bg-[#f2f4f7] lg:flex-row">
                {/* sidebar */}
                <div className="flex w-full min-w-[120px] flex-row gap-2 border-b shadow-amber-50 select-none lg:w-1/6 lg:flex-col lg:border-r lg:border-b-0">
                    {menuItems.map((item) => (
                        <Button
                            key={item.key}
                            variant="ghost"
                            onClick={() => handleItemBtnClick(item.key)}
                            className={clsx(
                                activeKey === item.key ? 'bg-blue-200/50' : '',
                                'transform cursor-pointer rounded-none transition-all duration-100 hover:bg-blue-200/50',
                            )}
                        >
                            {item.label}
                        </Button>
                    ))}
                </div>

                {/* content */}
                <div className="container mx-auto my-0 max-w-5xl p-6">{renderPage(activeKey)}</div>
            </div>
        </>
    );
}

export default AdminPage;
