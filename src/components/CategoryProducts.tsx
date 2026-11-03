
"use client";

import React, { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

type SortOption = "default" | "price-asc" | "price-desc";

type IProduct = React.ComponentProps<typeof ProductCard>["product"];

interface CategoryProductsProps {
    products: IProduct[];
    categoryId: string;
}

const categoryDescriptions: Record<string, string> = {
    chal: "বিভিন্ন ধরনের চালের আজকের বাজারদর দেখুন",
    dal: "বিভিন্ন ধরনের ডালের আজকের বাজারদর দেখুন",
    tel: "বিভিন্ন ধরনের তেলের আজকের বাজারদর দেখুন",
    shobji: "বিভিন্ন ধরনের সবজির আজকের বাজারদর দেখুন",
    mach: "বিভিন্ন ধরনের মাছের আজকের বাজারদর দেখুন",
    mangsho: "বিভিন্ন ধরনের মাংসের আজকের বাজারদর দেখুন",
    dim_dudh: "ডিম ও দুধের আজকের বাজারদর দেখুন",
    mosla: "বিভিন্ন ধরনের মসলার আজকের বাজারদর দেখুন",
};

const CategoryProducts = ({
    products,
    categoryId,
}: CategoryProductsProps) => {
    const [sortBy, setSortBy] = useState<SortOption>("default");

    const categoryInfo = products[0];

    const categoryName = categoryInfo?.categoryNameBn ?? categoryId;
    const categoryIcon = categoryInfo?.categoryIcon ?? "🛒";

    const description =
        categoryDescriptions[categoryId] ??
        "এই ক্যাটাগরির পণ্যের আজকের বাজারদর দেখুন";

    // Sorting products
    const sortedProducts = useMemo(() => {
        const result = [...products];

        if (sortBy === "price-asc") {
            result.sort((a, b) => a.today - b.today);
        }

        if (sortBy === "price-desc") {
            result.sort((a, b) => b.today - a.today);
        }

        return result;
    }, [products, sortBy]);

    return (
        <section className="min-h-screen bg-[#F4F8F3] px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-6xl">

                {/* Category Header */}
                <div className="flex items-center gap-3 rounded-xl border border-[#E3EAE2] bg-[#FAFCFA] px-4 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F4EF] text-2xl">
                        {categoryIcon}
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-[#263329]">
                            {categoryName}
                        </h1>

                        <p className="text-xs text-[#7A857B]">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Sort Control */}
                <div className="mt-3 flex flex-wrap items-center justify-end gap-2 rounded-xl border border-[#E3EAE2] bg-[#FAFCFA] px-4 py-3">
                    <label
                        htmlFor="product-sort"
                        className="text-xs text-[#7A857B]"
                    >
                        সাজান
                    </label>

                    <select
                        id="product-sort"
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(event.target.value as SortOption)
                        }
                        className="rounded-lg border border-[#DDE5DC] bg-white px-3 py-2 text-xs text-[#344238] outline-none focus:border-green-600"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="price-asc">
                            দাম: কম থেকে বেশি
                        </option>
                        <option value="price-desc">
                            দাম: বেশি থেকে কম
                        </option>
                    </select>
                </div>

                {/* Product Count */}
                <p className="mt-3 text-xs text-[#7A857B]">
                    মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য
                    পাওয়া গেছে
                </p>

                {/* Products */}
                {sortedProducts.length > 0 ? (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 rounded-xl border border-[#E3EAE2] bg-[#FAFCFA] px-4 py-12 text-center">
                        <p className="text-sm text-[#7A857B]">
                            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default CategoryProducts;
