import React, { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

const FlashSaleAnimation = ({ discountPercentage }) => {
  const [showText, setShowText] = useState(false); // টেক্সট অ্যানিমেশন toggle

  // প্রতি 2 সেকেন্ডে টেক্সট দেখানো/লুকানো
  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(prev => !prev);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  // Text animation
  const textProps = useSpring({
    opacity: showText ? 1 : 0,
    transform: showText ? 'translateY(0px)' : 'translateY(-10px)',
    config: { tension: 200, friction: 15 },
  });

  return (
    <div className="relative w-15 h-15 mx-auto mt-10">
      {/* Static Circle */}
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-xl">
        {/* Animated Text */}
        <animated.span
          style={textProps}
          className="text-indigo-900 font-hind-semibold text-xl text-center  leading-4"
        >
          {discountPercentage}% OFF
        </animated.span>
      </div>
    </div>
  );
};

export default FlashSaleAnimation;
