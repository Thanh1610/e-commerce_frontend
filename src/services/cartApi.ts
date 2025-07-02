import axiosJwt from '@/utils/axiosJwt';
import axios from '@/utils/axios.customzie';

import type { CreateOrder, Order, CreateOrderResponse, OrderApiResponse } from '@/types/cart';

const createOrder = async (data: CreateOrder): Promise<CreateOrderResponse> => {
    const URL_API = '/cart/create-order';
    return await axiosJwt.post(URL_API, data);
};

const getOrders = async (userId: string): Promise<Order[]> => {
    const res = await axios.get(`/cart/orders?id=${userId}`);
    return res.data;
};

const deleteOrder = async (userId: string): Promise<OrderApiResponse> => {
    return await axios.delete(`/cart/delete-order/${userId}`);
};

const getAllOrder = async (): Promise<OrderApiResponse> => {
    const res = await axiosJwt.get(`/cart/get-all-order`);
    return res.data;
};

const deleteManyOrder = async (ids: string[]): Promise<OrderApiResponse> => {
    const URL_API = '/cart/delete-many';
    return await axios.delete(URL_API, { data: ids });
};

const updateOrderStatus = async (
    orderId: string,
    updates: { isPaid?: boolean; isDelivered?: boolean },
): Promise<OrderApiResponse> => {
    const URL_API = `/cart/update-status/${orderId}`;
    return await axios.patch(URL_API, updates);
};

export { createOrder, getOrders, deleteOrder, getAllOrder, deleteManyOrder, updateOrderStatus };
