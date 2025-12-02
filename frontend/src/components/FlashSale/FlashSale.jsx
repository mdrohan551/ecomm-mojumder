// FlashSale.jsx

import React, { useState } from 'react';
import { FaBolt } from 'react-icons/fa';
// ইমপোর্টগুলি অবশ্যই আপনার ফাইল পাথ অনুযায়ী পরিবর্তন করবেন
import { flashSaleProducts, formatCurrency } from '../../demoData';
import FlashSaleTimer from './FlashSaleTimer';
import { ProductCard } from '../ProductCart/ProductCard';


const FlashSale = () => {
    
    // ⭐ নতুন স্টেট: সরাসরি শেষ হওয়ার তারিখ এবং সময় সেট করা হলো ⭐
    // আপনি যখন ডেটাবেস থেকে লোড করবেন, তখন এই স্টেকে সেই ডেটা বসাবেন।
    // তারিখ ফরম্যাট: "YYYY-MM-DDTHH:MM:SS" (যেমন: 2025-12-03T23:59:59)
    const [saleEndDate, setSaleEndDate] = useState("2025-12-03T23:59:59"); 

    // এই ফাংশনটি এখন এডমিন ইনপুট থেকে নতুন শেষ তারিখ নিতে ব্যবহার করা যেতে পারে
    const handleDateChange = (newEndDate) => {
        setSaleEndDate(newEndDate);
        // Note: এখন লোকাল স্টোরেজ স্বয়ংক্রিয়ভাবে আপডেট হবে (FlashSaleTimer.jsx-এ)
    };


    // শুধুমাত্র flashSale: true থাকা প্রোডাক্টগুলি দেখানো হবে
    const saleProducts = flashSaleProducts.filter(product => product.flashSale === true);


    return (
        <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">

                {/* ডিসকাউন্ট চলছে লেখা */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold bg-white inline-block px-6 py-2 animate-pulse">
                        ✨ ডিসকাউন্ট চলছে! ✨
                    </h1>
                </div>

                {/* Header Section */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
                    <div className="flex items-center space-x-4">
                        <FaBolt className="text-3xl text-red-500" />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">ফ্ল্যাশ সেল</h2>

                        <div className="block">
                            {/* এখন saleEndDate প্রপস হিসেবে পাস করা হলো */}
                            <FlashSaleTimer saleEndDate={saleEndDate} /> 
                        </div>
                    </div>

            
                </div>

                {/* Product Grid / Slider Track */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 overflow-x-auto scrollbar-hidden">
                    {saleProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            formatCurrency={formatCurrency}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FlashSale;