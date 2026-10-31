import { getBanglaDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Hero = () => {

    return (
        <section className="mx-auto w-full px-3 pt-2 max-w-6xl mx-auto">
            <div className="relative flex min-h-[165px] items-center justify-between overflow-hidden rounded-2xl border border-[#e2eae2] bg-[#f8fbf8] px-3 py-4 sm:px-5 md:min-h-[190px] md:px-8">
                {/* Left Content */}
                <div className="relative z-10 max-w-[72%] sm:max-w-[65%] md:max-w-[70%]">
                    {/* Date */}
                    <p className="mb-2 inline-flex rounded-full bg-[#e1f3e6] px-2.5 py-1 text-[9px] font-medium text-[#21834a] sm:text-[11px]">
                        {getBanglaDate()}
                    </p>

                    {/* Heading */}
                    <h1 className="text-xl font-extrabold leading-tight tracking-tight text-[#27332b] sm:text-2xl md:text-3xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Description */}
                    <p className="mt-2 max-w-[440px] text-[9px] leading-relaxed text-[#737b74] sm:text-xs md:mt-3 md:text-sm">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক নির্ভরযোগ্য, দ্রুত, সঠিক-সর্বশেষ
                        বাজারদরের আপডেট প্রতিদিন এক জায়গায়!
                    </p>

                    {/* CTA Button */}
                    <Link
                        href="/"
                        className="mt-3 inline-flex items-center justify-center rounded-md bg-[#07883e] px-3 py-1.5 text-[10px] font-semibold text-white shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#066e33] sm:mt-4 sm:px-4 sm:py-2 sm:text-xs"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>

                {/* Right Illustration */}
                <div className="absolute bottom-2 right-2 flex h-[125px] w-[130px] items-end justify-center sm:bottom-1 sm:right-5 sm:h-[155px] sm:w-[165px] md:right-8 md:h-[170px] md:w-[190px]">
                    <Image
                        src="/bazar-hero.png"
                        alt="ফল ও সবজির ঝুড়ি"
                        width={190}
                        height={170}
                        priority
                        className="h-full w-full object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;