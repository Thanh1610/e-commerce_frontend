import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ExportExcelProps {
    data: any[];
    fileName?: string;
    sheetName?: string;
    type: 'user' | 'product';
}

function ExportExcel({ data, fileName = 'data.xlsx', sheetName = 'Sheet1', type }: ExportExcelProps) {
    // Xác định danh sách field cần loại dựa trên loại dữ liệu
    const fieldsToRemove = type === 'user' ? ['avatar'] : ['image'];

    // Hàm loại bỏ các trường không mong muốn khỏi mỗi object trong mảng
    const removeFields = (data: any[], fieldsToRemove: string[]) => {
        return data.map((item) => {
            const filtered = { ...item }; // Sao chép object gốc
            fieldsToRemove.forEach((field) => delete filtered[field]); // Xóa từng trường theo danh sách
            return filtered; // Trả về object đã lọc
        });
    };
    const handleExport = () => {
        // Lọc dữ liệu: bỏ các field không cần export
        const filteredData = removeFields(data, fieldsToRemove);

        // Chuyển dữ liệu JSON đã lọc thành worksheet (bảng)
        const worksheet = XLSX.utils.json_to_sheet(filteredData);

        // Tạo một workbook mới (file Excel)
        const workbook = XLSX.utils.book_new();

        // Thêm worksheet vào workbook và đặt tên sheet
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        // Ghi workbook ra dạng ArrayBuffer (nhị phân) để chuẩn bị lưu
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Tạo blob từ buffer, chuẩn bị cho việc tải file
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        // Dùng file-saver để mở hộp thoại "Save as" cho người dùng tải file Excel
        saveAs(blob, fileName);
    };
    return (
        <Button onClick={handleExport} variant="outline" size="default" className="cursor-pointer hover:bg-neutral-400">
            <FileDown /> Export Excel
        </Button>
    );
}

export default ExportExcel;
