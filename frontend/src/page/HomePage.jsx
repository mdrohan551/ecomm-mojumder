
import BannerSlider from '../components/Banner/BannerSlider'
import Categories from '../components/Banner/Categoreis/Categories'
import FlashSale from '../components/FlashSale/FlashSale'

const HomePage = () => {
    return (
        <>

            <BannerSlider />
            <div className='mt-10'>
                <Categories />
            </div>

            <div className='mt-10'>
                <FlashSale />
            </div>
        </>
    )
}

export default HomePage