import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { getBase64 } from '@/utils/helpers/getBase64';
import { createProduct } from '@/services/productApi';
import { useProductContext } from '@/contexts/ProductContext';
import ProductUpdateField from '@/components/FormFields/ProductUpdateField';

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

function AdminProductForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const { refreshProducts } = useProductContext();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<AddProductFormData>();

    const onSubmit = async (data: AddProductFormData) => {
        setLoading(true);
        try {
            let base64Avatar = undefined;

            if (data.image && data.image.length > 0) {
                base64Avatar = await getBase64(data.image[0]);
            }

            const payload = {
                ...data,
                image: base64Avatar,
            };

            const res = await createProduct(payload);

            if (res?.status === 'SUCCESS') {
                toast.success(res?.message || 'Thêm sản phẩm thành công!');
                await refreshProducts();
            } else {
                toast.error(res?.message || 'Thêm sản phẩm thất bại!');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            reset();
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
                <DialogTitle>Thêm sản phẩm</DialogTitle>
            </DialogHeader>

            <div className="mt-6 flex flex-col gap-4">
                <ProductUpdateField register={register} errors={errors} setValue={setValue} watch={watch} />
            </div>

            <DialogFooter className="mt-4">
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>

                {loading ? (
                    <Button size="default" disabled>
                        <RotateCw className="animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit">Save changes</Button>
                )}
            </DialogFooter>
        </form>
    );
}

export default AdminProductForm;
