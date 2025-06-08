import { CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { registerApi } from '@/utils/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import config from '@/config';
type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
};

function RegisterForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const password = watch('password');

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        try {
            const { email, password, confirmPassword, name, phone } = data;

            const res = await registerApi({ email, password, confirmPassword, name, phone });
            if (res.EC === 0) {
                toast.success('Đăng kí thành công!');
                navigate(config.routes.login);
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <div className="grid gap-1">
                    <div className="flex items-center">
                        <Label htmlFor="name">Tên</Label>
                    </div>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Nhập mật khẩu"
                        {...register('name', {
                            required: 'Tên là bắt buộc',
                            minLength: {
                                value: 1,
                                message: 'Tối thiểu 1 ký tự',
                            },
                        })}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register('email', {
                            required: 'Email là bắt buộc',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Email không hợp lệ',
                            },
                        })}
                    />

                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="grid gap-1">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                        id="phone"
                        type="text"
                        placeholder="Nhập số điện thoại"
                        {...register('phone', {
                            required: 'Số điện thoại là bắt buộc',
                            minLength: {
                                value: 10,
                                message: 'Tối thiểu 10 ký tự',
                            },
                        })}
                    />

                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div className="grid gap-1">
                    <div className="flex items-center">
                        <Label htmlFor="password">Mật khẩu</Label>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...register('password', {
                            required: 'Mật khẩu là bắt buộc',
                            minLength: {
                                value: 1,
                                message: 'Tối thiểu 1 ký tự',
                            },
                        })}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <div className="grid gap-1">
                    <div className="flex items-center">
                        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                    </div>
                    <Input
                        id="confirmPassword"
                        type="password"
                        {...register('confirmPassword', {
                            required: 'Xác nhận mật khẩu là bắt buộc',
                            validate: (value) => value === password || 'Mật khẩu xác nhận không khớp',
                        })}
                        placeholder="Xác nhận mật khẩu"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                </div>
            </div>
            <CardFooter className="mt-3 flex-col">
                {!loading ? (
                    <Button type="submit" className="w-full">
                        Đăng ký
                    </Button>
                ) : (
                    <Button size="sm" disabled>
                        <Loader className="animate-spin" />
                        Please wait
                    </Button>
                )}
            </CardFooter>
        </form>
    );
}

export default RegisterForm;
