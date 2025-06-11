import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UseFormRegister, FieldError, RegisterOptions } from 'react-hook-form';

export type TextFieldProps = {
    id: string;
    label: string;
    type: string;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
    disabled?: boolean;
    placeholder?: string;
    error?: FieldError;
    classname?: string;
};
function TextField({
    id,
    label,
    type = 'text',
    register,
    rules,
    disabled = false,
    placeholder = '',
    error,
    classname = '',
}: TextFieldProps) {
    return (
        <>
            <Label className={classname} htmlFor={id}>
                {label}
            </Label>
            <Input id={id} type={type} disabled={disabled} placeholder={placeholder} {...register(id, rules)} />
            <p className="max-h-1 text-sm text-red-500">{error?.message || '\u00A0'}</p>
        </>
    );
}

export default TextField;
