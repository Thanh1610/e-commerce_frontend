import type { User } from '@/types/user';

import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/components/AdminUser/Column';
import { UserContext } from '@/contexts/UserContext';
import { getAllUser } from '@/services/userApi';
import AdminUserSheet from '@/components/AdminUser/AdminUserSheet';
import ExportExcel from '@/components/ExportExcel/ExportExcel';
import { useQuery } from '@tanstack/react-query';

export default function AdminUser() {
    const {
        data: res,
        isPending: loading,
        refetch,
    } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUser,
    });

    const data: User[] = res?.data || [];

    return (
        <UserContext.Provider value={{ refreshUsers: refetch }}>
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
