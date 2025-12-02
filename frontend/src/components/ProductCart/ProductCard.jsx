// ProductCard.jsx
import React from 'react';
// Link ইমপোর্ট করা হয়েছে React Router থেকে
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar, FaStarHalfAlt } from 'react-icons/fa';
// ... formatCurrency আপনার demoData ফাইল থেকে ইমপোর্ট হবে

// Note: ধরে নেওয়া হচ্ছে formatCurrency ফাংশনটি অন্য কোথাও সংজ্ঞায়িত আছে।

export const ProductCard = ({ product, formatCurrency }) => {

    // মূল্যগুলি সংখ্যায় আছে কিনা নিশ্চিত করা
    const price = parseInt(product.price);
    const oldPrice = parseInt(product.oldPrice);

    const discountPercentage = oldPrice > price
        ? Math.round(((oldPrice - price) / oldPrice) * 100)
        : 0;

    // কার্ট হ্যান্ডলারের পরিবর্তন: এটি এখন ইভেন্ট অবজেক্ট (e) গ্রহণ করে
    const handleAddToCart = (e) => {
        // **১. এই লাইনটি নিশ্চিত করে যে ক্লিক ইভেন্টটি যেন Link কম্পোনেন্ট পর্যন্ত না পৌঁছায়।**
        // এটিই মূল কৌশল যা 'কার্টে যোগ করুন' বোতামকে ডিটেইলস পেজে যেতে বাধা দেয়।
        e.stopPropagation();

        // এখানে আপনার কার্ট লজিক লিখুন (যেমন: context/redux-এ ডেটা পাঠানো)
        console.log(`${product.name} Added to Cart! (ID: ${product.id})`);
        alert(`${product.name} কার্টে যোগ করা হয়েছে!`);
    };

    // রেটিং দেখানোর ফাংশন (আগের মতোই)
    const renderRating = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const totalStars = 5;
        const stars = [];

        for (let i = 0; i < totalStars; i++) {
            if (i < fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" size={14} />);
            } else if (hasHalfStar && i === fullStars) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" size={14} />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-300" size={14} />);
            }
        }

        return (
            <div className="flex items-center space-x-0.5">
                {stars}
                <span className="ml-1 text-sm font-medium text-gray-600">({rating})</span>
            </div>
        );
    };

    return (
        // **২. পুরো কার্ডটিকে <Link> দিয়ে মুড়িয়ে দেওয়া হয়েছে।** // এটি `:id` প্যারামিটারসহ ডিটেইলস পেজের ইউআরএল তৈরি করে।
        <Link
            to={`/details/${product.id}`}
            key={product.id}
            className="block" // Link কে ব্লক এলিমেন্ট হিসেবে সেট করা
        >
            <div
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 relative h-full flex flex-col justify-between"
            >
                <div>
                    {/* Image and Heart Icon */}
                    <div className="relative mb-3 bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-auto w-50 sm:w-full sm:h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <button
                            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-red-500 transition"
                            onClick={(e) => e.preventDefault()} // হার্ট আইকনে ক্লিক করলে যেন পেজ পরিবর্তন না হয়
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

                    {/* রেটিং ডিসপ্লে */}
                    <div className="mb-2">
                        {renderRating(product.rating)}
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <p className="text-xl font-bold text-gray-900">
                            {formatCurrency(price)}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                            {formatCurrency(oldPrice)}
                        </p>
                        <p className={`text-sm ${product.instock ? "bg-green-200 text-green-800 px-2 inline rounded-xl font-medium" : "bg-red-200 text-red-800 px-2 inline rounded-xl font-medium"}`}>
                            {product?.instock ? "স্টকে আছে" : "বিক্রি শেষ"}
                        </p>
                    </div>
                </div>

                {/* Add to Cart Button (Foot of the card) */}
                {
                    product.instock ? (
                        // **৩. onClick এ handleAddToCart ফাংশন কল করা হয়েছে**
                        <button
                            onClick={handleAddToCart}
                            className={`w-full flex items-center justify-center space-x-2 bg-black hover:bg-gray-800 transition duration-200 text-white py-2 rounded-lg font-semibold mt-2`}
                        >
                            <FaShoppingCart size={16} />
                            <span>কার্টে যোগ করুন</span>
                        </button>
                    ) : (
                        <button
                            className={`w-full flex items-center justify-center space-x-2 bg-gray-500 cursor-not-allowed text-white py-2 rounded-lg font-semibold mt-2`}
                            disabled
                            onClick={(e) => e.preventDefault()} // এটিও নিশ্চিত করে যেন Link এ ক্লিক না হয়
                        >
                            <span>বিক্রি শেষ</span>
                        </button>
                    )
                }
            </div>
        </Link>
    );
};