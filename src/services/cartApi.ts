import axiosJwt from '@/utils/axiosJwt';

// import type { ProductReponse } from '@/types/product';
import type { CartState } from '@/redux/slices/cartSlice';
import type { CartItems } from '@/redux/slices/cartSlice';

type CreateOrderProps = {
    cartItem: CartItems[];
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
    fullname: string;
    address: string;
    phone: string;
    user: string;
};

export type CreateOrderResponse = {
    data: {
        status: string;
        message: string;
        data: CartState;
    };
};

const createOrder = async (data: CreateOrderProps): Promise<CreateOrderResponse> => {
    const URL_API = '/cart/create-order';
    return await axiosJwt.post(URL_API, data);
};

export { createOrder };
