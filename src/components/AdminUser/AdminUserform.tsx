import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import type { RegisterFormData } from '@/components/FormFields/RegisterField';

import { useUserContext } from '@/contexts/UserContext';
import { getBase64 } from '@/utils/helpers/getBase64';
import TextField from '@/components/FormFields/TextField';
import RegisterField from '@/components/FormFields/RegisterField';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import LoadingButton from '@/components/LoadingButton/LoadingButton';

function AdminUserform() {
    const { refreshUsers } = useUserContext();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        let base64Avatar = undefined;

        if (data.avatar && data.avatar.length > 0) {
            base64Avatar = await getBase64(data.avatar[0]);
        }

        const payload = {
            ...data,
            avatar: base64Avatar,
        };
        registerMutation.mutate(payload);
    };

    const registerMutation = useRegisterUser(async () => {
        await refreshUsers();
        reset();
    });

    const loading = registerMutation.isPending;

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Thêm người dùng</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid flex-1 auto-rows-min gap-3 px-4">
                <RegisterField register={register} errors={errors} watch={watch} />

                <div className="grid gap-2">
                    <TextField
                        id="address"
                        label="Địa chỉ"
                        type="text"
                        register={register}
                        rules={{
                            minLength: {
                                value: 1,
                                message: 'Tối thiểu 1 ký tự',
                            },
                        }}
                        error={errors.address}
                    />
                </div>

                <div className="grid gap-2">
                    <Label className="block w-30 content-center text-left" htmlFor="avatar">
                        Avatar:
                    </Label>
                    <Input id="avatar" type="file" accept="image/*" {...register('avatar')} />
                </div>
                <SheetFooter>
                    <LoadingButton
                        loading={loading}
                        size="sm"
                        type="submit"
                        idleText="Cập nhật"
                        loadingText="Đang xử lý..."
                    />
                </SheetFooter>
            </form>
        </SheetContent>
    );
}

export default AdminUserform;
