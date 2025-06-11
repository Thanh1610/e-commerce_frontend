import { DataTable } from '../DataTable/DataTable';
import { columns } from './Column';
import type { Product } from '@/pages/Home/HomePage';
import { useState, useEffect } from 'react';
import AdminProductModal from './AdminProductModal';
import { getAllProduct } from '@/services/productApi';

export default function AdminProduct() {
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAllProduct();
                setData(res?.data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="w-full p-[15px]">
            <h2 className="text-2xl font-bold">Quản lý Sản phẩm</h2>
            <AdminProductModal title="Thêm sản phẩm" />
            <DataTable columns={columns} data={data} searchColumn="name" />
        </div>
    );
}
