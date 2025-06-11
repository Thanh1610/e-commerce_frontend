import { createContext, useContext } from 'react';

export const ProductContext = createContext<{ refreshProducts: () => void } | null>(null);

export const useProductContext = () => {
    const product = useContext(ProductContext);
    console.log('🚀 ~ useProductContext ~ product:', product);
    if (!product) throw new Error('useProductContext phải nằm trong ProductProvider');
    return product;
};
