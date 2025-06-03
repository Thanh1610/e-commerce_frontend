import { CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

type LoginFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormData>();

    const password = watch('password');

    const onSubmit = (data: LoginFormData) => {
        console.log('Submitted:', data);
        // TODO: handle login logic here
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
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
                <div className="grid gap-2">
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

                <div className="grid gap-2">
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
                <Button type="submit" className="w-full">
                    Đăng ký
                </Button>
            </CardFooter>
        </form>
    );
}

export default RegisterForm;
