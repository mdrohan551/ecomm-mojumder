// FlashSale.jsx (আপডেট করা হয়েছে)

import React, { useEffect } from 'react';
import { FaBolt } from 'react-icons/fa';
// formatCurrency এখন utils থেকে ইমপোর্ট করা হচ্ছে, demoData নয়

import { ProductCard } from '../ProductCart/ProductCard';

import { formatCurrency } from '../../demoData';
import useStore from '../../store/api_call';


const FlashSale = () => {
    // Zustand Store থেকে state এবং actions গুলো নেওয়া হলো
    const { 
        flashSaleProducts, 
        loadingProducts, 
        errorProducts, 
        fetchProducts, 
        adminData, // adminData ও এখানে রাখা হলো যাতে তার API কল ট্রিগার করা যায়
        fetchAdmin,
        loadingAdmin,
    } = useStore();

    // কম্পোনেন্ট মাউন্ট হওয়ার সাথে সাথে প্রোডাক্ট এবং অ্যাডমিন ডেটা লোড করার জন্য useEffect
    useEffect(() => {
        // প্রোডাক্ট ডেটা লোড করা হচ্ছে
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        // অ্যাডমিন ডেটা লোড করা হচ্ছে (WhatsApp নম্বর পাওয়ার জন্য)
        if (!adminData) {
            fetchAdmin();
        }
    }, [adminData, fetchAdmin]);


    const saleProducts = flashSaleProducts;
    const isFetchingData = loadingProducts || loadingAdmin;


    // লোডিং এবং এরর স্টেট হ্যান্ডেলিং
    if (isFetchingData && saleProducts.length === 0) {
        return (
            <div className="bg-gray-100 py-10 text-center min-h-[500px] flex items-center justify-center">
                <p className="text-xl font-semibold text-blue-600 animate-pulse">
                    <FaBolt className="inline mr-2" /> ডেটা লোড হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।
                </p>
            </div>
        );
    }

    if (errorProducts) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto my-10 max-w-lg">
                <strong className="font-bold">এরর: </strong>
                <span className="block sm:inline">{errorProducts}</span>
                <p className="text-sm mt-2">API থেকে ডেটা আনতে ব্যর্থ। ফলব্যাক ডেটা দেখানো হতে পারে।</p>
            </div>
        );
    }
    
    // যদি প্রোডাক্ট না থাকে
    if (saleProducts.length === 0 && !isFetchingData) {
        return (
            <div className="bg-gray-100 py-10 text-center">
                <h2 className="text-2xl font-bold text-gray-700">এই মুহূর্তে কোনো ডিসকাউন্ট প্রোডাক্ট নেই।</h2>
            </div>
        );
    }


    return (
        <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">

                {/* ডিসকাউন্ট চলছে লেখা */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold bg-white inline-block px-6 py-2 rounded-xl shadow-lg text-red-600 animate-pulse">
                        <FaBolt className="inline mr-3" /> ✨ ডিসকাউন্ট চলছে! ✨ <FaBolt className="inline ml-3" />
                    </h1>
                </div>

                {/* Product Grid / Slider Track */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 overflow-x-auto scrollbar-hidden">
                    {saleProducts.map((product) => (
                        <ProductCard
                            key={product.id || product._id}
                            product={product}
                            // formatCurrency কে আর prop হিসেবে পাঠানোর প্রয়োজন নেই, কিন্তু রাখা হলো যদি অন্য কোথাও প্রয়োজন হয়।
                            formatCurrency={formatCurrency}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FlashSale;