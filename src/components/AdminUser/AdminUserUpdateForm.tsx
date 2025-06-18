import { useForm } from 'react-hook-form';
import UserUpdateField from '../FormFields/UserUpdateField';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { updateUser } from '@/services/userApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { getBase64 } from '@/utils/helpers/getBase64';
import type { User } from '@/types/user';
import { useUserContext } from '@/contexts/UserContext';

export type InfoUserData = {
    email: string;
    name: string;
    phone: string;
    adress: string;
    avatar?: FileList;
    access_token: string;
};

type UserInfoTableProps = {
    users: User;
};

function AdminUserUpdateForm({ users }: UserInfoTableProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const { refreshUsers } = useUserContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InfoUserData>();

    const onSubmit = async (data: InfoUserData) => {
        setLoading(true);
        try {
            let base64Avatar = undefined;

            if (data.avatar && data.avatar.length > 0) {
                base64Avatar = await getBase64(data.avatar[0]);
            }

            const payload = {
                id: users?._id,
                ...data,
                avatar: base64Avatar,
            };

            const res = await updateUser(payload);

            if (res?.status === 'SUCCESS') {
                await refreshUsers();
                toast.success(res?.message || 'Cập nhật thành công!');
            } else {
                toast.error(res?.message || 'Cập nhật thất bại!');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (users) {
            reset({
                name: users.name || '',
                email: users.email || '',
                phone: users.phone || '',
                adress: users.adress || '',
            });
        }
    }, [users, reset]);

    return (
        <div className="mx-auto mt-5 w-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-2">
                <UserUpdateField register={register} errors={errors} />
                <div className="mt-5 flex items-center justify-center">
                    {loading ? (
                        <Button size="default" disabled>
                            <RotateCw className="animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button className="cursor-pointer" type="submit">
                            Cập nhật
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default AdminUserUpdateForm;
