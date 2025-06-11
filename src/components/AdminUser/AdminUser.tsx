import { DataTable } from '../DataTable/DataTable';
import { columns } from './Column';
import type { User } from './Column';
import { useState, useEffect } from 'react';
import AdminUserSheet from './AdminUserSheet';
import { UserContext } from '@/contexts/UserContext';
import { getAllUser } from '@/services/userApi';

export default function AdminUser() {
    const [data, setData] = useState<User[]>([]);

    const fetchProducts = async () => {
        try {
            const res = await getAllUser();
            setData(res?.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <UserContext.Provider value={{ refreshProducts: fetchProducts }}>
            <div className="w-full p-[15px]">
                <h2 className="text-2xl font-bold">Quản lý người dùng</h2>

                <AdminUserSheet title="Thêm người dùng" />

                <DataTable columns={columns} data={data} />
            </div>
        </UserContext.Provider>
    );
}
