import { getProductType } from '@/services/productApi';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router';

import TypeSections from '@/components/TypeSection/TypeSection';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';

function TypePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { type } = useParams();

    // Khởi tạo state từ URL params hoặc giá trị mặc định
    const [sort, setSort] = useState(() => searchParams.get('sort') || 'createdAt');
    const [order, setOrder] = useState<'asc' | 'desc'>(() => (searchParams.get('order') as 'asc' | 'desc') || 'desc');
    const [limit, setLimit] = useState(() => parseInt(searchParams.get('limit') || '0'));

    // Cập nhật URL khi state thay đổi
    const updateURLParams = (newSort: string, newOrder: 'asc' | 'desc', newLimit: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', newSort);
        params.set('order', newOrder);
        params.set('limit', newLimit.toString());
        setSearchParams(params);
    };

    // Wrapper functions để cập nhật cả state và URL
    const handleSortChange = (newSort: string, newOrder: 'asc' | 'desc') => {
        setSort(newSort);
        setOrder(newOrder);
        updateURLParams(newSort, newOrder, limit);
    };

    const handleLimitChange: React.Dispatch<React.SetStateAction<number>> = (newLimit) => {
        const limitValue = typeof newLimit === 'function' ? newLimit(limit) : newLimit;
        setLimit(limitValue);
        updateURLParams(sort, order, limitValue);
    };

    const { data: products = [] } = useQuery({
        queryKey: ['products', type, sort, order, limit],
        queryFn: async () => {
            if (!type) return [];
            const payload = { type, sort, order, limit };
            const res = await getProductType(payload);
            return res?.data || [];
        },
        enabled: !!type,
    });

    const handlePriceSortChange = (value: string) => {
        const [sortValue, orderValue] = value.split(':');
        handleSortChange(sortValue, orderValue as 'asc' | 'desc');
    };

    return (
        <div className="container mx-auto my-0 max-w-screen-lg">
            <div className="mt-5 flex items-center gap-4">
                <div>Sắp xếp theo: </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => handleSortChange('createdAt', 'desc')}
                        variant={sort === 'createdAt' && order === 'desc' ? 'default' : 'outline'}
                    >
                        Mới nhất
                    </Button>

                    <Button
                        onClick={() => handleSortChange('selled', 'desc')}
                        variant={sort === 'selled' && order === 'desc' ? 'default' : 'outline'}
                    >
                        Bán chạy
                    </Button>

                    <Select onValueChange={handlePriceSortChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Giá" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="price:desc">Cao đến thấp</SelectItem>
                                <SelectItem value="price:asc">Thấp đến cao</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <TypeSections heading={type} products={products} setLimit={handleLimitChange} />
        </div>
    );
}

export default TypePage;
