import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import type { Order } from '@/types/cart';

interface ExportOrderExcelProps {
    data: Order[];
    fileName?: string;
    sheetName?: string;
}

function ExportOrderExcel({ data, fileName = 'OrderList.xlsx', sheetName = 'Orders' }: ExportOrderExcelProps) {
    // Phẳng hóa dữ liệu đơn hàng
    const flattenOrder = (order: Order) => ({
        Mã_đơn: order._id,
        Họ_tên: order.shippingAddress?.fullname,
        Địa_chỉ: order.shippingAddress?.address,
        SĐT: order.shippingAddress?.phone,
        Sản_phẩm: order.cartItem?.map((item) => `${item.name} x${item.amount}`).join(', '),
        Tổng_tiền: order.totalPrice,
        Thanh_toán: order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
        Ngày_tạo: new Date(order.createdAt).toLocaleString('vi-VN'),
        Trạng_thái_giao: order.isDelivered ? 'Đã giao' : 'Chưa giao',
        User_ID: order.user,
        Phương_thức: order.paymentMethod,
    });

    const handleExport = () => {
        const filteredData = data.map(flattenOrder);
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
    };

    return (
        <Button onClick={handleExport} variant="outline" size="default" className="cursor-pointer hover:bg-neutral-400">
            <FileDown /> Export Excel
        </Button>
    );
}

export default ExportOrderExcel;
