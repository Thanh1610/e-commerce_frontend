import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from '@/components/AdminProduct/Column';
import type { ProductFormData } from '@/types/product';
import { getAllProduct } from '@/services/productApi';
import { ProductContext } from '@/contexts/ProductContext';
import AdminProductModal from '@/components/AdminProduct/AdminProductModal';
import ExportExcel from '@/components/ExportExcel/ExportExcel';
import { useQuery } from '@tanstack/react-query';

export default function AdminProduct() {
    const {
        data: res,
        isPending: loading,
        refetch,
    } = useQuery({
        queryKey: ['product'],
        queryFn: () => getAllProduct(),
    });

    const data: ProductFormData[] = res?.data || [];

    return (
        <ProductContext.Provider value={{ refreshProducts: refetch }}>
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
