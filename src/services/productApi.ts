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

type DeleteProduct = {
    _id: string;
};
const deleteProduct = async ({ _id }: DeleteProduct): Promise<CreateProductReponse> => {
    const URL_API = `/product/delete/${_id}`;
    return await axios.delete(URL_API);
};

type DeleteManyResponse = {
    status: string;
    message: string;
    data: {
        acknowledged: boolean;
        deletedCount: number;
    };
};
const deleteManyProduct = async (ids: string[]): Promise<DeleteManyResponse> => {
    const URL_API = '/product/delete-many';
    return await axios.delete(URL_API, { data: ids });
};
export { getAllProduct, createProduct, updateProduct, deleteProduct, deleteManyProduct };
