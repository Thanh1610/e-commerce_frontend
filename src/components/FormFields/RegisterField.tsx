import type { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import TextField from '@/components/FormFields/TextField';

export type RegisterFormData = {
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

type RegisterFieldProps = {
    register: UseFormRegister<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    watch: UseFormWatch<any>;
};
function RegisterField({ register, errors, watch }: RegisterFieldProps) {
    const password = watch('password');

    return (
        <>
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
        </>
    );
}

export default RegisterField;
