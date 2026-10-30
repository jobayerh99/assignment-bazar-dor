"use client"

import { authClient } from "@/lib/auth-client";
import { INavLinks } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const Header = () => {
    const [categories, setCategories] = useState<INavLinks[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();

    const { data: session } = authClient.useSession()
    const user = session?.user

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    })

    useEffect(() => {
        fetch("https://openapi.programming-hero.com/api/bazardor/categories")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);

                setCategories(data);
            });
    }, []);


    const handleSignOut = async () => {
        await authClient.signOut()
        setDropdownOpen(false)
    }


    return (
        <header className="pt-3">
            <div className="max-w-7xl mx-auto flex justify-between">
                {/* left side for logo */}
                <Link href={"/"}>
                    <div className="flex gap-1 items-center">
                        <div className="h-10 w-10 bg-[#068a3f] rounded-2xl grid items-center justify-center">
                            <Image
                                src={"/logo-icon.png"}
                                alt="bazar-dor-logo"
                                height={18}
                                width={28}
                            >
                            </Image>
                        </div>
                        <div>
                            <h1>বাজার দর</h1>
                            <p>{date}</p>
                        </div>
                    </div>
                </Link>
                {/* right side for button and profile */}
                {/* <div className="flex gap-2">
                    <Link href={"/signin"}>
                        <button className="btn btn-ghost">সাইন ইন</button>
                    </Link>
                    <Link href={'/signup'}>
                        <button className="btn btn-accent bg-green-500 text-white">সাইন আপ</button>
                    </Link>
                </div> */}

                {/* Right Auth / Profile Menu */}
                <div className="flex items-center gap-3 shrink-0">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2.5 p-1 pr-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
                                id="user-menu-button"
                            >
                                <div className="avatar">
                                    <div className="w-8 h-8 rounded-full ring-2 ring-teal-500 ring-offset-1 overflow-hidden bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                                        <img src={user?.image} alt="User" />
                                    </div>
                                </div>
                                <div className="hidden sm:flex flex-col text-left">
                                    <span className="text-xs font-bold text-slate-800 leading-tight">{user?.name}</span>
                                    
                                </div>
                            </button>

                            {/* Dropdown Menu (Figma Screen 7) */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 shadow-xl rounded-2xl py-2 z-50 text-xs">
                                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                                        <p className="font-bold text-slate-900 truncate">{user?.name}</p>
                                        <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-semibold transition-colors"
                                    >
                                        <span>👤</span> প্রোফাইল ড্যাশবোর্ড
                                    </Link>
                                    <Link
                                        href="/profile/update"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-semibold transition-colors"
                                    >
                                        <span>✏️</span> তথ্য পরিবর্তন করুন
                                    </Link>
                                    <div className="border-t border-slate-100 my-1"></div>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
                                    >
                                        <span>🚪</span> সাইন আউট
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/signin">
                                <button className="btn btn-ghost btn-sm text-slate-700 hover:text-teal-700 font-bold rounded-xl text-xs">
                                    লগইন
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="btn btn-sm bg-teal-600 hover:bg-teal-700 border-0 text-white font-bold px-4 rounded-xl shadow-xs text-xs">
                                    নিবন্ধন
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <nav>
                    <div>
                        <div className="flex w-full flex-col">

                            <div className="divider m-0 p-0"></div>

                        </div>
                        <div className="flex gap-5 justify-start max-w-7xl mx-auto">


                            {categories.map((cat: INavLinks) => {
                                // /category/processor
                                const isActive = pathname === `/category/${cat.slug}`;

                                return (
                                    <Link
                                        key={cat.id}
                                        href={`/category/${cat.slug}`}
                                        className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${isActive
                                            ? 'bg-[#068a3f] text-white shadow-xs font-bold'
                                            : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 font-medium'
                                            }`}
                                    >
                                        <span>{cat.icon}</span>
                                        <span>{cat.nameBn}</span>
                                    </Link>
                                );
                            })}

                        </div>
                        <div className="flex w-full flex-col">

                            <div className="divider m-0 p-0"></div>

                        </div>
                    </div>
                </nav>
            </div>

        </header >
    );
};

export default Header;