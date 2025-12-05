// Details.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import useStore from '../../store/api_call';


const Details = () => {
    const { id } = useParams();
    const productId = id; // যদি MongoDB _id হয়, parseInt এর দরকার নেই
    const { flashSaleProducts, adminData, fetchProducts, fetchAdmin } = useStore();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        // যদি products না থাকে, load করো
        if (!flashSaleProducts || flashSaleProducts.length === 0) {
            fetchProducts();
        }
        if (!adminData) {
            fetchAdmin();
        }
    }, []);

    useEffect(() => {
        if (flashSaleProducts && flashSaleProducts.length > 0) {
            const p = flashSaleProducts.find(p => p._id === productId || p.id === productId);
            setProduct(p || null);
        }
    }, [flashSaleProducts, productId]);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
                <h1 className="text-4xl font-bold text-red-600 mb-4">404 - প্রোডাক্ট পাওয়া যায়নি 😥</h1>
                <p className="text-gray-700 mb-6">দুঃখিত, এই প্রোডাক্টের আইডি দিয়ে কোনো তথ্য খুঁজে পাওয়া যায়নি।</p>
                <Link to="/" className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg shadow-md transition duration-300">
                    হোমপেজে ফিরে যান
                </Link>
            </div>
        );
    }

    // ফোন নম্বর ঠিকভাবে country code সহ
    const rawNumber = adminData?.phoneNumber || '0000000000';
    const phoneNumber = rawNumber.startsWith('880') ? rawNumber : '880' + rawNumber;

    const whatsappMessage = `আসসালামু আলাইকুম, আমি আপনার প্রোডাক্টটি (${product.name}, ID: ${product.id || product._id}) সম্পর্কে জানতে চাই।`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const price = parseInt(product.price);
    const oldPrice = parseInt(product.oldPrice);
    const discountPercentage = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-50">
                        <img
                            src={product.image || `https://placehold.co/400x300/F0F8FF/2C3E50?text=Product`}
                            alt={product.name}
                            className="w-full max-h-[500px] object-contain rounded-lg shadow-md"
                        />
                    </div>

                    {/* Details */}
                    <div className="md:w-1/2 p-6 md:p-10">
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{product.title || product.name}</h1>
                            <p className="text-xl text-gray-600">{product.name}</p>

                            <hr className="my-4" />

                            {/* Price */}
                            <div className="flex items-baseline space-x-3">
                                <span className="text-4xl font-bold text-red-600">৳ {price.toLocaleString('bn-BD')}</span>
                                {oldPrice > price && (
                                    <>
                                        <span className="text-xl text-gray-500 line-through">৳ {oldPrice.toLocaleString('bn-BD')}</span>
                                        <span className="text-lg font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">-{discountPercentage}%</span>
                                    </>
                                )}
                            </div>

                            <p className={`text-lg font-semibold ${product.instock ? 'text-green-600' : 'text-red-600'}`}>
                                স্ট্যাটাস: {product.instock ? 'স্টকে আছে (In Stock)' : 'স্টকে নেই (Out of Stock)'}
                            </p>

                            <hr className="my-4" />

                            <h2 className="text-xl font-semibold text-gray-800 mt-6">পণ্যের বিবরণ:</h2>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>

                            {/* Buttons */}
                            <div className="flex space-x-4 pt-6">
                                <a
                                    href={`callto:${phoneNumber}`}
                                    className={`flex-1 py-3 px-6 rounded-lg text-white font-semibold transition duration-300 flex items-center justify-center space-x-2 ${product.instock ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                                    disabled={!product.instock}
                                >
                                    <FaPhoneAlt size={16} />
                                    <span>সরাসরি কল করুন</span>
                                </a>

                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 py-3 px-6 rounded-lg text-white font-semibold transition duration-300 flex items-center justify-center space-x-2 ${product.instock ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                                    disabled={!product.instock}
                                >
                                    <FaWhatsapp size={18} />
                                    <span>হোয়াটসঅ্যাপ করুন</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
