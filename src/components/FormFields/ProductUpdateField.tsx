import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { AddProductFormData } from '@/components/AdminProduct/AdminProductUpdateForm';

import TextField from '@/components/FormFields/TextField';
import NumberField from '@/components/FormFields/NumberField';
import SelectField from '@/components/FormFields/SelectField';

type UserInputFieldsProps = {
    register: UseFormRegister<AddProductFormData>;
    errors: FieldErrors<AddProductFormData>;
    watch: UseFormWatch<any>;
    setValue: UseFormSetValue<any>;
};
function ProductUpdateField({ register, errors, setValue, watch }: UserInputFieldsProps) {
    return (
        <>
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
        </>
    );
}

export default ProductUpdateField;
