import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import type { RegisterFormData } from '@/components/FormFields/RegisterField';

import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RegisterField from '@/components/FormFields/RegisterField';
import config from '@/config';
import { useRegisterUser } from '@/hooks/useRegisterUser';

function RegisterForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        const { email, password, confirmPassword, name, phone } = data;

        const payload = {
            email,
            password,
            confirmPassword,
            name,
            phone,
        };
        registerMutation.mutate(payload);
    };

    const registerMutation = useRegisterUser(async () => {
        navigate(config.routes.login);
    });

    const loading = registerMutation.isPending;

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
