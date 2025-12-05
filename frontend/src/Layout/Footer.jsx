// Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
// আপনার ফাইল পাথ অনুযায়ী ইমপোর্ট করুন

import logo from "/images/Screenshot_3-removebg-preview.png"; // আপনার লোগো পাথ



const Footer = () => {

    // ⭐ ফুটারের জন্য অতিরিক্ত সহজ মেনু (যা navLinks এ নেই) ⭐
    const simpleLinks = [
        { name: "শর্তাবলী", path: "/terms" },
        { name: "গোপনীয়তা নীতি", path: "/privacy" },
    ];

    return (
        <footer className="bg-gray-800 text-white">

            {/* টপ সেকশন: কোটেশন (ইমেজ অনুযায়ী) */}
            <div className="bg-gray-700 py-16 text-center">
                <h3 className="text-4xl font-serif italic text-white/90">
                    "সীমানা পেরিয়ে কেনাকাটা করি"
                </h3>
            </div>

            {/* মেইন ফুটার কন্টেন্ট */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                    {/* কলাম ১: লোগো ও সোশ্যাল মিডিয়া */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <div className="w-32">
                            {/* লোগোকে সাদা করার জন্য invert ক্লাস ব্যবহার করা হয়েছে */}
                            <img src={logo} alt="logo" className="w-full h-auto " />
                        </div>
                        <p className="text-gray-400">"সীমানা পেরিয়ে কেনাকাটা করি"</p>
                        <div className="flex space-x-4 text-xl">
                            <a href="#" target="_blank" className="hover:text-red-500 transition"><FaFacebookF /></a>
                            <a href="#" target="_blank" className="hover:text-red-500 transition"><FaTwitter /></a>
                            <a href="#" target="_blank" className="hover:text-red-500 transition"><FaInstagram /></a>
                            <a href="#" target="_blank" className="hover:text-red-500 transition"><FaYoutube /></a>
                        </div>
                    </div>



                    {/* কলাম ৩: সাহায্য এবং আইনি তথ্য */}
                    <div className="space-y-3">
                        <h4 className="text-lg font-bold mb-3 text-red-400">সাহায্য</h4>
                        <Link
                            to="/about"
                            className="block text-sm text-gray-400 hover:text-white transition"
                        >
                            আমাদের সম্পর্কে
                        </Link>
                        {simpleLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block text-sm text-gray-400 hover:text-white transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="block text-sm text-gray-400 hover:text-white transition"
                        >
                            যোগাযোগ করুন
                        </Link>
                    </div>



                </div>

                {/* কপিরাইট */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">

                    <p>© {new Date().getFullYear()} - Develop by <a href="https://www.facebook.com/rohanmohammad404" className="text-primary">{"</> "}Rohan mohammad</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;