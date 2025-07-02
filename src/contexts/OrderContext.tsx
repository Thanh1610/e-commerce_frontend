import { createContext, useContext } from 'react';

export const OrderContext = createContext<{ refreshOrders: () => void } | null>(null);

export const useOrderContext = () => {
    const order = useContext(OrderContext);
    if (!order) throw new Error('useOrderContext phải nằm trong OrderProvider');
    return order;
};
