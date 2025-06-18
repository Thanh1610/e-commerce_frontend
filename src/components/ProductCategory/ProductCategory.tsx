import { Smartphone, Laptop, Headphones, Watch, Clock, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getAllType } from '@/services/productApi';
import { useNavigate } from 'react-router';
import config from '@/config';

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
    const [types, setTypes] = useState<string[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getAllType();
                setTypes(res?.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, []);

    const matchedKeywords = keywords.filter((k) => types.includes(k.value));
    return (
        <div className="container mx-auto my-0 flex w-full max-w-screen-lg items-center justify-center">
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
        </div>
    );
}

export default ProductCategory;
