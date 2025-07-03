import { Smartphone, Laptop, Headphones, Watch, Clock, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllType } from '@/services/productApi';
import { useNavigate } from 'react-router';
import config from '@/config';
import { useQuery } from '@tanstack/react-query';

type Keyword = {
    value: string;
    label: string;
    icon: React.ReactNode;
};
const keywords: Keyword[] = [
    { value: 'Mobile', label: 'Điện thoại', icon: <Smartphone /> },
    { value: 'Laptop', label: 'Laptop', icon: <Laptop /> },
    { value: 'Accessory', label: 'Phụ kiện', icon: <Headphones /> },
    { value: 'SmartWatch', label: 'Smartwatch', icon: <Watch /> },
    { value: 'Clock', label: 'Đồng hồ', icon: <Clock /> },
    { value: 'Tablet', label: 'Tablet', icon: <Tablet /> },
];

function ProductCategory() {
    const navigate = useNavigate();

    const query = useQuery({
        queryKey: ['types'],
        queryFn: () => getAllType(),
    });

    const types: string[] = query.data?.data ?? [];

    const matchedKeywords = keywords.filter((k) => types.includes(k.value));
    return (
        <>
            {matchedKeywords.map((item) => (
                <Button
                    onClick={() => navigate(config.routes.type.replace(':type', item?.value))}
                    key={item.value}
                    variant="link"
                    className="flex items-center justify-center"
                >
                    {item.icon}
                    {item.label}
                </Button>
            ))}
        </>
    );
}

export default ProductCategory;
