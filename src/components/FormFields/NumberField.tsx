import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UseFormRegister, FieldError, RegisterOptions } from 'react-hook-form';

interface NumberFieldProps {
    id: string;
    label: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    rules?: RegisterOptions;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    classname?: string;
}
function NumberField({
    id,
    label,
    register,
    error,
    rules,
    min,
    max,
    step = 1,
    disabled = false,
    classname = '',
}: NumberFieldProps) {
    return (
        <>
            <Label className={classname} htmlFor={id}>
                {label}
            </Label>
            <Input id={id} type="number" min={min} max={max} step={step} disabled={disabled} {...register(id, rules)} />
            <p className="max-h-1 text-sm text-red-500">{error?.message || '\u00A0'}</p>
        </>
    );
}

export default NumberField;
