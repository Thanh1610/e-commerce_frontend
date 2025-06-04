import Banner from '@/components/Banner/Banner';
import slider1 from '@/assets/images/slider1.png';
import slider2 from '@/assets/images/slider2.webp';
import slider3 from '@/assets/images/slider3.webp';
import Sections from '@/components/Sections/Sections';
function HomePage() {
    return (
        <div className="container mx-auto my-0">
            <Banner bannerImg={[slider1, slider2, slider3]} />
            <Sections heading="Gợi ý cho bạn" />
        </div>
    );
}

export default HomePage;
