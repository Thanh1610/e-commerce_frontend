import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/components/AdminProduct/Column';
import { useState, useEffect } from 'react';

import type { Product } from '@/pages/Home/HomePage';
import { getAllProduct } from '@/services/productApi';
import { ProductContext } from '@/contexts/ProductContext';
import AdminProductModal from '@/components/AdminProduct/AdminProductModal';
import ExportExcel from '@/components/ExportExcel/ExportExcel';

export default function AdminProduct() {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getAllProduct();
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
        <ProductContext.Provider value={{ refreshProducts: fetchProducts }}>
            <div className="w-full p-[15px]">
                <h2 className="text-2xl font-bold">Quản lý Sản phẩm</h2>
                <div className="mt-5 flex items-center gap-6">
                    <AdminProductModal title="Thêm sản phẩm" />
                    <ExportExcel data={data} fileName="ProductList.xlsx" sheetName="Products" type="product" />
                </div>
                {loading ? (
                    <div className="py-10 text-center text-gray-500">Đang tải dữ liệu sản phẩm...</div>
                ) : (
                    <DataTable columns={columns} data={data} type="product" />
                )}
            </div>
        </ProductContext.Provider>
    );
}
