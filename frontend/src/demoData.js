export const navLinks = [
    { name: "হোম", path: "/" },
    { name: "শপ", path: "/shop" },
    { name: "রিভিউ", path: "/review" },
    { name: "অর্ডারস", path: "/orders" },
];
//   banner 
// 1. slides ডেটা পরিবর্তন: discountPercentage যোগ করা হয়েছে
export const slides = [
    {
        id: 1,
        tag: "#বড় ফ্যাশন কালেকশন",
        title: "নতুন স্টাইল!",
        subtitle: "সেরা ডিল সহ",
        description: "এই সিজনের ট্রেন্ডিং পোশাকগুলি দেখুন।",
        image: "/images/dress.png",
        alt: "Model wearing a polo shirt with winter jackets and folded clothes",
        discountPercentage: 10, // ডিসকাউন্ট আছে
    },
    {
        id: 2,
        tag: "#সময়ের সেরা ডিল",
        title: "শীতকালীন সংগ্রহ!",
        subtitle: "৫০% পর্যন্ত ছাড়!",
        description: "বিশেষ মূল্য, সীমিত স্টক",
        image: "/images/dress2.png",
        alt: "A single, high-quality image of a winter collection jacket",
        discountPercentage: 50, // ডিসকাউন্ট আছে
    },
    {
        id: 3,
        tag: "#ফ্রি ডেলিভারি অফার",
        title: "নতুন জুতো!",
        subtitle: "সীমিত সময়ের জন্য",
        description: "প্রিমিয়াম কোয়ালিটির জুতো কিনুন।",
        image: "/images/dress3.png",
        alt: "A single, high-quality image of a winter collection jacket",
        discountPercentage: null, // ডিসকাউন্ট নেই
    },
    {
        id: 4,
        tag: "#গ্রীষ্মের প্রস্তুতি",
        title: "টি-শার্ট ডিল",
        subtitle: "সেরা দামে কিনুন!",
        description: "ফ্যাশনেবল টি-শার্ট কালেকশন।",
        image: "/images/dress4.png",
        alt: "A single, high-quality image of a winter collection jacket",
        discountPercentage: 25, // ডিসকাউন্ট আছে

    }
];


// ব্যানার স্লাইডার কম্পোনেন্ট


// categoryData.js



// categoryItems.js (জুতা ক্যাটাগরি যোগ করা হলো)

export const categoryItems = [
    {
        id: 1,
        nameBn: "টি-শার্ট",
        slug: "t-shirt",
        icon: "FaTshirt",
    },
    {
        id: 2,
        nameBn: "শার্ট",
        slug: "shirt",
        icon: "GiShirtButton",
    },
    {
        id: 3,
        nameBn: "প্যান্ট",
        slug: "pant",
        icon: "GiTrousers",
    },
    // **জিন্স ক্যাটাগরি এখানে অনুপস্থিত, ধরে নিচ্ছি আপনি এটি বাদ দিয়েছেন**
    {
        id: 4, // ID সিকোয়েন্স ঠিক করা হলো
        nameBn: "খেলা",
        slug: "sports",
        icon: "GiCricketBat",
    },
    {
        id: 5, // ID সিকোয়েন্স ঠিক করা হলো
        nameBn: "বাচ্চাদের পোশাক",
        slug: "kids-dress",
        icon: "FaTshirt",
    },
    {
        id: 6, // ID সিকোয়েন্স ঠিক করা হলো
        nameBn: "জুতা", // পরিবর্তন: ড্রেসের বদলে জুতা
        slug: "shoes",
        icon: "FaShoePrints", // নতুন আইকন: FaShoePrints
    },
];

// flashSaleData.js

