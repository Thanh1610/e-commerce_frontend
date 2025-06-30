import axios from '@/utils/axios.customzie';
export type ZaloCreateOrderResponse = {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    order_token: string;
    order_url: string;
    zp_trans_token: string;
};
export const createZaloOrder = async (amount: number): Promise<ZaloCreateOrderResponse> => {
    return await axios.post('/zalo/create-order', { amount });
};
