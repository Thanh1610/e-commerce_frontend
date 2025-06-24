import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import config from '@/config';
import { loginApi, getDetailUser } from '@/services/userApi';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';
import TextField from '@/components/FormFields/TextField';
import { useMutation } from '@tanstack/react-query';

type LoginFormData = {
    email: string;
    password: string;
};

type JwtPayload = {
    id: string;
};

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const handleGetDetailUser = async (id: string, token: string) => {
        const res = await getDetailUser({ id, token });
        const payload = {
            ...res?.data?.data,
            access_token: token,
        };
        dispatch(setUser(payload));
    };

    const loginMutation = useMutation({
        mutationFn: loginApi,
        onSuccess: (res) => {
            if (res.EC === 0) {
                toast.success('Đăng nhập thành công!');
                localStorage.setItem('access_token', res?.access_token);

                if (location.state) {
                    navigate(location.state);
                } else {
                    navigate(config.routes.home);
                }

                if (res?.access_token) {
                    const decoded = jwtDecode<JwtPayload>(res?.access_token);

                    if (decoded?.id) {
                        handleGetDetailUser(decoded?.id, res?.access_token);
                    }
                }
            } else {
                toast.error('Đăng nhập thất bại!');
            }
        },
        onError: (error: any) => {
            const message = error?.response?.data?.EM || 'Lỗi kết nối máy chủ!';
            toast.error(message);
        },
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    const loading = loginMutation.isPending;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="m@example.com"
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
                        placeholder="Nhập mật khẩu"
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
                    <div className="flex items-center">
                        <Link to="/" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                            Quên mật khẩu ?
                        </Link>
                    </div>
                </div>
            </div>
            <CardFooter className="mt-3 flex-col">
                {!loading ? (
                    <Button type="submit" className="w-full">
                        Đăng nhập
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

export default LoginForm;
