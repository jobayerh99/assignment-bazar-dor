
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLogOut, FiUser, FiCheckCircle } from "react-icons/fi";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error">(
        "success"
    );

    const handleUpdateProfile = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") ?? "").trim();

        if (!name) {
            setMessage("আপনার নাম লিখুন।");
            setMessageType("error");
            return;
        }

        if (name === user?.name) {
            setMessage("আপনার নাম আগের মতোই আছে।");
            setMessageType("error");
            return;
        }

        setIsUpdating(true);

        try {
            const { error } = await authClient.updateUser({ name });

            if (error) {
                setMessage(error.message || "প্রোফাইল আপডেট করা যায়নি।");
                setMessageType("error");
                return;
            }

            setMessage("আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে।");
            setMessageType("success");
            router.refresh();
        } catch {
            setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            setMessageType("error");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSignOut = async () => {
        setIsSigningOut(true);
        setMessage("");

        try {
            const { error } = await authClient.signOut();

            if (error) {
                setMessage(error.message || "সাইন আউট করা যায়নি।");
                setMessageType("error");
                setIsSigningOut(false);
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setMessage("সাইন আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            setMessageType("error");
            setIsSigningOut(false);
        }
    };

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
                <section className="mb-5 flex flex-col gap-4 rounded-xl border border-[#E6ECE6] bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        {/* Profile Image */}
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#E5F3E8] sm:h-14 sm:w-14">
                            {user?.image ? (
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

                        {/* Name and Email */}
                        <div className="min-w-0 flex-1">
                            <h2 className="truncate text-sm font-extrabold text-[#26352A] sm:text-base">
                                {user?.name || "ব্যবহারকারী"}
                            </h2>

                            <p className="mt-1 break-all text-xs text-[#8A948C] sm:text-sm">
                                {user?.email || ""}
                            </p>
                        </div>
                    </div>

                    {/* Sign Out */}
                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2CACA] px-4 text-sm font-bold text-[#D94A4A] transition hover:bg-[#FFF1F1] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        <FiLogOut size={16} />
                        {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                    </button>
                </section>

                {/* Update Profile Card */}
                <section className="rounded-xl border border-[#E6ECE6] bg-white/90 p-4 shadow-sm sm:p-6">
                    <div className="mb-5 border-b border-[#EEF1EE] pb-3">
                        <h2 className="text-sm font-extrabold text-[#26352A] sm:text-base">
                            ব্যক্তিগত তথ্য
                        </h2>

                        <p className="mt-1 text-xs text-[#8A948C] sm:text-sm">
                            আপনার নাম পরিবর্তন করতে নিচের ফর্মটি ব্যবহার করুন।
                        </p>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-4">
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
                                    defaultValue={user?.name || ""}
                                    autoComplete="name"
                                    placeholder="আপনার নাম লিখুন"
                                    required
                                    maxLength={100}
                                    className="input h-11 w-full rounded-lg border-[#E3E9E3] bg-[#FAFCFA] pl-10 pr-4 text-sm text-[#26352A] outline-none transition placeholder:text-[#A2AAA4] focus:border-[#05893E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#05893E]/10"
                                />
                            </div>
                        </div>

                        {/* Feedback Message */}
                        {message && (
                            <div
                                role="status"
                                aria-live="polite"
                                className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${messageType === "success"
                                        ? "border-green-200 bg-green-50 text-green-800"
                                        : "border-red-200 bg-red-50 text-red-700"
                                    }`}
                            >
                                {messageType === "success" && (
                                    <FiCheckCircle className="mt-0.5 shrink-0" size={16} />
                                )}
                                <span>{message}</span>
                            </div>
                        )}

                        {/* Update Button */}
                        <button
                            type="submit"
                            disabled={isUpdating || isSigningOut || !user}
                            className="btn h-11 min-h-11 w-full rounded-lg border-0 bg-[#05893E] text-sm font-extrabold text-white shadow-sm transition hover:bg-[#047331] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isUpdating ? (
                                <>
                                    <span className="loading loading-spinner loading-sm" />
                                    আপডেট হচ্ছে...
                                </>
                            ) : (
                                "আপডেট"
                            )}
                        </button>
                    </form>
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
