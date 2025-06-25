import { useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import { useForm } from 'react-hook-form';

import type { RootState } from '@/redux/store';
import type { UserState } from '@/redux/slices/userSlice';
import { setUser } from '@/redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

import { getBase64 } from '@/utils/helpers/getBase64';
import UserUpdateField from '@/components/FormFields/UserUpdateField';
import { useUpdateUser } from '@/hooks/useUpdateUser';

export type InfoUserData = {
    email: string;
    name: string;
    phone: string;
    address: string;
    avatar?: FileList;
    access_token: string;
};

function UserInfoTable() {
    const user: UserState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
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
            id: user?._id,
            ...data,
            avatar: base64Avatar,
        };

        updateMutation.mutate(payload);
    };

    const updateMutation = useUpdateUser(async (resData) => {
        const updatedUser = {
            ...user,
            ...resData,
        };

        dispatch(setUser(updatedUser));
    });

    const loading = updateMutation.isPending;

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
            });
        }
    }, [user, reset]);

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

export default UserInfoTable;
