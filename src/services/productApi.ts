import axios from '@/utils/axios.customzie';

const getAllProduct = async () => {
    const URL_API = '/product/products';
    return await axios.get(URL_API);
};

export { getAllProduct };
