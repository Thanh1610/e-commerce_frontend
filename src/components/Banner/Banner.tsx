import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import type { CSSProperties } from 'react';

type BannerProps = {
    bannerImg: string[];
};

type Props = {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
};

function SampleNextArrow(props: Props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} absolute top-1/2 right-[10px] z-10 flex -translate-y-1/2 items-center justify-center`}
            style={{ ...style, right: '10px', top: '50%', transform: 'translateY(-50%)', position: 'absolute' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: Props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} z-10 flex items-center justify-center`}
            style={{ ...style, left: '10px', top: '50%', transform: 'translateY(-50%)', position: 'absolute' }}
            onClick={onClick}
        />
    );
}
function Banner({ bannerImg }: BannerProps) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className="relative mt-5 overflow-hidden rounded-2xl">
            <Slider {...settings}>
                {bannerImg.map((img) => (
                    <img key={img} src={img} alt="banner" className="h-60 w-full object-cover" />
                ))}
            </Slider>
        </div>
    );
}

export default Banner;
