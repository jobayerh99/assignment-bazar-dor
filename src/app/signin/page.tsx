'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SignInPage = () => {

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValue = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            ...formValue,
            email: formValue.email as string,
            password: formValue.password as string,
            callbackURL: "/"
        });

        if (router) {
            router.push("/")
        }

        // console.log(data, error);
    }

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        });
    };


    return (
        <div className='max-w-6xl mx-auto flex flex-col justify-center items-center'>
            {/* upper section text */}
            <div className='text-center p-4'>
                <h1 className='font-black text-black text-2xl'>সাইন ইন</h1>
                <p className='font-normal text-[#1D271F] text-xl'>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            </div>
            <div className="card w-full max-w-md bg-white/95 backdrop-blur-xl shadow-xl shadow-indigo-500/5 border border-slate-200/90 p-8 rounded-3xl relative overflow-hidden">


                {/* signup form */}
                <form className="space-y-4" onSubmit={handleSubmit}>


                    <div className="space-y-1.5">
                        <label className="block font-bold text-xs text-slate-700">ইমেইল</label>
                        <div className="relative">

                            <input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="input input-bordered w-full pl-10 rounded-xl text-sm border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 focus:outline-hidden"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block font-bold text-xs text-slate-700">পাসওয়ার্ড</label>
                        <div className="relative">

                            <input
                                name="password"
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                                className="input input-bordered w-full pl-10 rounded-xl text-sm border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 focus:outline-hidden"
                            />
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="btn bg-[#05893E]  text-white font-black w-full rounded-xl border-0 shadow-md text-sm mt-2 transition-all cursor-pointer"
                    >
                        সাইন ইন
                    </button>

                    {/* divider */}
                    <div className="flex w-full flex-col m-0 p-0">

                        <div className="divider">অথবা</div>

                    </div>
                    {/* social button */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="btn btn-outline border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 text-xs"
                        >
                            <span className="text-base"><FcGoogle /></span>
                            Google দিয়ে চালিয়ে যান
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 text-xs"
                        >
                            <span className="text-base"><FaGithub /></span>
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>
                    {/* Footer Link */}
                    <div>
                        <p className="text-center text-xs text-slate-500 mt-1 pt-1">
                            অ্যাকাউন্ট নেই?{' '}
                            <Link href="/signin" className="text-teal-600 hover:text-teal-700 font-bold underline ml-1">
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;