"use client";

import Link from "next/link";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";
import { GiShoppingBag } from "react-icons/gi";

const NotFound = () => {
    return (
        <main className="flex min-h-[calc(100vh-100px)] items-center justify-center overflow-hidden bg-[#F0F6F0] px-4 py-12 sm:px-6">

            <div className="relative mx-auto w-full max-w-2xl text-center">

                {/* Background Decoration */}
                <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#05893E]/5 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[#05893E]/5 blur-3xl" />

                {/* 404 Illustration */}
                <div className="relative mx-auto mb-6 flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64">

                    <div className="absolute inset-0 rounded-full border-[12px] border-[#05893E]/5" />

                    <div className="absolute inset-5 rounded-full border-2 border-dashed border-[#05893E]/20" />

                    <div className="relative flex flex-col items-center">

                        <span className="text-7xl font-black tracking-tighter text-[#05893E] sm:text-8xl">
                            404
                        </span>

                        <div className="-mt-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0F1E5] text-[#05893E] shadow-sm sm:h-14 sm:w-14">
                            <GiShoppingBag className="text-3xl sm:text-4xl" />
                        </div>

                    </div>

                    {/* Decorative Dots */}
                    <span className="absolute right-5 top-8 h-3 w-3 rounded-full bg-[#05893E]/30" />
                    <span className="absolute bottom-8 left-5 h-4 w-4 rounded-full bg-[#05893E]/20" />
                    <span className="absolute right-0 top-1/2 h-2 w-2 rounded-full bg-[#05893E]/40" />

                </div>

                {/* Error Content */}
                <div className="relative">

                    <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E9D9] bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#05893E]">
                        <span className="h-2 w-2 rounded-full bg-[#05893E]" />
                        Page Not Found
                    </span>

                    <h1 className="mt-6 text-2xl font-black tracking-tight text-[#17251B] sm:text-4xl">
                        দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি।
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#758078] sm:text-base">
                        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে,
                        মুছে ফেলা হয়েছে অথবা ঠিকানাটি ভুল হয়েছে।
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                        <Link
                            href="/"
                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#05893E] px-7 text-sm font-bold text-white shadow-md shadow-[#05893E]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#047331] sm:w-auto"
                        >
                            <FiHome size={18} />
                            হোমপেজে ফিরে যান
                        </Link>

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#DCE7DD] bg-white px-7 text-sm font-bold text-[#26352A] transition duration-300 hover:-translate-y-0.5 hover:border-[#05893E] hover:text-[#05893E] sm:w-auto"
                        >
                            <FiArrowLeft size={18} />
                            আগের পেজে ফিরে যান
                        </button>

                    </div>

                    {/* Footer Note */}
                    <div className="mt-12 border-t border-[#DCE7DD] pt-6">
                        <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#05893E]">
                            <GiShoppingBag size={21} />
                            BazarDor
                        </div>

                        <p className="mt-2 text-xs text-[#8A948C]">
                            আপনার প্রতিদিনের বাজার, এখন আরও সহজ।
                        </p>
                    </div>

                </div>

            </div>
        </main>
    );
};

export default NotFound;