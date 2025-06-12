import { useState } from 'react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import AdminUser from '@/components/AdminUser/AdminUser';
import AdminProduct from '@/components/AdminProduct/AdminProduct';

const menuItems = [
    { key: 'user', label: 'Người dùng' },
    { key: 'product', label: 'Sản phẩm' },
];

const pages: Record<string, React.JSX.Element> = {
    user: <AdminUser />,
    product: <AdminProduct />,
};

const renderPage = (key: string) => pages[key] || <AdminUser />;

function AdminPage() {
    const [activeKey, setActiveKey] = useState<string>('user');
    const handleItemBtnClick = (key: string) => {
        setActiveKey(key);
    };
    return (
        <div className="flex h-screen bg-[#f2f4f7]">
            {/* sidebar */}
            <div className="flex h-[100vh] w-1/6 flex-col gap-2 border shadow-amber-50 select-none">
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
    );
}

export default AdminPage;
