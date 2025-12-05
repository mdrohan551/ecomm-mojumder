import { useRef } from 'react';
import BannerSlider from '../components/Banner/BannerSlider';
import Categories from '../components/Banner/Categoreis/Categories';
import FlashSale from '../components/FlashSale/FlashSale';

const HomePage = () => {
    const flashSaleRef = useRef(null);

    // BannerSlider-কে prop দিয়ে scroll function পাঠানো
    return (
        <>
            <BannerSlider scrollToFlash={() => {
                flashSaleRef.current?.scrollIntoView({ behavior: 'smooth' });
            }} />

            <div className='mt-10'>
                <Categories />
            </div>

            <div className='mt-10' ref={flashSaleRef}>
                <FlashSale />
            </div>
        </>
    );
};

export default HomePage;
