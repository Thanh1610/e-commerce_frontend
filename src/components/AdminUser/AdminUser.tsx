import { useState, useEffect } from 'react';
import type { User } from '@/components/AdminUser/Column';

import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/components/AdminUser/Column';
import { UserContext } from '@/contexts/UserContext';
import { getAllUser } from '@/services/userApi';
import AdminUserSheet from '@/components/AdminUser/AdminUserSheet';
import ExportExcel from '@/components/ExportExcel/ExportExcel';

export default function AdminUser() {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getAllUser();
            setData(res?.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <UserContext.Provider value={{ refreshUsers: fetchProducts }}>
            <div className="w-full p-[15px]">
                <h2 className="text-2xl font-bold">Quản lý người dùng</h2>

                <div className="mt-5 flex items-center gap-6">
                    <AdminUserSheet title="Thêm người dùng" />
                    <ExportExcel data={data} fileName="UserList.xlsx" sheetName="Users" type="user" />
                </div>

                {loading ? (
                    <div className="py-10 text-center text-gray-500">Đang tải dữ liệu người dùng...</div>
                ) : (
                    <DataTable columns={columns} data={data} type="user" />
                )}
            </div>
        </UserContext.Provider>
    );
}
