import { getProductType } from '@/services/productApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { ProductFormData } from '@/types/product';

import TypeSections from '@/components/TypeSection/TypeSection';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function TypePage() {
    const [products, setProducts] = useState<ProductFormData[]>([]);
    const [sort, setSort] = useState('createdAt');
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [limit, setLimit] = useState(0);
    const { type } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (type) {
                    const payload = {
                        type,
                        sort,
                        order,
                        limit: limit,
                    };
                    const res = await getProductType(payload);
                    setProducts(res?.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, [type, sort, order, limit]);

    const handleSortChange = (value: string) => {
        const [sortValue, orderValue] = value.split(':');
        setSort(sortValue);
        setOrder(orderValue as 'asc' | 'desc');
    };
    return (
        <div className="container mx-auto my-0 max-w-screen-lg">
            <div className="mt-5 flex items-center gap-4">
                <div>Sắp xếp theo: </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => {
                            setSort('createdAt');
                            setOrder('desc');
                        }}
                        variant="outline"
                    >
                        Mới nhất
                    </Button>

                    <Button
                        onClick={() => {
                            setSort('selled');
                            setOrder('desc');
                        }}
                        variant="outline"
                    >
                        Bán chạy
                    </Button>

                    <Select onValueChange={handleSortChange}>
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
            <TypeSections heading={type} products={products} setLimit={setLimit} />
        </div>
    );
}

export default TypePage;
