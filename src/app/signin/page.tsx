
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiLock, FiMail, FiLogIn } from "react-icons/fi";

const SignInPage = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<
        "google" | "github" | null
    >(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"error" | "success">("error");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        const formData = new FormData(e.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        if (!email || !password) {
            setMessage("ইমেইল ও পাসওয়ার্ড লিখুন।");
            setMessageType("error");
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                setMessage(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
                setMessageType("error");
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setMessage("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
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
                setMessage(error.message || "সোশ্যাল সাইন ইন করা যায়নি।");
                setMessageType("error");
                setSocialLoading(null);
            }
        } catch {
            setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            setMessageType("error");
            setSocialLoading(null);
        }
    };

    return (
        <main className="min-h-[calc(100vh-100px)] bg-gradient-to-b from-green-50/80 via-white to-white px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
                {/* Heading */}
                <header className="mb-7 w-full max-w-lg text-center sm:mb-9">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#05893E]/10 text-[#05893E] shadow-sm">
                        <FiLogIn size={27} />
                    </div>

                    <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                        সাইন ইন করুন
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#1D271F] sm:text-base">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।
                    </p>
                </header>

                {/* Sign In Card */}
                <section className="w-full max-w-md rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-xl shadow-indigo-500/5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-lg font-extrabold text-slate-900">
                            আপনার অ্যাকাউন্টে প্রবেশ করুন
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            আপনার ইমেইল ও পাসওয়ার্ড ব্যবহার করুন।
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#05893E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#05893E]/15"
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
                                    autoComplete="current-password"
                                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                                    required
                                    className="input h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#05893E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#05893E]/15"
                                />
                            </div>
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
                                    সাইন ইন হচ্ছে...
                                </>
                            ) : (
                                "সাইন ইন করুন →"
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
                                className="btn h-12 min-h-12 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-none transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60"
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
                                onClick={() => handleSocialSignIn("github")}
                                disabled={isLoading || socialLoading !== null}
                                className="btn h-12 min-h-12 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-none transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60"
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

                    {/* Sign Up Link */}
                    <div className="mt-7 border-t border-slate-100 pt-5">
                        <p className="text-center text-sm text-slate-500">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link
                                href="/signup"
                                className="font-extrabold text-[#05893E] underline decoration-[#05893E]/30 underline-offset-4 transition hover:text-[#047331] hover:decoration-[#047331]"
                            >
                                নতুন অ্যাকাউন্ট তৈরি করুন
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

export default SignInPage;
