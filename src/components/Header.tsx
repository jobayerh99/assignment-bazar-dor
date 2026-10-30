
"use client";

import { authClient } from "@/lib/auth-client";
import { INavLinks } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    FiChevronDown,
    FiLogIn,
    FiLogOut,
    FiMenu,
    FiUser,
    FiUserPlus,
    FiX,
} from "react-icons/fi";

const Header = () => {
    const [categories, setCategories] = useState<INavLinks[]>([]);
    const [formattedDate] = useState(() =>
        new Date().toLocaleDateString("bn-BD", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    );
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const pathname = usePathname();
    const [menuPathname, setMenuPathname] = useState(pathname);
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        let active = true;

        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://openapi.programming-hero.com/api/bazardor/categories"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const result = await response.json();
                const items = Array.isArray(result)
                    ? result
                    : Array.isArray(result?.data)
                        ? result.data
                        : [];

                if (active) setCategories(items);
            } catch (error) {
                console.error("Category fetch error:", error);
                if (active) setCategories([]);
            }
        };

        fetchCategories();

        return () => {
            active = false;
        };
    }, []);

    if (menuPathname !== pathname) {
        setMenuPathname(pathname);
        setDropdownOpen(false);
        setMobileMenuOpen(false);
    }

    const handleSignOut = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                console.error("Sign-out failed:", error);
                return;
            }

            setDropdownOpen(false);
            setMobileMenuOpen(false);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Unexpected sign-out error:", error);
        }
    };

    const renderCategories = (mobile = false) =>
        categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;

            return (
                <Link
                    key={cat.id ?? cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${isActive
                            ? "bg-[#068a3f] font-bold text-white shadow-sm"
                            : "font-medium text-slate-600 hover:bg-green-50 hover:text-[#068a3f]"
                        } ${mobile ? "w-full justify-start" : ""}`}
                >
                    {cat.icon && <span>{cat.icon}</span>}
                    <span>{cat.nameBn}</span>
                </Link>
            );
        });

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 pt-2 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex min-h-[68px] items-center justify-between gap-3 sm:min-h-[76px]">
                    {/* Logo and date */}
                    <Link
                        href="/"
                        aria-label="বাজার দর হোম"
                        className="flex min-w-0 items-center gap-2.5"
                    >
                        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#068a3f] shadow-sm sm:size-12">
                            <Image
                                src="/logo-icon.png"
                                alt="বাজার দর"
                                width={28}
                                height={24}
                                priority
                                className="h-auto w-7 object-contain"
                            />
                        </span>

                        <span className="min-w-0">
                            <span className="block text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                                বাজার দর
                            </span>
                            <span className="block max-w-[190px] truncate text-[10px] font-medium text-slate-500 sm:max-w-none sm:text-xs">
                                {formattedDate || "\u00a0"}
                            </span>
                        </span>
                    </Link>

                    {/* Desktop authentication */}
                    <div className="hidden shrink-0 items-center gap-2 sm:flex">
                        {user ? (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setDropdownOpen((open) => !open)}
                                    aria-expanded={dropdownOpen}
                                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 transition hover:bg-green-50"
                                >
                                    <span className="grid size-9 place-items-center overflow-hidden rounded-full bg-green-100 font-bold text-[#068a3f]">
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt=""
                                                className="size-full object-cover"
                                            />
                                        ) : (
                                            (user.name?.trim().charAt(0) || "U").toUpperCase()
                                        )}
                                    </span>
                                    <span className="hidden max-w-28 truncate text-sm font-bold text-slate-700 md:block">
                                        {user.name}
                                    </span>
                                    <FiChevronDown
                                        className={`size-4 transition-transform ${dropdownOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-xl">
                                        <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                                            <p className="truncate text-sm font-bold text-slate-900">
                                                {user.name}
                                            </p>
                                            <p className="mt-1 truncate text-xs text-slate-500">
                                                {user.email}
                                            </p>
                                        </div>

                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-[#068a3f]"
                                        >
                                            <FiUser className="size-4" />
                                            প্রোফাইল ড্যাশবোর্ড
                                        </Link>

                                        

                                        <button
                                            type="button"
                                            onClick={handleSignOut}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
                                        >
                                            <FiLogOut className="size-4" />
                                            সাইন আউট
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/signin"
                                    className="inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold text-slate-700 hover:bg-green-50 hover:text-[#068a3f]"
                                >
                                    <FiLogIn className="size-4" />
                                    লগইন
                                </Link>

                                <Link
                                    href="/signup"
                                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#068a3f] px-4 text-sm font-bold text-white transition hover:bg-[#057534]"
                                >
                                    <FiUserPlus className="size-4" />
                                    নিবন্ধন
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile controls */}
                    <div className="flex shrink-0 items-center gap-2 sm:hidden">
                        {user && (
                            <Link
                                href="/profile"
                                aria-label="প্রোফাইল"
                                className="grid size-10 place-items-center overflow-hidden rounded-full border border-green-200 bg-green-50 font-bold text-[#068a3f]"
                            >
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt=""
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    (user.name?.trim().charAt(0) || "U").toUpperCase()
                                )}
                            </Link>
                        )}

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((open) => !open)}
                            aria-expanded={mobileMenuOpen}
                            aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
                            className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-700 hover:bg-green-50 hover:text-[#068a3f]"
                        >
                            {mobileMenuOpen ? (
                                <FiX className="size-5" />
                            ) : (
                                <FiMenu className="size-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop category navigation */}
            <nav
                aria-label="প্রধান ক্যাটাগরি"
                className="hidden border-t border-slate-100 sm:block"
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {renderCategories()}
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="border-t border-slate-200 bg-white shadow-lg sm:hidden">
                    <nav
                        aria-label="মোবাইল নেভিগেশন"
                        className="mx-auto max-w-6xl space-y-3 px-4 py-4"
                    >
                        {!user ? (
                            <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-4">
                                <Link
                                    href="/signin"
                                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700"
                                >
                                    <FiLogIn className="size-4" />
                                    লগইন
                                </Link>
                                <Link
                                    href="/signup"
                                    className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#068a3f] text-sm font-bold text-white"
                                >
                                    <FiUserPlus className="size-4" />
                                    নিবন্ধন
                                </Link>
                            </div>
                        ) : (
                            <div className="rounded-xl bg-green-50 p-3">
                                <p className="truncate text-sm font-bold text-slate-900">
                                    {user.name}
                                </p>
                                <p className="mt-1 truncate text-xs text-slate-500">
                                    {user.email}
                                </p>
                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    <Link
                                        href="/profile"
                                        className="flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-white px-2 py-2 text-xs font-semibold text-[#068a3f]"
                                    >
                                        <FiUser className="size-4" />
                                        প্রোফাইল
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-rose-100 bg-white px-2 py-2 text-xs font-semibold text-rose-600"
                                    >
                                        <FiLogOut className="size-4" />
                                        সাইন আউট
                                    </button>
                                </div>
                            </div>
                        )}

                        <p className="px-2 text-xs font-bold text-slate-400">
                            পণ্যের ক্যাটাগরি
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                            {renderCategories(true)}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
