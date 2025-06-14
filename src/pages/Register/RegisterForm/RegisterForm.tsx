import { useState } from 'react';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import type { RegisterFormData } from '@/components/FormFields/RegisterField';

import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { registerApi } from '@/services/userApi';
import RegisterField from '@/components/FormFields/RegisterField';
import config from '@/config';

function RegisterForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        try {
            const { email, password, confirmPassword, name, phone } = data;

            const res = await registerApi({ email, password, confirmPassword, name, phone });
            if (res.EC === 0) {
                toast.success(res?.EM || 'Đăng kí thành công!');
                navigate(config.routes.login);
            } else {
                toast.error(res?.EM || 'Đăng kí thất bại!');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid flex-1 gap-4">
                <RegisterField register={register} errors={errors} watch={watch} />
            </div>
            <CardFooter className="mt-6 flex-col">
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
