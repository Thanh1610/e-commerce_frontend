import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { FieldError, UseFormSetValue, UseFormWatch } from 'react-hook-form';

type SelectOption = {
    label: string;
    value: string;
};
type SelectFieldProps = {
    id: string;
    label: string;
    options: SelectOption[];
    watch: UseFormWatch<any>;
    setValue: UseFormSetValue<any>;
    error?: FieldError;
    placeholder?: string;
    disabled?: boolean;
};
function SelectField({ id, label, options, watch, setValue, placeholder = '' }: SelectFieldProps) {
    return (
        <>
            <Label htmlFor={id}>{label}</Label>

            <Select
                onValueChange={(value) => setValue('isSale', value === 'true')}
                defaultValue={watch('isSale') ? 'true' : 'false'}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
}

export default SelectField;
