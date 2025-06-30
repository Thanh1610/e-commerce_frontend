import { useNavigate } from 'react-router';
import config from '@/config';

function ShippingInfo({ address }: { address?: string }) {
    const navigate = useNavigate();
    const handleAddressClick = () => {
        navigate(config.routes.profile);
    };
    return (
        <div className="mt-[15px] flex flex-col gap-2 border-b pb-[15px]">
            <h3 className="mb-5 text-xl font-medium">Thông tin vận chuyển</h3>
            <span className="font-medium">Địa chỉ nhận hàng:</span>
            <p className="line-clamp-2 flex w-full break-all italic hover:underline">
                {address || 'Chưa cập nhật địa chỉ'}
            </p>
            <p className="cursor-pointer text-blue-400 hover:underline" onClick={handleAddressClick}>
                Thay đổi ngay
            </p>
        </div>
    );
}

export default ShippingInfo;
