import React from 'react';
import { Card as CardUi, CardContent } from '@/components/ui/card';
import config from '@/config';
import { Star, Flame } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { ProductFormData } from '@/types/product';

type CardProps = {
    product: ProductFormData;
};

const Card = React.memo(function Card({ product }: CardProps) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(config.routes.details.replace(':id', product?._id || ''));
    };
    return (
        <CardUi className="mb-2.5 w-full cursor-pointer overflow-hidden p-0" onClick={handleCardClick}>
            <CardContent className="relative px-[5px] pb-2.5">
                <img
                    src={product?.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/5] w-full object-contain transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                />
                <h3 className="mt-1 line-clamp-2 text-sm font-medium hover:underline">{product?.name}</h3>

                <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                    <span className="flex items-center gap-1">
                        <Star className="text-yellow-300" size={12} />
                        <span className="">{product?.rating}</span>
                    </span>
                    <span>| đã bán {product?.selled}</span>
                </div>

                <div className="mt-1 flex flex-col gap-1">
                    <span className="text-muted-foreground text-xs">còn lại: {product?.countInStock} sản phẩm</span>
                    <span className="text-[16px] font-semibold text-red-500">
                        {product.price.toLocaleString('vi-VN')}₫
                    </span>
                    <div>
                        <span className="text-muted-foreground text-xs line-through">
                            {product?.oldPrice?.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="ml-1 text-xs text-red-500">
                            {' '}
                            {product.oldPrice && (
                                <span className="ml-2 text-xs text-red-500">
                                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                </span>
                            )}
                        </span>
                    </div>
                </div>

                <div className="absolute top-1 left-1 flex animate-pulse items-center gap-1 rounded-full bg-red-500/90 px-2 py-[2px] text-[10px] font-semibold text-white uppercase shadow-md">
                    <Flame size={12} className="text-yellow-300" />
                    Top Deal
                </div>
            </CardContent>
        </CardUi>
    );
});

export default Card;
