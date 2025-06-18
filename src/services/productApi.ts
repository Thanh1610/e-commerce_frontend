import axios from '@/utils/axios.customzie';
import type {
    ProductFormData,
    GetProductTypeProps,
    ProductReponse,
    DeleteProduct,
    DeleteManyResponse,
    SearchProductReponse,
    SearchProduct,
} from '@/types/product';

const getAllProduct = async () => {
    const URL_API = '/product/products';
    return await axios.get(URL_API);
};

const getProductType = async (data: GetProductTypeProps) => {
    const URL_API = '/product/products';
    return await axios.get(URL_API, {
        params: {
            type: data?.type,
            sort: data?.sort,
            order: data?.order,
            limit: data?.limit,
        },
    });
};

const createProduct = async (data: ProductFormData): Promise<ProductReponse> => {
    const URL_API = '/product/create';
    return await axios.post(URL_API, data);
};

const updateProduct = async (data: ProductFormData): Promise<ProductReponse> => {
    const URL_API = `/product/update/${data?._id}`;
    return await axios.put(URL_API, data);
};

const deleteProduct = async ({ _id }: DeleteProduct): Promise<ProductReponse> => {
    const URL_API = `/product/delete/${_id}`;
    return await axios.delete(URL_API);
};

const deleteManyProduct = async (ids: string[]): Promise<DeleteManyResponse> => {
    const URL_API = '/product/delete-many';
    return await axios.delete(URL_API, { data: ids });
};

const searchProduct = async (data: SearchProduct): Promise<SearchProductReponse> => {
    const URL_API = '/product/search';
    return await axios.get(URL_API, {
        params: {
            q: data?.name,
            type: data?.type,
        },
    });
};

const getDetailProductBySlug = async (slug: string): Promise<ProductReponse> => {
    const URL_API = `/product/details/slug/${slug}`;
    return await axios.get(URL_API);
};

const getAllType = async () => {
    const URL_API = '/product/get-all-type';
    return await axios.get(URL_API);
};
export {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteManyProduct,
    searchProduct,
    getDetailProductBySlug,
    getAllType,
    getProductType,
};
