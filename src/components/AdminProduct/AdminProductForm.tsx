import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TextField from '@/components/FormFields/TextField';
import NumberField from '@/components/FormFields/NumberField';
import SelectField from '@/components/FormFields/SelectField';
import { getBase64 } from '@/utils/helpers/getBase64';
import { createProduct } from '@/services/productApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { useProductContext } from '@/contexts/ProductContext';

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
                toast.success('Thêm sản phẩm thành công!');
                await refreshProducts();
            } else {
                toast.error(res?.message);
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
                <TextField
                    id="name"
                    label="Name"
                    type="text"
                    register={register}
                    rules={{
                        required: 'Name là bắt buộc',
                    }}
                    error={errors.name}
                />

                <div className="mt-2 flex gap-4">
                    <div className="grid gap-3">
                        <TextField
                            id="type"
                            label="Type"
                            type="text"
                            register={register}
                            rules={{
                                required: 'Type là bắt buộc',
                            }}
                            error={errors.type}
                        />
                    </div>

                    <div className="grid gap-3">
                        <NumberField
                            id="price"
                            label="Price"
                            register={register}
                            error={errors.price}
                            rules={{
                                required: 'Price là bắt buộc',
                                valueAsNumber: true,
                                min: { value: 0, message: 'Price >= 0' },
                            }}
                        />
                    </div>

                    <div className="grid gap-3">
                        <NumberField
                            id="oldPrice"
                            label="OldPrice"
                            register={register}
                            error={errors.oldPrice}
                            rules={{
                                valueAsNumber: true,
                                min: { value: 0, message: 'OldPrice >= 0' },
                            }}
                        />
                    </div>
                </div>

                <div className="mt-2 flex gap-4">
                    <div className="grid gap-3">
                        <NumberField
                            id="selled"
                            label="Selled"
                            register={register}
                            error={errors.selled}
                            rules={{
                                valueAsNumber: true,
                                min: { value: 0, message: 'Selled >= 0' },
                            }}
                        />
                    </div>

                    <div className="grid gap-3">
                        <NumberField
                            id="countInStock"
                            label="CountInStock"
                            register={register}
                            error={errors.countInStock}
                            rules={{
                                required: 'CountInStock là bắt buộc',
                                valueAsNumber: true,
                                min: { value: 0, message: 'CountInStock >= 0' },
                            }}
                        />
                    </div>

                    <div className="grid gap-3">
                        <NumberField
                            id="rating"
                            label="Rating"
                            register={register}
                            error={errors.rating}
                            step={0.1}
                            rules={{
                                required: 'Rating là bắt buộc',
                                valueAsNumber: true,
                                min: { value: 0, message: 'Rating >= 0' },
                                max: { value: 5, message: 'Rating <= 5' },
                            }}
                        />
                    </div>
                </div>

                <div className="mt-2 flex gap-4">
                    <div className="grid gap-3">
                        <SelectField
                            id="isSale"
                            label="On sale?"
                            options={[
                                { label: 'True', value: 'true' },
                                { label: 'False', value: 'false' },
                            ]}
                            watch={watch}
                            setValue={setValue}
                            placeholder="Chọn trạng thái"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="image">Image</Label>
                        <Input id="image" type="file" accept="image/*" {...register('image')} />
                    </div>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="type">Description</Label>
                    <Textarea id="description" placeholder="Nhập mô tả sản phẩm..." {...register('description')} />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                </div>
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
