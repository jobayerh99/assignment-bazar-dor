"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLogOut, FiUser, FiEdit3 } from "react-icons/fi";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [isSigningOut, setIsSigningOut] = useState(false);

    // Sign Out
    const handleSignOut = async () => {
        if (isSigningOut) return;

        setIsSigningOut(true);

        try {
            const result = await authClient.signOut();

            if (result.error) {
                toast.error(
                    result.error.message || "সাইন আউট করা যায়নি।"
                );
                setIsSigningOut(false);
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে!", {
                duration: 2000,
            });

            setTimeout(() => {
                router.replace("/");
                router.refresh();
            }, 2000);

        } catch (error) {
            console.error("Sign out failed:", error);
            toast.error("সাইন আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            setIsSigningOut(false);
        }
    };

    // Loading State
    if (isPending) {
        return (
            <main className="flex min-h-[calc(100vh-100px)] items-center justify-center bg-[#F0F6F0]">
                <span className="loading loading-spinner loading-lg text-[#05893E]" />
            </main>
        );
    }

    // Unauthenticated User
    if (!user) {
        return (
            <main className="flex min-h-[calc(100vh-100px)] items-center justify-center bg-[#F0F6F0] px-4">
                <div className="w-full max-w-md rounded-xl border border-[#E6ECE6] bg-white p-6 text-center shadow-sm">
                    <FiUser className="mx-auto text-4xl text-[#05893E]" />

                    <h2 className="mt-4 text-lg font-bold text-[#26352A]">
                        আপনি সাইন ইন করেননি
                    </h2>

                    <p className="mt-2 text-sm text-[#758078]">
                        প্রোফাইল দেখতে প্রথমে আপনার অ্যাকাউন্টে সাইন ইন করুন।
                    </p>

                    <Link
                        href="/sign-in"
                        className="btn mt-5 h-11 min-h-11 w-full rounded-lg border-0 bg-[#05893E] text-white hover:bg-[#047331]"
                    >
                        সাইন ইন করুন
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-100px)] bg-[#F0F6F0] px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto w-full max-w-3xl">

                {/* Page Heading */}
                <header className="mb-6 sm:mb-8">
                    <h1 className="text-2xl font-black tracking-tight text-[#17251B] sm:text-3xl">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1.5 text-sm text-[#758078] sm:text-base">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </header>

                {/* User Information Card */}
                <section className="flex flex-col gap-4 rounded-xl border border-[#E6ECE6] bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">

                    {/* Profile Image and Information */}
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#E5F3E8] sm:h-14 sm:w-14">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "প্রোফাইল ছবি"}
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-[#05893E]">
                                    <FiUser size={25} />
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="truncate text-sm font-extrabold text-[#26352A] sm:text-base">
                                {user.name || "ব্যবহারকারী"}
                            </h2>

                            <p className="mt-1 break-all text-xs text-[#8A948C] sm:text-sm">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Profile Actions */}
                    <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">

                        {/* Update Information */}
                        <Link
                            href="/profile/update-information"
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#05893E] px-4 text-sm font-bold text-white transition hover:bg-[#047331] sm:w-auto"
                        >
                            <FiEdit3 size={16} />
                            তথ্য হালনাগাদ করুন
                        </Link>

                        {/* Sign Out */}
                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2CACA] px-4 text-sm font-bold text-[#D94A4A] transition hover:bg-[#FFF1F1] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            <FiLogOut size={16} />

                            {isSigningOut
                                ? "সাইন আউট হচ্ছে..."
                                : "সাইন আউট"}
                        </button>
                    </div>
                </section>

                {/* Account Information */}
                <section className="mt-5 rounded-xl border border-[#E6ECE6] bg-white/90 p-4 shadow-sm sm:p-6">
                    <div className="mb-5 border-b border-[#EEF1EE] pb-3">
                        <h2 className="text-sm font-extrabold text-[#26352A] sm:text-base">
                            অ্যাকাউন্টের তথ্য
                        </h2>

                        <p className="mt-1 text-xs text-[#8A948C] sm:text-sm">
                            আপনার অ্যাকাউন্টের বর্তমান তথ্য।
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-medium text-[#8A948C]">
                                নাম
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#26352A]">
                                {user.name || "নাম দেওয়া হয়নি"}
                            </p>
                        </div>

                        <div className="border-t border-[#EEF1EE] pt-4">
                            <p className="text-xs font-medium text-[#8A948C]">
                                ইমেইল ঠিকানা
                            </p>

                            <p className="mt-1 break-all text-sm font-semibold text-[#26352A]">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer Note */}
                <p className="mt-5 text-center text-xs text-[#8A948C]">
                    আপনার ব্যক্তিগত তথ্য নিরাপদে রাখুন।
                </p>
            </div>
        </main>
    );
};

export default ProfilePage;