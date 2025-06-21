import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import type { RegisterFormData } from '@/components/FormFields/RegisterField';

import { useUserContext } from '@/contexts/UserContext';
import { getBase64 } from '@/utils/helpers/getBase64';
import TextField from '@/components/FormFields/TextField';
import RegisterField from '@/components/FormFields/RegisterField';
import { useRegisterUser } from '@/hooks/useRegisterUser';

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
                        id="adress"
                        label="Địa chỉ"
                        type="text"
                        register={register}
                        rules={{
                            minLength: {
                                value: 1,
                                message: 'Tối thiểu 1 ký tự',
                            },
                        }}
                        error={errors.adress}
                    />
                </div>

                <div className="grid gap-2">
                    <Label className="block w-30 content-center text-left" htmlFor="avatar">
                        Avatar:
                    </Label>
                    <Input id="avatar" type="file" accept="image/*" {...register('avatar')} />
                </div>
                <SheetFooter>
                    {loading ? (
                        <Button size="sm" disabled>
                            <Loader className="animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit">Save changes</Button>
                    )}
                </SheetFooter>
            </form>
        </SheetContent>
    );
}

export default AdminUserform;
