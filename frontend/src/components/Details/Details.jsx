import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { flashSaleProductDetails, flashSaleProducts } from '../../demoData';



// আপনার স্টার রেটিং কম্পোনেন্ট (সহজে বোঝার জন্য একটি ডামি ফাংশন)
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
        stars.push(<span key="half" className="text-yellow-400">½</span>); // এটা আসলে CSS দিয়ে করা উচিত, কিন্তু বোঝার জন্য এভাবে দিলাম
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }

    return (
        <div className="flex items-center space-x-0.5">
            {stars}
            <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
        </div>
    );
};

// --- মূল Details কম্পোনেন্ট ---
const Details = () => {
    // 1. useParams ব্যবহার করে URL থেকে id নেওয়া
    const { id } = useParams();
    const productId = parseInt(id); // id স্ট্রিং হিসেবে আসে, তাই এটিকে সংখ্যায় রূপান্তর করা

    // 2. flashSaleProducts থেকে মূল প্রোডাক্টের তথ্য খোঁজা
    const product = flashSaleProducts.find(p => p.id === productId);

    // 3. flashSaleProductDetails থেকে বিস্তারিত তথ্য খোঁজা
    const details = flashSaleProductDetails.find(d => d.productId === productId);

    // 4. প্রোডাক্ট না পাওয়া গেলে
    if (!product || !details) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
                <h1 className="text-4xl font-bold text-red-600 mb-4">404 - প্রোডাক্ট পাওয়া যায়নি 😥</h1>
                <p className="text-gray-700 mb-6">দুঃখিত, এই প্রোডাক্টের আইডি দিয়ে কোনো তথ্য খুঁজে পাওয়া যায়নি।</p>
                <Link to="/" className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg shadow-md transition duration-300">
                    হোমপেজে ফিরে যান
                </Link>
            </div>
        );
    }

    // 5. মূল্য এবং ইন-স্টক স্ট্যাটাসকে একত্রিত করা
    const finalProduct = {
        ...product,
        ...details,
        // মূল্য স্ট্রিং হলেও parseInt ব্যবহার করে গাণিতিক কাজে লাগানোর জন্য প্রস্তুত
        price: product.price ? parseInt(product.price) : 0,
        oldPrice: product.oldPrice ? parseInt(product.oldPrice) : 0,
    };

    const discountPercentage = finalProduct.oldPrice > finalProduct.price
        ? Math.round(((finalProduct.oldPrice - finalProduct.price) / finalProduct.oldPrice) * 100)
        : 0;

    // --- রেন্ডারিং শুরু ---
    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">

                {/* Product Section */}
                <div className="md:flex">

                    {/* Image Gallery (Left Side) */}
                    <div className="md:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-50">
                        {/*  */}
                        <img
                            src={finalProduct.images[0]}
                            alt={finalProduct.name}
                            className="w-full max-h-[500px] object-contain rounded-lg shadow-md"
                        />
                        {/* Thumbnail Images */}
                        <div className="flex space-x-3 mt-4">
                            {finalProduct.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-16 h-16 object-cover rounded-md border-2 border-gray-300 hover:border-blue-500 cursor-pointer"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Details (Right Side) */}
                    <div className="md:w-1/2 p-6 md:p-10">
                        <div className="space-y-4">

                            {/* Title & Rating */}
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                                {finalProduct.title}
                            </h1>
                            <p className="text-xl text-gray-600">{finalProduct.name}</p>

                            <StarRating rating={finalProduct.rating} />

                            <hr className="my-4" />

                            {/* Price Section */}
                            <div className="flex items-baseline space-x-3">
                                <span className="text-4xl font-bold text-red-600">
                                    ৳ {finalProduct.price.toLocaleString('bn-BD')}
                                </span>
                                {finalProduct.oldPrice > finalProduct.price && (
                                    <>
                                        <span className="text-xl text-gray-500 line-through">
                                            ৳ {finalProduct.oldPrice.toLocaleString('bn-BD')}
                                        </span>
                                        <span className="text-lg font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                            -{discountPercentage}%
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Stock Status */}
                            <p className={`text-lg font-semibold ${finalProduct.instock ? 'text-green-600' : 'text-red-600'}`}>
                                স্ট্যাটাস: {finalProduct.instock ? 'স্টকে আছে (In Stock)' : 'স্টকে নেই (Out of Stock)'}
                            </p>

                            <hr className="my-4" />

                            {/* Description */}
                            <h2 className="text-xl font-semibold text-gray-800 mt-6">পণ্যের বিবরণ:</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {finalProduct.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex space-x-4 pt-6">
                                <button
                                    disabled={!finalProduct.instock}
                                    className={`flex-1 py-3 px-6 rounded-lg text-white font-semibold transition duration-300 ${finalProduct.instock
                                            ? 'bg-red-500 hover:bg-red-600'
                                            : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {finalProduct.instock ? 'কার্টে যোগ করুন' : 'স্টকে নেই'}
                                </button>
                                <button
                                    disabled={!finalProduct.instock}
                                    className={`flex-1 py-3 px-6 rounded-lg font-semibold border-2 transition duration-300 ${finalProduct.instock
                                            ? 'border-blue-500 text-blue-500 hover:bg-blue-50'
                                            : 'border-gray-400 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    এখনই কিনুন
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Review Section --- */}
                <div className="p-6 md:p-10 border-t border-gray-200 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">প্রোডাক্ট রিভিউ ({finalProduct.reviews.length})</h2>

                    {finalProduct.reviews.length > 0 ? (
                        <div className="space-y-6">
                            {finalProduct.reviews.map((review) => (
                                <div key={review.id} className="border p-4 rounded-lg bg-gray-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-lg font-semibold text-gray-800">{review.name}</p>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-gray-700 italic mb-3">{review.comment}</p>
                                    <p className="text-sm text-gray-500">
                                        তারিখ: {new Date(review.date).toLocaleDateString('bn-BD')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">এই প্রোডাক্টের জন্য এখনও কোনো রিভিউ নেই।</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Details;