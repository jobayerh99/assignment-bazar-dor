"use client";

import { GiShoppingBag } from "react-icons/gi";

const LoadingPage = () => {
    return (
        <main className="flex min-h-[calc(100vh-100px)] items-center justify-center overflow-hidden bg-[#F0F6F0] px-4">

            <div className="relative flex w-full max-w-md flex-col items-center justify-center py-16 text-center">

                {/* Background Decoration */}
                <div className="absolute left-5 top-10 h-24 w-24 rounded-full bg-[#05893E]/5 blur-2xl" />
                <div className="absolute bottom-10 right-5 h-28 w-28 rounded-full bg-[#05893E]/5 blur-2xl" />

                {/* Loading Animation */}
                <div className="relative flex h-40 w-40 items-center justify-center">

                    {/* Outer Spinner */}
                    <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#DCEBDD] border-t-[#05893E]" />

                    {/* Inner Circle */}
                    <div className="absolute inset-3 rounded-full border border-dashed border-[#05893E]/20" />

                    {/* Shopping Bag */}
                    <div className="flex h-24 w-24 animate-pulse items-center justify-center rounded-3xl bg-white text-[#05893E] shadow-lg shadow-[#05893E]/10">
                        <GiShoppingBag className="text-6xl" />
                    </div>

                    {/* Decorative Dots */}
                    <span className="absolute right-1 top-5 h-3 w-3 animate-pulse rounded-full bg-[#05893E]" />
                    <span className="absolute bottom-3 left-2 h-2.5 w-2.5 animate-pulse rounded-full bg-[#05893E]/40" />

                </div>

                {/* Loading Text */}
                <div className="relative mt-9">

                    <h2 className="text-xl font-black tracking-tight text-[#17251B] sm:text-2xl">
                        একটু অপেক্ষা করুন
                    </h2>

                    <p className="mt-2 text-sm text-[#758078]">
                        আপনার জন্য সেরা অভিজ্ঞতা প্রস্তুত করা হচ্ছে
                    </p>

                    {/* Animated Loading Dots */}
                    <div className="mt-6 flex items-center justify-center gap-2">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#05893E] [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#05893E] [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#05893E]" />
                    </div>

                </div>

                {/* Brand */}
                <div className="mt-10 flex items-center gap-2 text-sm font-extrabold tracking-wide text-[#05893E]">
                    <GiShoppingBag size={20} />
                    BazarDor
                </div>

            </div>

        </main>
    );
};

export default LoadingPage;