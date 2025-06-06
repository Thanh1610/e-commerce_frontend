import Card from '@/components/Card/Card';

type Props = {
    colSpan: string;
};

function CardList({ colSpan }: Props) {
    return (
        <div className="mt-5 grid grid-cols-6 gap-2.5 px-5">
            <div className={`col-span-${colSpan}`}>
                <Card />
            </div>

            <div className={`col-span-${colSpan}`}>
                <Card />
            </div>

            <div className={`col-span-${colSpan}`}>
                <Card />
            </div>

            <div className={`col-span-${colSpan}`}>
                <Card />
            </div>

            <div className={`col-span-${colSpan}`}>
                <Card />
            </div>

            <div className={`col-span-${colSpan}`}>
                <Card />
            </div>

            <div className={`col-span-${colSpan}`}>
                <Card />
            </div>

            <div className={`col-span-${colSpan}`}>
                <Card />
            </div>

            <div className={`col-span-${colSpan}`}>
                <Card />
            </div>
        </div>
    );
}

export default CardList;
