// Categories.jsx (জুতা ক্যাটাগরি যোগ করার জন্য আপডেট করা হলো)

import React from 'react';
// প্রয়োজনীয় react-icons ইমপোর্ট করুন
// FaShoePrints নতুন করে ইমপোর্ট করা হলো
import { FaTshirt, FaRunning, FaShoePrints, FaThLarge } from 'react-icons/fa'; 
// GiDress বাদ দেওয়া হলো, GiShirtButton, GiTrousers ইত্যাদি রাখা হলো
import { GiCricketBat, GiPoloShirt, GiShirtButton, GiTrousers } from 'react-icons/gi'; 
// Note: GiDress বাদ দেওয়া হয়েছে

// আপনি যেখান থেকে আপনার ডেটা ইমপোর্ট করছেন
import { categoryItems } from '../../../demoData'; 


// Icon কম্পোনেন্ট ম্যাপিং ফাংশন: স্ট্রিং নাম থেকে আসল React Icon কম্পোনেন্ট রেন্ডার করবে
const getIconComponent = (iconName) => {
    switch (iconName) {
        case 'FaTshirt':
            return FaTshirt;
        case 'GiShirtButton':
            return GiPoloShirt;
        case 'GiTrousers':
            return GiTrousers;
        case 'GiCricketBat':
            return GiCricketBat;
        case 'FaTshirt':
            return FaTshirt;
        case 'FaShoePrints': // নতুন জুতা আইকন যোগ করা হলো
            return FaShoePrints;
        // case 'GiDress': // এটি বাদ দেওয়া হয়েছে
        //     return GiDress;
        default:
            return FaThLarge; // যদি কোনো আইকন খুঁজে না পাওয়া যায়
    }
};


const Categories = () => {
    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-4">
                {/* হেডিং সেকশন */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                        আমাদের ক্যাটাগরি সমূহ
                    </h2>
                    <p className="text-lg text-gray-600">
                        আপনার পছন্দের ক্যাটাগরি বেছে নিন
                    </p>
                </div>

                {/* ক্যাটাগরি গ্রিড (এখন ৬টি আইটেম দেখাবে) */}
                <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
                    {categoryItems.map((category) => {
                        const IconComponent = getIconComponent(category.icon);
                        
                        return (
                            <div
                                key={category.id} 
                                
                                className="group flex flex-col items-center p-3 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-xl"
                                aria-label={category.nameBn}
                            >
                                {/* ক্যাটাগরি আইকন কন্টেইনার (বৃত্তাকার সেপ) */}
                                <div className="w-10 h-10 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 group-hover:bg-primary/20">
                                    
                                    {/* রিয়েল React Icon ব্যবহার করা হয়েছে */}
                                    <IconComponent 
                                        className="text-gray-700 text-2xl sm:text-5xl transition-colors duration-300 group-hover:text-primary transform group-hover:scale-110"
                                    />
                                    
                                </div>
                                
                                {/* ক্যাটাগরি নাম */}
                                <p className="text-sm font-semibold text-gray-800 mt-1 transition-colors duration-300 group-hover:text-primary">
                                    {category.nameBn}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Categories;