
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiCheckCircle, FiLock, FiMail, FiUser } from "react-icons/fi";

const SignUpPage = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(
        null
    );
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"error" | "success">("error");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const acceptedTerms = formData.get("terms") === "on";

        if (!name || !email || !password) {
            setMessage("সবগুলো ঘর পূরণ করুন।");
            setMessageType("error");
            return;
        }

        if (password.length < 8) {
            setMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            setMessageType("error");
            return;
        }


        setIsLoading(true);

        try {
            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                setMessage(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
                setMessageType("error");
                return;
            }

            setMessageType("success");
            setMessage("অ্যাকাউন্ট তৈরি হয়েছে! হোমপেজে নেওয়া হচ্ছে...");
            router.push("/");
            router.refresh();
        } catch {
            setMessage("একটি সমস্যা হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।");
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        setMessage("");
        setSocialLoading(provider);

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                setMessage(error.message || `${provider} দিয়ে সাইন ইন করা যায়নি।`);
                setMessageType("error");
                setSocialLoading(null);
            }
            // On success, Better Auth handles the social redirect.
        } catch {
            setMessage("সোশ্যাল সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
            setMessageType("error");
            setSocialLoading(null);
        }
    };

    const handleGithubSignIn = async () => {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/"
            })
        }

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-green-50/80 via-white to-white px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
                {/* Heading */}
                <div className="mb-7 w-full max-w-lg text-center sm:mb-9">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#05893E]/10 text-[#05893E] shadow-sm">
                        <FiCheckCircle size={27} />
                    </div>

                    <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
                        বিনা খরচে সাইন আপ করে নিত্যপ্রয়োজনীয় পণ্যের বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                {/* Signup Card */}
                <section className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-green-900/5 sm:rounded-3xl sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-lg font-extrabold text-slate-900">
                            নতুন অ্যাকাউন্ট
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            আপনার তথ্য দিয়ে নিচের ফর্মটি পূরণ করুন।
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-bold text-slate-700"
                            >
                                আপনার নাম
                            </label>

                            <div className="relative">
                                <FiUser
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="যেমন: রহিম উদ্দিন"
                                    required
                                    maxLength={100}
                                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#05893E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#05893E]/15"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-bold text-slate-700"
                            >
                                ইমেইল ঠিকানা
                            </label>

                            <div className="relative">
                                <FiMail
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    required
                                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#05893E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#05893E]/15"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-bold text-slate-700"
                            >
                                পাসওয়ার্ড
                            </label>

                            <div className="relative">
                                <FiLock
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                                    minLength={8}
                                    required
                                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#05893E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#05893E]/15"
                                />
                            </div>

                            <p className="text-xs leading-5 text-slate-500">
                                নিরাপদ পাসওয়ার্ড ব্যবহার করুন।
                            </p>
                        </div>

                        
                        {/* Feedback */}
                        {message && (
                            <div
                                role="alert"
                                aria-live="polite"
                                className={`rounded-xl border px-4 py-3 text-sm leading-6 ${messageType === "success"
                                        ? "border-green-200 bg-green-50 text-green-800"
                                        : "border-red-200 bg-red-50 text-red-700"
                                    }`}
                            >
                                {message}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading || socialLoading !== null}
                            className="btn h-12 min-h-12 w-full rounded-xl border-0 bg-[#05893E] text-sm font-extrabold text-white shadow-md shadow-green-900/10 transition hover:bg-[#047331] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm" />
                                    অ্যাকাউন্ট তৈরি হচ্ছে...
                                </>
                            ) : (
                                "অ্যাকাউন্ট তৈরি করুন →"
                            )}
                        </button>

                        {/* Divider */}
                        <div className="divider my-5 text-xs font-medium text-slate-400">
                            অথবা
                        </div>

                        {/* Social Sign In */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => handleSocialSignIn("google")}
                                disabled={isLoading || socialLoading !== null}
                                className="btn h-12 min-h-12 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-none transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60 sm:text-sm"
                            >
                                {socialLoading === "google" ? (
                                    <span className="loading loading-spinner loading-sm" />
                                ) : (
                                    <FcGoogle size={21} />
                                )}
                                Google
                            </button>

                            <button
                                type="button"
                                onClick={handleGithubSignIn}
                                disabled={isLoading || socialLoading !== null}
                                className="btn h-12 min-h-12 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-none transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60 sm:text-sm"
                            >
                                {socialLoading === "github" ? (
                                    <span className="loading loading-spinner loading-sm" />
                                ) : (
                                    <FaGithub size={20} />
                                )}
                                GitHub
                            </button>
                        </div>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-7 border-t border-slate-100 pt-5">
                        <p className="text-center text-sm text-slate-500">
                            ইতিমধ্যে অ্যাকাউন্ট রয়েছে?{" "}
                            <Link
                                href="/signin"
                                className="font-extrabold text-[#05893E] underline decoration-[#05893E]/30 underline-offset-4 transition hover:text-[#047331] hover:decoration-[#047331]"
                            >
                                সাইন ইন করুন
                            </Link>
                        </p>
                    </div>
                </section>

                <p className="mt-6 max-w-sm text-center text-xs leading-6 text-slate-400">
                    বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন সহজেই।
                </p>
            </div>
        </main>
    );
};

export default SignUpPage;
