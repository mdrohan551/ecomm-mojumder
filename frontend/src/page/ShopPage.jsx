// ShopPage.jsx

import React, { useState } from 'react';
import { FaFilter, FaThList, FaThLarge, FaTimes } from 'react-icons/fa';
// ⭐ নতুন ইমপোর্ট: categoryItems যোগ করা হয়েছে ⭐
import { flashSaleProducts, formatCurrency, categoryItems } from '../demoData'; 
import { ProductCard } from '../components/ProductCart/ProductCard';


const ShopPage = () => {
    // এখন 'সব' ক্যাটাগরিটি আপনার categoryItems এর বাইরে, তাই সেটি যোগ করতে হবে।
    const allCategories = [{ nameBn: "সব", slug: "all", id: 0 }, ...categoryItems]; 
    
    const [selectedCategory, setSelectedCategory] = useState('সব');

    const [viewMode, setViewMode] = useState('grid'); // 'grid' বা 'list'
    const [sidebarOpen, setSidebarOpen] = useState(false); // মোবাইলের জন্য

    // ⭐ ফিল্টারিং লজিক (সাধারণ উদাহরণ) ⭐
    const filteredProducts = flashSaleProducts.filter(product => {
        // ⭐ এখানে ফিল্টারিং লজিক আপডেট করার জন্য ক্যাটাগরি ব্যবহার করতে হবে ⭐
        
        // ক্যাটাগরি ফিল্টার: (যদি আপনি product ডেটার মধ্যে slug বা category_id রাখেন তবে এটি কার্যকর হবে)
        // const categoryMatch = selectedCategory === 'সব' || product.categorySlug === selectedCategory; 

        // return categoryMatch;
        return true; 
    });


    return (
        <div className="bg-gray-50 py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b-2 border-red-500 pb-2">
                    🛍️ সকল পণ্য
                </h1>

                {/* Main Layout: Sidebar & Products */}
                <div className="flex flex-col md:flex-row gap-8">

                    {/* ===== ১. সাইডবার (ফিল্টার) ===== */}
                    <aside className={`w-full md:w-1/4 ${sidebarOpen ? 'block' : 'hidden'} md:block bg-white p-6 rounded-lg shadow-lg h-fit sticky top-4`}>

                        {/* মোবাইল ক্লোজ বাটন */}
                        <div className="md:hidden flex justify-end">
                            <button onClick={() => setSidebarOpen(false)} className="text-2xl text-gray-600">
                                <FaTimes />
                            </button>
                        </div>

                        <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
                            <FaFilter className="mr-2 text-red-500" /> ফিল্টার
                        </h3>

                        {/* ক্যাটাগরি ফিল্টার */}
                        <div className="mb-6">
                            <h4 className="font-bold text-lg mb-3 text-gray-800">ক্যাটাগরি</h4>
                            <div className="space-y-2">
                                {/* ⭐ categoryItems ব্যবহার করা হয়েছে ⭐ */}
                                {allCategories.map(cat => (
                                    <button
                                        key={cat.id}
                                        // এখন nameBn ব্যবহার করে স্টেট আপডেট করা হবে
                                        onClick={() => setSelectedCategory(cat.nameBn)} 
                                        className={`block w-full text-left p-2 rounded transition ${
                                            selectedCategory === cat.nameBn ? 'bg-red-500 text-white font-semibold' : 'hover:bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {cat.nameBn}
                                    </button>
                                ))}
                            </div>
                        </div>

                        
                    </aside>

                    {/* ===== ২. প্রোডাক্ট ডিসপ্লে এরিয়া (বাকি কোড অপরিবর্তিত) ===== */}
                    <main className="w-full md:w-3/4">

                        {/* টপ বার: সর্টিং এবং ভিউ টগল */}
                        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
                            <p className="text-gray-700 font-medium hidden sm:block">
                                {filteredProducts.length} টি পণ্য পাওয়া গেছে
                            </p>

                            {/* মোবাইল ফিল্টার বাটন */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden flex items-center bg-red-500 text-white px-4 py-2 rounded font-semibold transition hover:bg-red-600"
                            >
                                <FaFilter className="mr-2" /> ফিল্টার
                            </button>

                            {/* ভিউ টগল */}
                            <div className="hidden sm:flex space-x-2">
                                <button onClick={() => setViewMode('grid')} className={`p-2 rounded transition ${viewMode === 'grid' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    <FaThLarge className="text-xl" />
                                </button>
                                <button onClick={() => setViewMode('list')} className={`p-2 rounded transition ${viewMode === 'list' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    <FaThList className="text-xl" />
                                </button>
                            </div>
                        </div>

                        {/* প্রোডাক্ট গ্রিড/লিস্ট */}
                        <div className={viewMode === 'grid' ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>

                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        formatCurrency={formatCurrency}
                                        viewMode={viewMode}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-xl text-gray-500 py-10 bg-white rounded-lg shadow-md">
                                    দুঃখিত, কোনো পণ্য খুঁজে পাওয়া যায়নি।
                                </p>
                            )}
                        </div>

                        {/* পেইজিনেশন (উদাহরণ) */}
                        <div className="flex justify-center mt-8">
                            <button className="px-4 py-2 mx-1 bg-red-500 text-white rounded hover:bg-red-600">১</button>
                            <button className="px-4 py-2 mx-1 bg-white text-gray-700 border rounded hover:bg-gray-100">২</button>
                            <button className="px-4 py-2 mx-1 bg-white text-gray-700 border rounded hover:bg-gray-100">৩</button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;