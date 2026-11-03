
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { FiUser, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const UpdateInformationPage = () => {
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateProfile = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") ?? "").trim();

        if (!name) {
            toast.error("আপনার নাম লিখুন।");
            return;
        }

        if (name === user?.name) {
            toast.error("আপনার নাম আগের মতোই আছে।");
            return;
        }

        setIsUpdating(true);

        try {
            const { error } = await authClient.updateUser({
                name,
            });

            if (error) {
                toast.error(
                    error.message || "প্রোফাইল আপডেট করা যায়নি।"
                );
                return;
            }

            toast.success("আপনার তথ্য সফলভাবে হালনাগাদ হয়েছে!");

            router.push("/profile");
            router.refresh();
        } catch {
            toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsUpdating(false);
        }
    };

    if (!user) {
        return (
            <main className="flex min-h-[calc(100vh-100px)] items-center justify-center bg-[#F0F6F0]">
                <span className="loading loading-spinner loading-lg text-[#05893E]" />
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-100px)] bg-[#F0F6F0] px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto w-full max-w-3xl">

                {/* Page Heading */}
                <header className="mb-6 sm:mb-8">
                    <Link
                        href="/profile"
                        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#05893E] transition hover:text-[#047331]"
                    >
                        <FiArrowLeft size={17} />
                        প্রোফাইলে ফিরে যান
                    </Link>

                    <h1 className="text-2xl font-black tracking-tight text-[#17251B] sm:text-3xl">
                        তথ্য হালনাগাদ করুন
                    </h1>

                    <p className="mt-1.5 text-sm text-[#758078] sm:text-base">
                        আপনার ব্যক্তিগত তথ্য পরিবর্তন করুন।
                    </p>
                </header>

                {/* Update Information Card */}
                <section className="rounded-xl border border-[#E6ECE6] bg-white/90 p-4 shadow-sm sm:p-6">

                    <div className="mb-5 border-b border-[#EEF1EE] pb-3">
                        <h2 className="text-sm font-extrabold text-[#26352A] sm:text-base">
                            ব্যক্তিগত তথ্য
                        </h2>

                        <p className="mt-1 text-xs text-[#8A948C] sm:text-sm">
                            নিচের ফর্ম থেকে আপনার নাম পরিবর্তন করতে পারবেন।
                        </p>
                    </div>

                    <form
                        onSubmit={handleUpdateProfile}
                        className="space-y-4"
                    >
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-bold text-[#47534A]"
                            >
                                নাম
                            </label>

                            <div className="relative">
                                <FiUser
                                    size={17}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA59C]"
                                />

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={user.name || ""}
                                    autoComplete="name"
                                    placeholder="আপনার নাম লিখুন"
                                    required
                                    maxLength={100}
                                    className="input h-11 w-full rounded-lg border-[#E3E9E3] bg-[#FAFCFA] pl-10 pr-4 text-sm text-[#26352A] outline-none transition placeholder:text-[#A2AAA4] focus:border-[#05893E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#05893E]/10"
                                />
                            </div>
                        </div>

                        {/* Update Button */}
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="btn h-11 min-h-11 w-full rounded-lg border-0 bg-[#05893E] text-sm font-extrabold text-white shadow-sm transition hover:bg-[#047331] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isUpdating ? (
                                <>
                                    <span className="loading loading-spinner loading-sm" />
                                    আপডেট হচ্ছে...
                                </>
                            ) : (
                                "তথ্য হালনাগাদ করুন"
                            )}
                        </button>
                    </form>
                </section>

                <p className="mt-5 text-center text-xs text-[#8A948C]">
                    আপনার ব্যক্তিগত তথ্য নিরাপদে রাখুন।
                </p>
            </div>
        </main>
    );
};

export default UpdateInformationPage;
