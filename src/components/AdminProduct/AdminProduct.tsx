import { DataTable } from '../DataTable/DataTable';
import { columns } from './Column';
import type { Payment } from './Column';
import { useState, useEffect } from 'react';
import AdminProductModal from './AdminProductModal';

function getData(): Promise<Payment[]> {
    return Promise.resolve([
        {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
            phone: '0963828838',
        },
        {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
            phone: '0963828838',
        },
    ]);
}

export default function AdminProduct() {
    const [data, setData] = useState<Payment[]>([]);

    useEffect(() => {
        getData().then(setData).catch(console.error);
    }, []);

    return (
        <div className="p-[15px w-full]">
            <h2 className="text-2xl font-bold">Quản lý Sản phẩm</h2>
            <AdminProductModal />
            <DataTable columns={columns} data={data} />
        </div>
    );
}
