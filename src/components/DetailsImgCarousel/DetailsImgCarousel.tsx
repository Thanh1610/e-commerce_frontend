import { Carousel, CarouselContent } from '@/components/ui/carousel';

type Props = {
    img: string | undefined;
};
export function DetailsImgCarousel({ img }: Props) {
    return (
        <Carousel className="relative w-full max-w-full p-[15px]">
            <CarouselContent>
                <div className="flex h-96 min-w-full justify-center">
                    <img loading="lazy" src={img} className="max-h-[400px] object-contain" />
                </div>
            </CarouselContent>
            {/* <CarouselPrevious className="absolute top-1/2 left-4 z-10 -translate-y-1/2" />
            <CarouselNext className="absolute top-1/2 right-4 z-10 -translate-y-1/2" /> */}
        </Carousel>
    );
}

export default DetailsImgCarousel;
