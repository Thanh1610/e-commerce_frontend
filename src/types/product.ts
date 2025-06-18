export type ProductFormData = {
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
    slug?: string;
};

export type ProductReponse = {
    status: string;
    message: string;
    data: ProductFormData;
};

export type GetProductTypeProps = {
    type: string;
    sort: string;
    order: string;
    limit: number;
};

export type DeleteProduct = {
    _id: string;
};

export type DeleteManyResponse = {
    status: string;
    message: string;
    data: {
        acknowledged: boolean;
        deletedCount: number;
    };
};

export type SearchProductReponse = {
    status: string;
    message: string;
    data: ProductFormData[];
};

export type SearchProduct = {
    name: string;
    type: string;
};
