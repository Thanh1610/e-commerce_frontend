import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import TextField from '../FormFields/TextField';
import { useForm } from 'react-hook-form';
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { registerApi } from '@/services/userApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { getBase64 } from '@/utils/helpers/getBase64';

type AddUser = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    password: string;
    confirmPassword: string;
    adress?: string;
    avatar?: FileList;
};
function AdminUserform() {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<AddUser>();

    const password = watch('password');

    const onSubmit = async (data: AddUser) => {
        setLoading(true);
        try {
            let base64Avatar = undefined;

            if (data.avatar && data.avatar.length > 0) {
                base64Avatar = await getBase64(data.avatar[0]);
            }

            const payload = {
                ...data,
                avatar: base64Avatar,
            };
            const res = await registerApi(payload);
            if (res.EC === 0) {
                toast.success('Đăng kí thành công!');
                reset();
            } else {
                toast.error('Email đã tồn tại!');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Thêm người dùng</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid flex-1 auto-rows-min gap-3 px-4">
                <div className="grid gap-2">
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
                </div>
                <div className="grid gap-2">
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        rules={{
                            required: 'Email là bắt buộc',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Email không hợp lệ',
                            },
                        }}
                        error={errors.email}
                    />
                </div>

                <div className="grid gap-2">
                    <TextField
                        id="password"
                        label="Mật khẩu"
                        type="password"
                        register={register}
                        rules={{
                            required: 'Mật khẩu là bắt buộc',
                            minLength: {
                                value: 1,
                                message: 'Tối thiểu 1 ký tự',
                            },
                        }}
                        error={errors.password}
                    />
                </div>

                <div className="grid gap-2">
                    <TextField
                        id="confirmPassword"
                        label="Xác nhận mật khẩu"
                        type="password"
                        register={register}
                        rules={{
                            required: 'Mật khẩu là bắt buộc',
                            minLength: {
                                value: 1,
                                message: 'Tối thiểu 1 ký tự',
                            },
                            validate: (value) => value === password || 'Mật khẩu xác nhận không khớp',
                        }}
                        error={errors.confirmPassword}
                    />
                </div>

                <div className="grid gap-2">
                    <TextField
                        id="phone"
                        label="Số điện thoại"
                        type="text"
                        register={register}
                        rules={{
                            required: 'Số điện thoại là bắt buộc',
                            minLength: {
                                value: 10,
                                message: 'Số điện thoại phải có ít nhất 10 số',
                            },
                            maxLength: {
                                value: 13,
                                message: 'Số điện thoại không được vượt quá 13 số',
                            },
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Số điện thoại chỉ được chứa chữ số',
                            },
                        }}
                        error={errors.phone}
                    />
                </div>

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
                    <Label className='"block w-30 content-center text-left' htmlFor="avatar">
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
                        <Button type="submit" className="w-full">
                            Đăng ký
                        </Button>
                    )}
                    <Button type="submit">Save changes</Button>
                </SheetFooter>
            </form>
        </SheetContent>
    );
}

export default AdminUserform;
