import axios from '@/utils/axios.customzie';

type ProductFormData = {
    name: string;
    image: string | undefined;
    type: string;
    price: number;
    oldPrice?: number;
    selled?: number;
    countInStock: number;
    rating: number;
    description?: string;
    isSale?: boolean;
    token?: string;
    _id?: string;
};

const getAllProduct = async () => {
    const URL_API = '/product/products';
    return await axios.get(URL_API);
};

type CreateProductReponse = {
    status: string;
    message: string;
    data: ProductFormData;
};
const createProduct = async (data: ProductFormData): Promise<CreateProductReponse> => {
    const URL_API = '/product/create';
    return await axios.post(URL_API, data);
};

const updateProduct = async (data: ProductFormData): Promise<CreateProductReponse> => {
    const URL_API = `/product/update/${data?._id}`;
    return await axios.put(URL_API, data);
};

export { getAllProduct, createProduct, updateProduct };
