import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const images = [
    'https://cdn.tgdd.vn/Products/Images/44/329858/Slider/vi-vn-asus-x1504za-i5-nj1608w-slider-1.jpg',
    'https://cdn.tgdd.vn/Products/Images/44/329858/Slider/vi-vn-asus-x1504za-i5-nj1608w-slider-2.jpg',
    'https://cdn.tgdd.vn/Products/Images/44/329858/Slider/vi-vn-asus-x1504za-i5-nj1608w-slider-3.jpg',
    'https://cdn.tgdd.vn/Products/Images/44/329858/Slider/vi-vn-asus-x1504za-i5-nj1608w-slider-4.jpg',
    'https://cdn.tgdd.vn/Products/Images/44/329858/Slider/vi-vn-asus-x1504za-i5-nj1608w-slider-5.jpg',
    'https://cdn.tgdd.vn/Products/Images/44/329858/Slider/asus-x1504za-i5-nj1608w-6-fix-1020x569.jpg',
    'https://cdn.tgdd.vn/Products/Images/44/329858/Slider/vi-vn-asus-x1504za-i5-nj1608w-slider-7.jpg',
];

export function DetailsImgCarousel() {
    return (
        <Carousel className="relative w-full max-w-full p-[15px]">
            <CarouselContent>
                {images.map((src, index) => (
                    <div className="flex h-96 min-w-full justify-center" key={index}>
                        <img src={src} alt={`image-${index}`} className="max-h-[400px] object-contain" />
                    </div>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-4 z-10 -translate-y-1/2" />
            <CarouselNext className="absolute top-1/2 right-4 z-10 -translate-y-1/2" />
        </Carousel>
    );
}

export default DetailsImgCarousel;
