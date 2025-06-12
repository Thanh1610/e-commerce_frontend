import { createContext, useContext } from 'react';

export const ProductContext = createContext<{ refreshProducts: () => void } | null>(null);

export const useProductContext = () => {
    const product = useContext(ProductContext);
    if (!product) throw new Error('useProductContext phải nằm trong ProductProvider');
    return product;
};
