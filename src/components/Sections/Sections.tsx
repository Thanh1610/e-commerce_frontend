import CardList from '@/components/CardList/CardList';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

type Props = {
    heading: string;
};

function Sections({ heading }: Props) {
    return (
        <div className="mt-5 rounded-2xl bg-white">
            <h3 className="px-5 pt-5 text-2xl font-bold">{heading}</h3>
            <CardList colSpan="2" />

            <div className="mt-[5px] mb-[15px] flex items-center justify-center">
                <Button variant="ghost" className="flex items-center justify-center">
                    <span>Xem thêm</span>
                    <ChevronDown />
                </Button>
            </div>
        </div>
    );
}

export default Sections;
