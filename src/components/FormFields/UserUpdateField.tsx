import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { InfoUserData } from '@/components/UserInfoTable/UserInfoTable';

import TextField from './TextField';

type UserInputFieldsProps = {
    register: UseFormRegister<InfoUserData>;
    errors: FieldErrors<InfoUserData>;
};
function UserUpdateField({ register, errors }: UserInputFieldsProps) {
    return (
        <>
            <div className="flex gap-2">
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    className="block w-30 content-center text-left"
                    register={register}
                    rules={{
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Email không hợp lệ',
                        },
                    }}
                    error={errors.email}
                />
            </div>

            <div className="flex gap-2">
                <TextField
                    id="name"
                    label="Name"
                    type="text"
                    register={register}
                    rules={{
                        minLength: {
                            value: 1,
                            message: 'Tối thiểu 1 ký tự',
                        },
                    }}
                    error={errors.name}
                    className="block w-30 content-center text-left"
                />
            </div>

            <div className="flex gap-2">
                <TextField
                    id="phone"
                    label="Số điện thoại"
                    type="text"
                    register={register}
                    rules={{
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
                    className="block w-30 content-center text-left"
                />
            </div>

            <div className="flex gap-2">
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
                    className="block w-30 content-center text-left"
                />
            </div>

            <div className="flex gap-2">
                <Label className='"block w-23 content-center text-left' htmlFor="avatar">
                    Avatar:
                </Label>
                <Input className="w-48" id="avatar" type="file" accept="image/*" {...register('avatar')} />
            </div>
        </>
    );
}

export default UserUpdateField;
