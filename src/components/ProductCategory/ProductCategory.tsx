import { Smartphone, Laptop, Headphones, Watch, Clock, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Keyword = {
    label: string;
    icon: React.ReactNode;
};
const keywords: Keyword[] = [
    { label: 'Điện thoại', icon: <Smartphone /> },
    { label: 'Laptop', icon: <Laptop /> },
    { label: 'Phụ kiện', icon: <Headphones /> },
    { label: 'Smartwatch', icon: <Watch /> },
    { label: 'Đồng hồ', icon: <Clock /> },
    { label: 'Tablet', icon: <Tablet /> },
];
function ProductCategory() {
    return (
        <div className="container mx-auto my-0 flex w-full items-center justify-center">
            {keywords.map((key) => (
                <Button key={key.label} variant="link" className="flex items-center justify-center">
                    {key.icon}
                    {key.label}
                </Button>
            ))}
        </div>
    );
}

export default ProductCategory;
