// ReviewPage.jsx

import React, { useState } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';

// ⭐ ডেমো ডেটা: আপনার প্রয়োজন অনুযায়ী পরিবর্তন করুন ⭐
const productReviews = [
    { id: 1, user: "তানভীর আহমেদ", rating: 5, date: "১০ নভেম্বর, ২০২৪", title: "অসাধারণ পণ্য!", comment: "শার্টটির ফেব্রিক খুবই ভালো এবং ডেলিভারি দ্রুত ছিল। সাইজও একদম ঠিকঠাইক।" },
    { id: 2, user: "নুসরাত জাহান", rating: 4, date: "০৫ নভেম্বর, ২০২৪", title: "যেমনটা চেয়েছিলাম", comment: "দাম অনুযায়ী পণ্যটি ভালো, তবে রঙের শেড ছবিতে যেমন ছিল, তার থেকে সামান্য আলাদা।" },
    { id: 3, user: "আলী হোসেন", rating: 5, date: "০১ নভেম্বর, ২০২৪", title: "সেরা মূল্য!", comment: "এই দামে এত ভালো গুণগত মানের প্যান্ট পাব ভাবিনি। বিক্রেতাকে ধন্যবাদ।" },
];

const ReviewPage = ({ productName = "টি-শার্ট", averageRating = 4.7, totalReviews = 52 }) => {
    const [rating, setRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ⭐ রেটিং সারসংক্ষেপের জন্য ফাংশন ⭐
    const calculateRatingCounts = () => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        productReviews.forEach(review => {
            if (review.rating >= 1 && review.rating <= 5) {
                counts[review.rating] += 1;
            }
        });
        return counts;
    };
    
    const ratingCounts = calculateRatingCounts();

    // ⭐ রেটিং স্টার কম্পোনেন্ট ⭐
    const RatingStars = ({ count, size = 'text-xl', color = 'text-yellow-400' }) => (
        <div className="flex">
            {[...Array(5)].map((_, index) => (
                <FaStar 
                    key={index} 
                    className={`${size} ${index < count ? color : 'text-gray-300'}`} 
                />
            ))}
        </div>
    );

    // ⭐ নতুন রিভিউ জমা দেওয়ার হ্যান্ডলার ⭐
    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (rating === 0 || !reviewComment) {
            alert("অনুগ্রহ করে একটি রেটিং দিন এবং রিভিউ মন্তব্য লিখুন।");
            return;
        }

        setIsSubmitting(true);
        
        const newReview = {
            id: Date.now(),
            user: "বর্তমান ব্যবহারকারী", // এটি আপনার লগইন ডেটা থেকে আসবে
            rating: rating,
            date: new Date().toLocaleDateString('bn-BD'),
            title: reviewTitle || "কোনো শিরোনাম নেই",
            comment: reviewComment,
        };

        // এখানে আপনার API কল করার লজিক যুক্ত করুন
        console.log("নতুন রিভিউ জমা দেওয়া হচ্ছে:", newReview);

        setTimeout(() => {
            alert("রিভিউ সফলভাবে জমা দেওয়া হয়েছে!");
            setIsSubmitting(false);
            // স্টেট রিসেট করুন
            setRating(0);
            setReviewTitle('');
            setReviewComment('');
            // **প্রকৃত অ্যাপে productReviews ডেটা আপডেট করতে হবে**
        }, 1500);
    };

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{productName} - রিভিউ</h1>
                <p className="text-gray-600 mb-8">মোট {totalReviews} টি রিভিউ</p>

                {/* --- রেটিং সারসংক্ষেপ সেকশন --- */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-10 border border-red-100">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2">রেটিং সারসংক্ষেপ</h2>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                        
                        {/* ১. প্রধান রেটিং */}
                        <div className="flex flex-col items-center">
                            <p className="text-6xl font-extrabold text-red-600">{averageRating}</p>
                            <RatingStars count={Math.round(averageRating)} size="text-2xl" />
                            <p className="text-sm text-gray-500 mt-1">{totalReviews} টি রেটিং</p>
                        </div>
                        
                        {/* ২. রেটিং বার */}
                        <div className="w-full md:w-2/3 space-y-2">
                            {[5, 4, 3, 2, 1].map(star => (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="w-8 font-medium text-gray-700">{star} <FaStar className="inline text-yellow-400 text-sm mb-1"/></span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-red-500 h-2.5 rounded-full" 
                                            style={{ 
                                                width: `${(ratingCounts[star] / totalReviews) * 100}%` 
                                            }}
                                        ></div>
                                    </div>
                                    <span className="w-8 text-right text-sm text-gray-600">{ratingCounts[star]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- নতুন রিভিউ যোগ করার ফর্ম --- */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-10 border border-red-100">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2">আপনার রিভিউ দিন</h2>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        
                        {/* রেটিং ইনপুট */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">রেটিং:</label>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <FaStar
                                        key={star}
                                        className={`text-3xl cursor-pointer transition ${star <= rating ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
                                        onClick={() => setRating(star)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* শিরোনাম ইনপুট */}
                        <div>
                            <label htmlFor="reviewTitle" className="block text-gray-700 font-medium mb-2">শিরোনাম (ঐচ্ছিক):</label>
                            <input
                                id="reviewTitle"
                                type="text"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                                placeholder="সংক্ষেপে আপনার মতামত লিখুন"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                            />
                        </div>

                        {/* মন্তব্য ইনপুট */}
                        <div>
                            <label htmlFor="reviewComment" className="block text-gray-700 font-medium mb-2">আপনার মন্তব্য:</label>
                            <textarea
                                id="reviewComment"
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                rows="4"
                                placeholder="বিস্তারিতভাবে আপনার অভিজ্ঞতা লিখুন"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                            ></textarea>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:bg-red-300"
                        >
                            {isSubmitting ? 'জমা দেওয়া হচ্ছে...' : 'রিভিউ জমা দিন'}
                        </button>
                    </form>
                </div>


                {/* --- সকল রিভিউ সেকশন --- */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6">সকল গ্রাহকের রিভিউ ({totalReviews})</h2>

                <div className="space-y-6">
                    {productReviews.map(review => (
                        <div key={review.id} className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <div className="flex items-start gap-4 mb-3">
                                <FaUserCircle className="text-4xl text-gray-400" />
                                <div>
                                    <p className="font-bold text-lg text-gray-800">{review.user}</p>
                                    <p className="text-sm text-gray-500">{review.date}</p>
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <RatingStars count={review.rating} size="text-lg" />
                            </div>
                            
                            <h3 className="text-xl font-semibold mb-2 text-gray-700">{review.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                    ))}
                    
                    {/* যদি কোনো রিভিউ না থাকে */}
                    {productReviews.length === 0 && (
                        <p className="text-center text-gray-500 py-6">এই পণ্যের জন্য এখনও কোনো রিভিউ নেই। প্রথম রিভিউটি আপনিই দিন!</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ReviewPage;