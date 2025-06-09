import { Card as CardUi, CardContent } from '@/components/ui/card';
import config from '@/config';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Product } from '@/pages/Home/HomePage';

type CardProps = {
    product: Product;
};

function Card({ product }: CardProps) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(config.routes.details);
    };
    return (
        <CardUi className="mb-2.5 w-full cursor-pointer overflow-hidden p-0" onClick={handleCardClick}>
            <CardContent className="relative px-[5px] pb-2.5">
                <img
                    src={product?.image}
                    alt=""
                    className="aspect-auto w-full object-cover transition-all duration-300 hover:-translate-y-0.5"
                />
                <h3 className="mt-1 line-clamp-2 text-xs hover:underline">{product?.name}</h3>
                <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                    <span className="flex items-center gap-1">
                        <Star className="text-yellow-300" size={12} />
                        <span className="">{product?.rating}</span>
                    </span>
                    <span>| đã bán 18.3k</span>
                </div>

                <div className="mt-1 flex flex-col gap-1">
                    <span className="text-[16px] font-semibold text-red-500">{product?.price}</span>
                    <div>
                        <span className="text-muted-foreground text-xs line-through">{product?.price}</span>
                        <span className="ml-1 text-xs text-red-500"> -17%</span>
                    </div>
                </div>

                <div className="absolute top-0.5 left-0.5 rounded-tl-md rounded-br-md bg-red-200 px-1 py-0.5 text-[10px] text-red-500">
                    Top Deal
                </div>
            </CardContent>
        </CardUi>
    );
}

export default Card;
