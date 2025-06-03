import { CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';

type LoginFormData = {
    email: string;
    password: string;
};

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
        console.log('Submitted:', data);
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
                        <Link to="/" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                            Quên mật khẩu ?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        {...register('password', {
                            required: 'Mật khẩu là bắt buộc',
                            minLength: {
                                value: 1,
                                message: 'Tối thiểu 6 ký tự',
                            },
                        })}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>
            </div>
            <CardFooter className="mt-3 flex-col">
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </CardFooter>
        </form>
    );
}

export default LoginForm;