export const DEFAULT_SALE_DAYS = 1;
export const flashSaleProducts = [
    {
        id: 1,
        name: "প্রিমিয়াম মেনস জ্যাকেট",
        price: 2550, // Rs. 2,550
        oldPrice: 3625, // Rs. 3,625
        imageUrl: "/images/dress.png", // Jacket Image
        instock: false, // স্টকে নেই
        flashSale: false, // ফ্ল্যাশ সেলে দেখাবে না
        categoryID: 1,
        rating: 3.5 // নতুন রেটিং
    },
    {
        id: 2,
        name: "গ্রীষ্মকালীন গ্রে হ্যাট",
        price: 990,
        oldPrice: 1500,
        imageUrl: "/images/dress2.png", // Hat Image
        instock: true, // স্টকে আছে
        flashSale: true,// ফ্ল্যাশ সেলে দেখাবে
        categoryID: 1,
        rating: 4.8 // নতুন রেটিং
    },
    {
        id: 3,
        name: "ক্যামেরা শোল্ডার ব্যাগ",
        price: 2500,
        oldPrice: 4250,
        imageUrl: "/images/dress3.png", // Camera Bag Image
        instock: false, // স্টকে নেই
        flashSale: true, // ফ্ল্যাশ সেলে দেখাবে, কিন্তু প্রোডাক্ট কার্ডে 'Out of Stock' দেখাতে পারে
        categoryID: 1,
        rating: 4.2 // নতুন রেটিং
    },
    {
        id: 4,
        name: "প্লাটফর্ম হিল জুতো",
        price: 2700,
        oldPrice: 5800,
        imageUrl: "/images/dress.png", // Heels Image
        instock: true,
        flashSale: true,
        categoryID: 1,
        rating: 5.0 // নতুন রেটিং
    },
    {
        id: 5,
        name: "প্রিমিয়াম লেদার ওয়ালেট",
        price: 890,
        oldPrice: 1250,
        imageUrl: "/images/dress2.png", // Wallet/Bag Image Example
        instock: true,
        flashSale: false, // ফ্ল্যাশ সেলে দেখাবে না
        categoryID: 1,
        rating: 4.0 // নতুন রেটিং
    },
    {
        id: 6,
        name: "ডিজিটাল স্পোর্টস ওয়াচ",
        price: 1550,
        oldPrice: 2000,
        imageUrl: "/images/dress3.png", // Watch Image Example
        instock: true,
        flashSale: true,
        categoryID: 1,
        rating: 4.6 // নতুন রেটিং
    },
    {
        id: 7,
        name: "ডিজিটাল স্পোর্টস ওয়াচ",
        price: 1550,
        oldPrice: 2000,
        imageUrl: "/images/dress.png", // Watch Image Example
        instock: true,
        flashSale: false, // ফ্ল্যাশ সেলে দেখাবে না
        categoryID: 1,
        rating: 3.9 // নতুন রেটিং
    },
    {
        id: 8,
        name: "ডিজিটাল স্পোর্টস ওয়াচ",
        price: 1550,
        oldPrice: 2000,
        imageUrl: "/images/dress.png", // Watch Image Example
        instock: true,
        flashSale: true,
        categoryID: 1,
        rating: 4.7 // নতুন রেটিং
    },
];
// details  
// demoData - add this alongside your flashSaleProducts export

