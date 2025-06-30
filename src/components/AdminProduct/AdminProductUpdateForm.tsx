import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import type { AdminProductActionsProps } from '@/components/AdminProduct/AdminProductActions';
import { Button } from '@/components/ui/button';
import { getBase64 } from '@/utils/helpers/getBase64';
import { updateProduct } from '@/services/productApi';
import { useProductContext } from '@/contexts/ProductContext';
import ProductUpdateField from '@/components/FormFields/ProductUpdateField';
import LoadingButton from '@/components/LoadingButton/LoadingButton';

export type AddProductFormData = {
    name: string;
    image: FileList;
    type: string;
    price: number;
    oldPrice?: number;
    selled?: number;
    countInStock: number;
    rating: number;
    description?: string;
    isSale?: boolean;
};

function AdminProductUpdateForm({ product }: AdminProductActionsProps) {
    const { refreshProducts } = useProductContext();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<AddProductFormData>();

    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: async (res) => {
            if (res?.status === 'SUCCESS') {
                await refreshProducts();
                toast.success(res?.message || 'Cập nhật thành công!');
            } else {
                toast.error(res?.message || 'Cập nhật thất bại!');
            }
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Lỗi kết nối máy chủ!';
            toast.error(message);
        },
    });

    const onSubmit = async (data: AddProductFormData) => {
        let base64Avatar = undefined;

        if (data.image && data.image.length > 0) {
            base64Avatar = await getBase64(data.image[0]);
        }

        const payload = {
            ...data,
            image: base64Avatar,
            _id: product?._id,
        };

        updateProductMutation.mutate(payload);
    };

    const loading = updateProductMutation.isPending;

    useEffect(() => {
        if (product) {
            reset({
                name: product?.name,
                type: product?.type,
                price: product?.price,
                oldPrice: product?.oldPrice,
                selled: product?.selled,
                countInStock: product?.countInStock,
                rating: product?.rating,
            });
        }
    }, [product, reset]);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
                <DialogTitle>Cập nhật sản phẩm</DialogTitle>
            </DialogHeader>

            <div className="mt-6 flex flex-col gap-4">
                <ProductUpdateField register={register} errors={errors} setValue={setValue} watch={watch} />
            </div>

            <DialogFooter className="mt-4">
                <DialogClose asChild>
                    <Button variant="outline">Quay lại</Button>
                </DialogClose>

                <LoadingButton
                    loading={loading}
                    size="default"
                    type="submit"
                    idleText="Cập nhật"
                    loadingText="Đang xử lý..."
                />
            </DialogFooter>
        </form>
    );
}

export default AdminProductUpdateForm;
