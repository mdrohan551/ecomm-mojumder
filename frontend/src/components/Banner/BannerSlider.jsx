import React, { useState, useEffect, useCallback } from 'react';
import FlashSaleAnimation from './FlashSaleAnimation';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import useStore from '../../store/api_call';

const BannerSlider = ({scrollToFlash }) => {
    const { sliders, fetchSliders } = useStore();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Slide change function
    const goToNext = useCallback(() => {
        if (!sliders || sliders.length === 0) return;
        setCurrentSlide((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
    }, [sliders]);

    // Fetch sliders on mount
    useEffect(() => {
        if (!sliders || sliders.length === 0) fetchSliders();
    }, [sliders, fetchSliders]);

    // Reset currentSlide if sliders change
    useEffect(() => {
        setCurrentSlide(0);
    }, [sliders]);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [goToNext]);

    if (!sliders || sliders.length === 0) {
        return <div className="text-center py-20 text-gray-500">স্লাইড লোড হচ্ছে...</div>;
    }

    const activeSlide = sliders[currentSlide];
    const isDiscountAvailable = activeSlide.discountPercentage > 0;

    return (
        <div className="bg-secondary mt-5 relative">
            <div className="w-full container mx-auto transition-colors duration-500 relative">
                <div key={activeSlide._id || activeSlide.id} className="transition-opacity duration-700 ease-in-out opacity-100">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                        {/* Text Section */}
                        <div className="p-4 sm:p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left col-span-1 md:col-span-6 order-2 md:order-1">
                            <div className="bg-white flex items-center justify-center mb-2">
                                <p className="text-sm font-semibold text-black mb-2 uppercase tracking-widest px-3 pt-2 md:px-5 md:pt-3">
                                    {activeSlide.tag}
                                </p>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-extrabold text-gray-50 mt-5 leading-tight md:leading-20">
                                {activeSlide.title} <br />
                                <span className="text-primary text-3xl sm:text-4xl lg:text-6xl ">
                                    {activeSlide.subtitle}
                                </span>
                            </h1>
                            <p className="text-sm sm:text-base text-gray-200 mb-6 mt-2 px-2 md:px-0">
                                {activeSlide.description}
                            </p>
                            <button
                                onClick={scrollToFlash} // ✅ এখানে scroll হবে
                                className="bg-primary hover:bg-white hover:text-black hover:ring-1 hover:ring-primary text-black font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 capitalize cursor-pointer"
                            >
                                Shop now
                            </button>
                        </div>

                        {/* Image Section */}
                        <div className="relative rounded-b-xl md:rounded-t-full bg-primary col-span-1 md:col-span-6 h-[400px] md:h-auto order-1 md:order-2">
                            <div className="w-full h-full flex justify-center items-center z-10">
                                <img
                                    src={activeSlide.image}
                                    alt={activeSlide.alt || activeSlide.title}
                                    className="w-auto h-full md:h-150 object-contain inset-0 drop-shadow-gray-900/40 drop-shadow-2xl "
                                />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent z-10" aria-hidden="true"></div>

                            {/* Discount Box */}
                            {isDiscountAvailable ? (
                                <div className="hidden md:block absolute right-0 w-40 bg-white rounded-2xl shadow-2xl -bottom-5 z-20">
                                    <img src="/images/discountimg.png" alt="dis img" className="w-40 h-auto" />
                                    <div className="absolute right-0 top-2">
                                        <FlashSaleAnimation discountPercentage={activeSlide.discountPercentage} />
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden md:block absolute -right-5 w-40 px-8 bg-white rounded-2xl shadow-xl -bottom-5 z-20 flex items-center justify-center p-4">
                                    <p className="text-center text-sm font-bold text-gray-500 uppercase">
                                        Discount <br /> Not Available
                                    </p>
                                </div>
                            )}

                            {/* Social Icons */}
                            <div className="hidden md:block absolute -left-10 w-auto bg-white rounded-2xl shadow-2xl bottom-0 z-20">
                                <div className="flex px-5 py-8 space-x-4">
                                    <a href="https://www.facebook.com/alamin.majumder.16/" target="_blank" rel="noopener noreferrer" className="text-white bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-700 transition duration-200" aria-label="Facebook">
                                        <FaFacebookF size={20} />
                                    </a>
                                    <a href="https://www.instagram.com/alamin.majumder.70/" target="_blank" rel="noopener noreferrer" className="text-white bg-pink-600 p-2 rounded-full shadow-md hover:bg-pink-700 transition duration-200" aria-label="Instagram">
                                        <FaInstagram size={20} />
                                    </a>
                                    <a href="https://www.tiktok.com/@alaminmajumder145" target="_blank" rel="noopener noreferrer" className="text-white bg-black p-2 rounded-full shadow-md hover:bg-gray-800 transition duration-200" aria-label="TikTok">
                                        <FaTiktok size={20} />
                                    </a>
                                    <a href="tel:+880123456789" className="text-white bg-green-500 p-2 rounded-full shadow-md hover:bg-green-600 transition duration-200" aria-label="Call Us">
                                        <FiPhoneCall size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation dots */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
                    {sliders.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-gray-900 w-12' : 'bg-gray-400 w-2'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerSlider;
