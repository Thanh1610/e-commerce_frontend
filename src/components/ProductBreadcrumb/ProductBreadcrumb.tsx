import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import config from '@/config';
import { Link } from 'react-router';
import type { ProductFormData } from '@/types/product';

type ProductBreadcrumbProps = {
    product: ProductFormData | null;
};
export default function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
    return (
        <div className="my-[15px] block">
            <Breadcrumb className="flex h-full items-center justify-start gap-1 text-[14px]">
                <BreadcrumbItem>
                    <Link to={config.routes.home} className="text-muted-foreground hover:underline">
                        {product?.type}
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="list-none" />
                <BreadcrumbItem>
                    <Link to={config.routes.home} className="font-medium hover:underline">
                        {product?.name}
                    </Link>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
    );
}
