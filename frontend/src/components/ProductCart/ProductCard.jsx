// ProductCard.jsx (আপডেট করা হয়েছে)

import React from 'react';
import { Link } from 'react-router-dom';
// FaHeart, FaStar, FaWhatsapp আইকন ইমপোর্ট করা হলো
import { FaHeart, FaStar, FaWhatsapp } from 'react-icons/fa';
import useStore from '../../store/api_call';



// formatCurrency এখন FlashSale.jsx থেকে prop হিসেবে আসছে (বা utils থেকে ইমপোর্ট করা যেতে পারে)
export const ProductCard = ({ product, formatCurrency }) => {
    // Zustand Store থেকে adminData (যা fetchAdmin কল করার পর populate হবে) নেওয়া হলো
    const { adminData } = useStore();

    // adminData থেকে ফোন নাও, না থাকলে fallback
    const rawNumber = adminData?.phoneNumber || '0000000000';

    // country code ঠিকভাবে যুক্ত করা
    const phoneNumber = rawNumber.startsWith('880') ? rawNumber : '880' + rawNumber;

    const whatsappMessage = `আসসালামু আলাইকুম, আমি আপনার এই প্রোডাক্টটি (${product.name}, ID: ${product.id || product._id}) সম্পর্কে আরও বিস্তারিত জানতে চাই।`;

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;


    // মূল্যগুলি সংখ্যায় আছে কিনা নিশ্চিত করা
    const price = parseInt(product.price);
    const oldPrice = parseInt(product.oldPrice);

    // ডিসকাউন্ট শতাংশ গণনা
    const discountPercentage = oldPrice > price
        ? Math.round(((oldPrice - price) / oldPrice) * 100)
        : 0;

    // ব্যবহারকারীর অনুরোধ অনুযায়ী: স্থির ৫টি পূর্ণ স্টার দেখানোর ফাংশন
    const renderStaticRating = () => {
        const stars = [];
        const totalStars = 5;

        for (let i = 0; i < totalStars; i++) {
            // স্থিরভাবে ৫টি পূর্ণ স্টার যোগ করা হলো
            stars.push(<FaStar key={i} className="text-yellow-400" size={14} />);
        }

        return (
            <div className="flex items-center space-x-0.5">
                {stars}
                {/* রেটিং সংখ্যাটি সরানো হলো, যেহেতু রেটিং এখন স্থির */}
            </div>
        );
    };

    return (
        // পুরো কার্ডটিকে <Link> দিয়ে মুড়িয়ে দেওয়া হয়েছে।
        <Link
            to={`/details/${product.id || product._id}`} // ID _id বা id হতে পারে, তাই দুটোই চেক করা হলো
            key={product.id || product._id}
            className="block"
        >
            <div
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 relative h-full flex flex-col justify-between"
            >
                <div>
                    {/* Image and Heart Icon */}
                    <div className="relative mb-3 bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                        <img
                            src={product.image || `https://placehold.co/400x300/F0F8FF/2C3E50?text=Product+${product.id || product._id}`}
                            alt={product.name}
                            className="h-auto w-50 sm:w-full sm:h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <button
                            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-red-500 transition"
                            onClick={(e) => e.preventDefault()} // হার্ট আইকনে ক্লিক করলে যেন পেজ পরিবর্তন না হয়
                        >
                            <FaHeart size={16} />
                        </button>

                        {/* Discount Tag */}
                        {discountPercentage > 0 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                -{discountPercentage}%
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <h3 className="text-md font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
                        {product.name}
                    </h3>

                    {/* রেটিং ডিসপ্লে: স্থির ৫ স্টার দেখানো হচ্ছে */}
                    <div className="mb-2">
                        {renderStaticRating()}
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <p className="text-xl font-bold text-gray-900">
                            {formatCurrency(price)}
                        </p>
                        {oldPrice > price && (
                            <p className="text-sm text-gray-500 line-through">
                                {formatCurrency(oldPrice)}
                            </p>
                        )}
                        <p className={`text-sm ${product.instock ? "bg-green-200 text-green-800 px-2 inline rounded-xl font-medium" : "bg-red-200 text-red-800 px-2 inline rounded-xl font-medium"}`}>
                            {product?.instock ? "স্টকে আছে" : "বিক্রি শেষ"}
                        </p>
                    </div>
                </div>

                {/* WhatsApp Button (Foot of the card) */}
                {
                    // যদি স্টকে থাকে তবে হোয়াটসঅ্যাপ বাটন দেখাবে
                    product.instock ? (
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // ক্লিক ইভেন্ট লিংক কম্পোনেন্ট পর্যন্ত যেতে বাধা দেবে
                            className={`w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 transition duration-200 text-white py-2 rounded-lg font-semibold`}
                        >
                            <FaWhatsapp size={16} />
                            <span>হোয়াটসঅ্যাপ করুন</span>
                        </a>
                    ) : (
                        // স্টক না থাকলে শুধু বিক্রি শেষ বাটন থাকবে
                        <button
                            className={`w-full flex items-center justify-center space-x-2 bg-gray-500 cursor-not-allowed text-white py-2 rounded-lg font-semibold`}
                            disabled
                            onClick={(e) => e.preventDefault()}
                        >
                            <span>বিক্রি শেষ</span>
                        </button>
                    )
                }
            </div>
        </Link>
    );
};