import { useForm } from 'react-hook-form';
import UserUpdateField from '../FormFields/UserUpdateField';

import { useEffect } from 'react';
import { getBase64 } from '@/utils/helpers/getBase64';
import type { User } from '@/types/user';
import { useUserContext } from '@/contexts/UserContext';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import LoadingButton from '@/components/LoadingButton/LoadingButton';

export type InfoUserData = {
    email: string;
    name: string;
    phone: string;
    address: string;
    avatar?: FileList;
    access_token: string;
};

type UserInfoTableProps = {
    users: User;
};

function AdminUserUpdateForm({ users }: UserInfoTableProps) {
    const { refreshUsers } = useUserContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InfoUserData>();

    const onSubmit = async (data: InfoUserData) => {
        let base64Avatar = undefined;

        if (data.avatar && data.avatar.length > 0) {
            base64Avatar = await getBase64(data.avatar[0]);
        }

        const payload = {
            id: users?._id,
            ...data,
            avatar: base64Avatar,
        };

        updateMutation.mutate(payload);
    };

    const updateMutation = useUpdateUser(async () => {
        await refreshUsers();
    });

    const loading = updateMutation.isPending;

    useEffect(() => {
        if (users) {
            reset({
                name: users.name || '',
                email: users.email || '',
                phone: users.phone || '',
                address: users.address || '',
            });
        }
    }, [users, reset]);

    return (
        <div className="mx-auto mt-5 w-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-2">
                <UserUpdateField register={register} errors={errors} />
                <div className="mt-5 flex items-center justify-center">
                    <LoadingButton
                        loading={loading}
                        size="default"
                        type="submit"
                        idleText="Cập nhật"
                        loadingText="Đang xử lý..."
                    />
                </div>
            </form>
        </div>
    );
}

export default AdminUserUpdateForm;
