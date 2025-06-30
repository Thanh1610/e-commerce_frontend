import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import type { ReactNode } from 'react';
import clsx from 'clsx';

type LoadingButtonProps = {
    loading: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    size?: 'default' | 'sm' | 'lg' | 'icon';
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    idleText: ReactNode;
    loadingText: ReactNode;
    type?: 'button' | 'submit' | 'reset';
};

export default function LoadingButton({
    loading,
    onClick,
    disabled,
    className,
    size,
    variant,
    idleText,
    loadingText,
    type,
}: LoadingButtonProps) {
    if (loading) {
        return (
            <Button disabled className={className} size={size} variant={variant}>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                {loadingText}
            </Button>
        );
    }

    return (
        <Button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx('cursor-pointer', className)}
            size={size}
            variant={variant}
        >
            {idleText}
        </Button>
    );
}
