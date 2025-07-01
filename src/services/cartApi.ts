import axiosJwt from '@/utils/axiosJwt';
import axios from '@/utils/axios.customzie';

import type { CartItems } from '@/redux/slices/cartSlice';

type CreateOrder = {
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

export type DeleteOrderResponse = {
    status: string;
    message: string;
    data: Order;
};

export type getAllOrderResponse = {
    status: string;
    message: string;
    data: Order;
};

const createOrder = async (data: CreateOrder): Promise<CreateOrderResponse> => {
    const URL_API = '/cart/create-order';
    return await axiosJwt.post(URL_API, data);
};

const getOrders = async (userId: string): Promise<Order[]> => {
    const res = await axios.get(`/cart/orders?id=${userId}`);
    return res.data;
};

const deleteOrder = async (userId: string): Promise<DeleteOrderResponse> => {
    return await axios.delete(`/cart/delete-order/${userId}`);
};

const getAllOrder = async (): Promise<getAllOrderResponse> => {
    const res = await axiosJwt.get(`/cart/get-all-order`);
    return res.data;
};

export { createOrder, getOrders, deleteOrder, getAllOrder };
