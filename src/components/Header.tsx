"use client"

import { INavLinks } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const Header = () => {
    const [categories, setCategories] = useState<INavLinks[]>([]);
    const pathname = usePathname();

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
                <div className="flex gap-2">
                    <button className="btn btn-ghost">সাইন ইন</button>
                    <Link href={'/signup'}>
                        <button className="btn btn-accent bg-green-500 text-white">সাইন আপ</button>
                    </Link>
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

        </header>
    );
};

export default Header;