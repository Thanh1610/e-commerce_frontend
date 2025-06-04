import Banner from '@/components/Banner/Banner';
import slider1 from '@/assets/images/slider1.png';
import slider2 from '@/assets/images/slider2.webp';
import slider3 from '@/assets/images/slider3.webp';
import Sections from '@/components/Sections/Sections';
import axios from '@/utils/axios.customzie';
import { useEffect } from 'react';
function HomePage() {
    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/products`, {
                params: {
                    page: 1,
                    limit: 6,
                },
            });
            console.log('res: ', res.data.data);
        };

        fetchApi();
    }, []);
    return (
        <div className="container mx-auto my-0 max-w-screen-lg">
            <Banner bannerImg={[slider1, slider2, slider3]} />
            <Sections heading="Gợi ý cho bạn" />
        </div>
    );
}

export default HomePage;