export const flashSaleProductDetails = [
  {
    productId: 1,
    name: "প্রিমিয়াম মেনস জ্যাকেট",
    title: "Warm & Stylish Premium Men's Jacket",
    description: "উচ্চমানের কটন-লেয়ারড জ্যাকেট, সিলভার জিপার ও স্টিচড পকেটসহ। সারাবছর ব্যবহার উপযোগী।",
    images: ["/images/dress.png"],
    rating: 3.5,
    toCartQuantity: 1,
    reviews: [
      { id: "r1-1", name: "রাহাত", rating: 4, comment: "ভালো মান, কিন্তু একটু ছোট সাইজ।", date: 1698000000000 }
    ]
  },
  {
    productId: 2,
    name: "গ্রীষ্মকালীন গ্রে হ্যাট",
    title: "Lightweight Grey Summer Hat",
    description: "বিবিধ আউটডোর অ্যাক্টিভিটিতে ব্যবহারযোগ্য হালকা ও আরামদায়ক হ্যাট।",
    images: ["/images/dress2.png"],
    rating: 4.8,
    toCartQuantity: 1,
    reviews: [
      { id: "r2-1", name: "সাবিনা", rating: 5, comment: "ডিজাইন খুব সুন্দর, মানও চমৎকার।", date: 1698100000000 }
    ]
  },
  {
    productId: 3,
    name: "ক্যামেরা শোল্ডার ব্যাগ",
    title: "Durable Camera Shoulder Bag",
    description: "ক্যামেরা ও লেন্স রাখার জন্য প্যাডেড কম্পার্টমেন্ট; টেকসই জিপার।",
    images: ["/images/dress3.png"],
    rating: 4.2,
    toCartQuantity: 1,
    reviews: [
      { id: "r3-1", name: "তানভীর", rating: 4, comment: "প্রোডাক্ট ভাল, তবে স্ট্র্যাপ একটু নরম হলে ভালো হতো।", date: 1698200000000 }
    ]
  },
  {
    productId: 4,
    name: "প্লাটফর্ম হিল জুতো",
    title: "Trendy Platform Heel Shoes",
    description: "আধুনিক প্ল্যাটফর্ম হিল, আরামদায়ক ইনসোল ও স্টাইলিশ ফিনিশিং।",
    images: ["/images/dress.png"],
    rating: 5.0,
    toCartQuantity: 1,
    reviews: [
      { id: "r4-1", name: "মোহনা", rating: 5, comment: "বহুদিন পরে এমন আরামদায়ক হিল পেলাম।", date: 1698300000000 }
    ]
  },
  {
    productId: 5,
    name: "প্রিমিয়াম লেদার ওয়ালেট",
    title: "Premium Leather Wallet",
    description: "কমপ্যাক্ট ডিজাইন, মাল্টি কার্ড স্লট ও টেকসই লেদার।",
    images: ["/images/dress2.png"],
    rating: 4.0,
    toCartQuantity: 1,
    reviews: [
      { id: "r5-1", name: "আনিকা", rating: 4, comment: "মান ভালো, কার্ড পকেট যথেষ্ট আছে।", date: 1698400000000 }
    ]
  },
  {
    productId: 6,
    name: "ডিজিটাল স্পোর্টস ওয়াচ",
    title: "Digital Sports Watch",
    description: "ওয়াটারপ্রুফ ডিজাইন, স্ট্যাপ-অ্যাক্টিভিটি ট্র্যাকার ও লং ব্যাটারি লাইফ।",
    images: ["/images/dress3.png"],
    rating: 4.6,
    toCartQuantity: 1,
    reviews: [
      { id: "r6-1", name: "রিয়াদ", rating: 5, comment: "ব্যাটারি লাইফ দুর্দান্ত।", date: 1698500000000 }
    ]
  },
  {
    productId: 7,
    name: "ডিজিটাল স্পোর্টস ওয়াচ (ভেরি)",
    title: "Digital Sports Watch - Variant",
    description: "একই স্পেসিফিকেশন, ভিন্ন রঙ ও ফিনিশিং।",
    images: ["/images/dress.png"],
    rating: 3.9,
    toCartQuantity: 1,
    reviews: []
  },
  {
    productId: 8,
    name: "ডিজিটাল স্পোর্টস ওয়াচ (প্রিমিয়াম)",
    title: "Digital Sports Watch - Premium",
    description: "অ্যাক্টিভিটি, রিং নোটিফিকেশন ও উন্নত ফিচার সহ প্রিমিয়াম মডেল।",
    images: ["/images/dress.png"],
    rating: 4.7,
    toCartQuantity: 1,
    reviews: [
      { id: "r8-1", name: "সুমন", rating: 5, comment: "প্রিমিয়াম ফিল, সব ফিচার কাজ করে।", date: 1698600000000 }
    ]
  }
];

export const formatCurrency = (amount) => {
    return `Tk ${amount.toLocaleString('en-IN')}`;
};


// footer 

