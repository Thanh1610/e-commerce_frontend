import type { CartItems } from '@/redux/slices/cartSlice';

export type CreateOrder = {
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

export type Order = {
    _id: string;
    cartItem: CartItems[];
    shippingAddress: {
        fullname: string;
        address: string;
        phone: string;
    };
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
    user: string;
    isPaid: boolean;
    paidAt: string;
    isDelivered: boolean;
    deliveredAt: string;
    createdAt: string;
    status?: string;
};

export type CreateOrderResponse = {
    data: {
        status: string;
        message: string;
        data: Order;
    };
};

export type OrderApiResponse = {
    status: string;
    message: string;
    data: Order;
};
