// OrdersPage.jsx

import React, { useState } from 'react';
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaEllipsisV } from 'react-icons/fa';

// ⭐ ডেমো অর্ডার ডেটা: আপনার প্রয়োজন অনুযায়ী পরিবর্তন করুন ⭐
const dummyOrders = [
    {
        id: "ORD007",
        date: "১৫ নভেম্বর, ২০২৪",
        status: "Completed",
        total: 1450,
        items: [{ name: "ব্ল্যাক টি-শার্ট (L)", qty: 1 }],
    },
    {
        id: "ORD006",
        date: "১২ নভেম্বর, ২০২৪",
        status: "Processing",
        total: 2800,
        items: [{ name: "জিন্স প্যান্ট", qty: 1 }, { name: "লেদার ওয়ালেট", qty: 1 }],
    },
    {
        id: "ORD005",
        date: "০৫ নভেম্বর, ২০২৪",
        status: "Completed",
        total: 550,
        items: [{ name: "সাদা জুতো", qty: 1 }],
    },
    {
        id: "ORD004",
        date: "০২ নভেম্বর, ২০২৪",
        status: "Cancelled",
        total: 1200,
        items: [{ name: "বাচ্চাদের পোশাক", qty: 2 }],
    },
    {
        id: "ORD003",
        date: "২৮ অক্টোবর, ২০২৪",
        status: "Shipped",
        total: 990,
        items: [{ name: "ফ্লানেল শার্ট", qty: 1 }],
    },
];

// ⭐ স্ট্যাটাস অনুযায়ী রং এবং আইকন ম্যাপ ⭐
const statusMap = {
    Processing: { label: "প্রক্রিয়াকরণের মধ্যে", icon: FaBox, color: "text-blue-500", bg: "bg-blue-100" },
    Shipped: { label: "পরিবহণে", icon: FaTruck, color: "text-yellow-500", bg: "bg-yellow-100" },
    Completed: { label: "সম্পূর্ণ হয়েছে", icon: FaCheckCircle, color: "text-green-500", bg: "bg-green-100" },
    Cancelled: { label: "বাতিল করা হয়েছে", icon: FaTimesCircle, color: "text-red-500", bg: "bg-red-100" },
};

// আপনার formatCurrency ফাংশন ধরে নেওয়া হচ্ছে
const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;


// ⭐ অর্ডার কার্ড কম্পোনেন্ট ⭐
const OrderCard = ({ order }) => {
    const statusInfo = statusMap[order.status] || { label: "অজানা", icon: FaEllipsisV, color: "text-gray-500", bg: "bg-gray-100" };
    const Icon = statusInfo.icon;
    
    return (
        <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-l-4 border-red-500">
            
            <div className="flex justify-between items-center border-b pb-3 mb-3">
                <div>
                    <p className="text-sm text-gray-500">অর্ডার আইডি:</p>
                    <p className="font-bold text-red-600 text-lg">{order.id}</p>
                </div>
                
                <div className={`flex items-center text-sm font-semibold p-2 rounded-full ${statusInfo.bg} ${statusInfo.color}`}>
                    <Icon className="mr-1" />
                    {statusInfo.label}
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">তারিখ:</span> {order.date}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">মোট মূল্য:</span> <span className="text-xl font-bold text-gray-800">{formatCurrency(order.total)}</span>
                </p>
                
                <p className="text-sm font-semibold text-gray-700 pt-2">পণ্য ({order.items.length}টি):</p>
                <ul className="list-disc list-inside ml-2 text-sm text-gray-500">
                    {order.items.map((item, index) => (
                        <li key={index}>
                            {item.name} (পরিমাণ: {item.qty})
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
                {/* ডিটেইলস বাটন */}
                <button className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition">
                    বিস্তারিত দেখুন
                </button>
                {/* অ্যাকশন বাটন */}
                {order.status === 'Shipped' && (
                    <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                        ট্র্যাক করুন
                    </button>
                )}
                {order.status === 'Processing' && (
                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                        বাতিল করুন
                    </button>
                )}
            </div>
        </div>
    );
};


const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState('All'); // 'All', 'Processing', 'Shipped', 'Completed', 'Cancelled'

    // ⭐ ট্যাব অনুযায়ী অর্ডার ফিল্টারিং লজিক ⭐
    const filteredOrders = dummyOrders.filter(order => {
        if (activeTab === 'All') return true;
        return order.status === activeTab;
    });
    
    // ⭐ ট্যাব মেনু ডেটা ⭐
    const tabs = [
        { key: 'All', label: 'সকল অর্ডার' },
        { key: 'Processing', label: 'প্রক্রিয়াকরণের মধ্যে' },
        { key: 'Shipped', label: 'পরিবহণে' },
        { key: 'Completed', label: 'সম্পূর্ণ' },
        { key: 'Cancelled', label: 'বাতিল' },
    ];


    return (
        <div className="bg-gray-50 py-10 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b-2 border-red-500 pb-2">
                    🧾 আমার অর্ডারসমূহ
                </h1>

                {/* --- ট্যাব মেনু --- */}
                <div className="mb-8 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                    <div className="flex space-x-4 border-b border-gray-200">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`whitespace-nowrap px-4 py-2 font-medium transition duration-200 
                                    ${activeTab === tab.key 
                                        ? 'border-b-4 border-red-500 text-red-600 font-bold' 
                                        : 'text-gray-600 hover:text-red-500 hover:border-red-300'
                                    }`}
                            >
                                {tab.label} ({dummyOrders.filter(o => tab.key === 'All' || o.status === tab.key).length})
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- অর্ডার লিস্ট --- */}
                <div className="space-y-6">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg shadow-md">
                            <p className="text-xl text-gray-500">
                                {activeTab === 'All' 
                                    ? 'আপনার কোনো অর্ডার নেই।' 
                                    : `${tabs.find(t => t.key === activeTab)?.label} স্ট্যাটাসে কোনো অর্ডার খুঁজে পাওয়া যায়নি।`
                                }
                            </p>
                            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                                এখনই কেনাকাটা শুরু করুন
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;