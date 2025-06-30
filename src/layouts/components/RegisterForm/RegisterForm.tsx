import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import type { RegisterFormData } from '@/components/FormFields/RegisterField';

import { CardFooter } from '@/components/ui/card';
import RegisterField from '@/components/FormFields/RegisterField';
import config from '@/config';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import LoadingButton from '@/components/LoadingButton/LoadingButton';

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
                <LoadingButton
                    loading={loading}
                    className="w-full"
                    size="sm"
                    type="submit"
                    idleText="Đăng ký"
                    loadingText="Đang xử lý..."
                />
            </CardFooter>
        </form>
    );
}

export default RegisterForm;
