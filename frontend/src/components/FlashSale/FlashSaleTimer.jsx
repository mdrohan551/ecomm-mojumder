// FlashSaleTimer.jsx

import React, { useState, useEffect, useCallback } from 'react';

const END_TIME_KEY = 'flashSaleEndTime';

// ⭐ saleEndDate: একটি নির্দিষ্ট JavaScript Date অবজেক্ট বা timestamp নেবে ⭐
const FlashSaleTimer = ({ saleEndDate }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    const calculateEndTime = useCallback(() => {
        // আপনার ডেটাবেস থেকে আসা End Date এর Timestamp
        const serverEndTime = saleEndDate ? new Date(saleEndDate).getTime() : 0;
        
        // লোকাল স্টোরেজে সেভ করা শেষ সময়
        let storedEndTime = localStorage.getItem(END_TIME_KEY);

        if (serverEndTime > 0) {
            // যদি সার্ভার থেকে একটি বৈধ শেষের তারিখ আসে

            if (!storedEndTime || parseInt(storedEndTime) !== serverEndTime) {
                // যদি লোকাল স্টোরেজে কোনো টাইম সেভ না থাকে, অথবা
                // লোকাল স্টোরেজের টাইম সার্ভারের টাইমের সাথে না মেলে (মানে ডেটাবেসে পরিবর্তন হয়েছে)
                
                // নতুন সার্ভার টাইম সেভ করা হলো
                localStorage.setItem(END_TIME_KEY, serverEndTime);
                return serverEndTime;
            }

            // যদি লোকাল স্টোরেজের টাইম সার্ভারের টাইমের সাথে মিলে যায় (মানে রিফ্রেশ হয়েছে)
            return parseInt(storedEndTime);
        }

        // যদি কোনো বৈধ End Date না আসে
        if (storedEndTime) {
            localStorage.removeItem(END_TIME_KEY);
        }
        return 0;

    }, [saleEndDate]); // Dependency: saleEndDate

    useEffect(() => {
        const endTime = calculateEndTime();
        
        // endTime 0 হলে বা অতীত হলে আর টাইমার শুরু হবে না
        if (endTime <= Date.now()) {
            setTimeLeft(0);
            return;
        }

        const updateTimer = () => {
            const difference = endTime - Date.now();

            if (difference > 0) {
                setTimeLeft(difference);
            } else {
                setTimeLeft(0);
                localStorage.removeItem(END_TIME_KEY);
            }
        };

        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(timerInterval);
    }, [calculateEndTime]);

    // সময়কে দিন, ঘন্টা, মিনিট ও সেকেন্ডে রূপান্তর এবং দুটি ডিজিটে ফরম্যাট করা
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const formatTime = (time) => String(time).padStart(2, '0');

    if (timeLeft <= 0) {
        return <span className="text-red-500 font-bold">সময় শেষ!</span>;
    }

    return (
        <div className="flex items-center space-x-2 text-white font-bold text-lg">
            {/* দিন থাকলে শুধু তখনই তা দেখাবে */}
            {days > 0 && (
                <>
                    <span className="bg-red-600 px-2 py-1 rounded-md">{formatTime(days)}</span>
                    <span>:</span>
                </>
            )}
            <span className="bg-red-600 px-2 py-1 rounded-md">{formatTime(hours)}</span>
            <span>:</span>
            <span className="bg-red-600 px-2 py-1 rounded-md">{formatTime(minutes)}</span>
            <span>:</span>
            <span className="bg-red-600 px-2 py-1 rounded-md">{formatTime(seconds)}</span>
        </div>
    );
};

export default FlashSaleTimer;