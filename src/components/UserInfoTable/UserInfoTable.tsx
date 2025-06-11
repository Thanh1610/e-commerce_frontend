import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { updateUser } from '@/services/userApi';
import { setUser } from '@/redux/slices/userSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { getBase64 } from '@/utils/helpers/getBase64';
import type { UserState } from '@/redux/slices/userSlice';

type InfoUserData = {
    email: string;
    name: string;
    phone: string;
    adress: string;
    avatar?: FileList;
};

function UserInfoTable() {
    const [loading, setLoading] = useState<boolean>(false);
    const user: UserState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
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
                id: user?._id,
                ...data,
                avatar: base64Avatar,
            };

            const res = await updateUser(payload);

            if (res?.status === 'OK') {
                const updatedUser = {
                    ...user,
                    ...data,
                    avatar: res.data.avatar,
                };

                dispatch(setUser(updatedUser));
                toast.success('Cập nhật thành công!');
            } else {
                toast.error('Cập nhật thất bại!');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                adress: user.adress || '',
            });
        }
    }, [user, reset]);

    return (
        <div className="mx-auto mt-5 w-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-2">
                <div className="r flex gap-2">
                    <Label className="block w-30 content-center text-left" htmlFor="email">
                        Email:{' '}
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        {...register('email', {
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Email không hợp lệ',
                            },
                        })}
                    />
                </div>

                <div className="flex gap-2">
                    <Label className="block w-30 content-center text-left" htmlFor="name">
                        Tên:{' '}
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        {...register('name', {
                            minLength: {
                                value: 1,
                                message: 'Tối thiểu 1 ký tự',
                            },
                        })}
                    />
                </div>
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

                <div className="flex gap-2">
                    <Label className="block w-30 content-center text-left" htmlFor="phone">
                        Số điện thoại:{' '}
                    </Label>
                    <Input
                        id="phone"
                        type="text"
                        {...register('phone', {
                            minLength: {
                                value: 10,
                                message: 'Tối thiểu 10 ký tự',
                            },
                        })}
                    />
                </div>
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}

                <div className="flex gap-2">
                    <Label className="block w-30 content-center text-left" htmlFor="adress">
                        Địa chỉ:{' '}
                    </Label>
                    <Input
                        id="adress"
                        type="text"
                        {...register('adress', {
                            minLength: {
                                value: 1,
                                message: 'Tối thiểu 1 ký tự',
                            },
                        })}
                    />
                </div>
                {errors.adress && <p className="text-sm text-red-500">{errors.adress.message}</p>}

                <div className="flex gap-2">
                    <Label className='"block w-30 content-center text-left' htmlFor="avatar">
                        Avatar:
                    </Label>
                    <Input id="avatar" type="file" accept="image/*" {...register('avatar')} />
                </div>

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
