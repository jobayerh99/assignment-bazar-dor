
interface ProductPageProps {
    params: Promise<{
        productsId: string;
    }>;
}

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "same";
        pct: number;
    };
    markets: Market[];
}

const formatPrice = (price: number) =>
    price.toLocaleString("bn-BD");

const getUnit = (unit: string) => {
    const units: Record<string, string> = {
        kg: "কেজি",
        liter: "লিটার",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
        pcs: "পিস",
    };

    return units[unit] || unit;
};

export default async function ProductPage({
    params,
}: ProductPageProps) {
    const { productsId } = await params;

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products/${productsId}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product details");
    }

    const response = await res.json();

    const product: Product =
        response?.data?.product ??
        response?.data ??
        response?.product ??
        response;

    if (!product?.nameBn || !Array.isArray(product.markets)) {
        throw new Error("Invalid product API response");
    }

    const markets = product.markets;

    const minPrice = markets.length
        ? Math.min(...markets.map((market) => market.min))
        : 0;

    const maxPrice = markets.length
        ? Math.max(...markets.map((market) => market.max))
        : 0;

    const averagePrice = markets.length
        ? markets.reduce(
            (total, market) =>
                total + (market.min + market.max) / 2,
            0
        ) / markets.length
        : 0;

    const isRising = product.change?.dir === "up";
    const isFalling = product.change?.dir === "down";


    return (
        <main className="min-h-screen bg-[#F0F5F0] px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl space-y-3 sm:space-y-4">

                {/* Product Header */}
                <section className="rounded-xl border border-[#E3EAE2] bg-[#FAFCFA] p-4 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F4EF] text-2xl sm:h-16 sm:w-16 sm:text-3xl">
                                {product.image || product.categoryIcon}
                            </div>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-base font-bold text-[#263329] sm:text-xl lg:text-2xl">
                                        {product.nameBn}
                                    </h1>

                                    <span className="rounded-full bg-[#F0F4EF] px-2 py-1 text-[10px] font-medium text-[#536B55]">
                                        {product.categoryNameBn}
                                    </span>
                                </div>

                                <p className="mt-1 text-xs text-[#7A857B] sm:text-sm">
                                    প্রতি {getUnit(product.unit)}
                                </p>

                                <p className="mt-1 max-w-xl text-[11px] leading-relaxed text-[#7A857B] sm:text-xs">
                                    বিভিন্ন বাজারের আজকের দাম ও মূল্য পরিবর্তনের তথ্য
                                </p>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-between rounded-lg bg-[#F0F4EF] px-4 py-3 sm:w-auto sm:min-w-32 sm:flex-col sm:items-center sm:justify-center">
                            <p className="text-xs text-[#7A857B]">
                                আজকের দাম
                            </p>

                            <div className="text-right sm:text-center">
                                <h2 className="text-xl font-bold text-[#263329] sm:text-2xl">
                                    ৳{formatPrice(product.today)}
                                </h2>

                                <p className={`text-[11px] font-semibold ${isRising
                                        ? "text-[#E53935]"
                                        : isFalling
                                            ? "text-[#238636]"
                                            : "text-[#7A857B]"
                                    }`}>
                                    {isRising ? "▲" : isFalling ? "▼" : "—"}{" "}
                                    {formatPrice(product.change?.pct ?? 0)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Price Summary */}
                <section className="rounded-xl border border-[#E3EAE2] bg-[#FAFCFA] p-4 sm:p-5">
                    <h2 className="mb-3 text-sm font-bold text-[#263329] sm:text-base">
                        আজকের মূল্যসারাংশ
                    </h2>

                    <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3 sm:gap-3">

                        <div className="rounded-lg border border-[#E3EAE2] bg-[#FAFCFA] p-3 sm:p-4">
                            <p className="text-[11px] text-[#7A857B] sm:text-xs">
                                সর্বনিম্ন
                            </p>
                            <h3 className="mt-1 text-base font-bold text-[#238636] sm:text-xl">
                                ৳{formatPrice(minPrice)}
                            </h3>
                            <p className="mt-1 text-[10px] text-[#7A857B]">
                                সবচেয়ে কম বাজারদর
                            </p>
                        </div>

                        <div className="rounded-lg border border-[#E3EAE2] bg-[#FAFCFA] p-3 sm:p-4">
                            <p className="text-[11px] text-[#7A857B] sm:text-xs">
                                সর্বোচ্চ
                            </p>
                            <h3 className="mt-1 text-base font-bold text-[#E53935] sm:text-xl">
                                ৳{formatPrice(maxPrice)}
                            </h3>
                            <p className="mt-1 text-[10px] text-[#7A857B]">
                                সবচেয়ে বেশি বাজারদর
                            </p>
                        </div>

                        <div className="rounded-lg border border-[#E3EAE2] bg-[#FAFCFA] p-3 sm:p-4">
                            <p className="text-[11px] text-[#7A857B] sm:text-xs">
                                গড় দাম
                            </p>
                            <h3 className="mt-1 text-base font-bold text-[#263329] sm:text-xl">
                                ৳{formatPrice(Math.round(averagePrice))}
                            </h3>
                            <p className="mt-1 text-[10px] text-[#7A857B]">
                                সব বাজারের গড় মূল্য
                            </p>
                        </div>
                    </div>
                </section>

                {/* Market-wise Prices */}
                <section className="rounded-xl border border-[#E3EAE2] bg-[#FAFCFA] p-3 sm:p-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-sm font-bold text-[#263329] sm:text-base">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <span className="rounded-full bg-[#F0F4EF] px-3 py-1 text-[10px] font-semibold text-[#536B55] sm:text-xs">
                            {formatPrice(markets.length)}টি বাজার
                        </span>
                    </div>

                    {markets.length > 0 ? (
                        <>
                            {/* Mobile Market Cards */}
                            <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 md:hidden">
                                {markets.map((market, index) => (
                                    <div
                                        key={`${market.market}-${index}`}
                                        className="rounded-lg border border-[#E3EAE2] bg-[#F8FAF7] p-3"
                                    >
                                        <div className="mb-3 flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <h3 className="break-words text-sm font-bold text-[#263329]">
                                                    {market.market}
                                                </h3>
                                                <p className="mt-1 text-xs text-[#7A857B]">
                                                    {market.division}
                                                </p>
                                            </div>

                                            <span className="shrink-0 rounded-md bg-[#F0F4EF] px-2 py-1 text-[10px] text-[#536B55]">
                                                #{formatPrice(index + 1)}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 border-t border-[#E3EAE2] pt-3">
                                            <div className="min-w-0">
                                                <p className="text-[10px] text-[#7A857B]">
                                                    সর্বনিম্ন
                                                </p>
                                                <p className="mt-1 break-words text-xs font-bold text-[#238636]">
                                                    ৳{formatPrice(market.min)}
                                                </p>
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-[10px] text-[#7A857B]">
                                                    সর্বোচ্চ
                                                </p>
                                                <p className="mt-1 break-words text-xs font-bold text-[#E53935]">
                                                    ৳{formatPrice(market.max)}
                                                </p>
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-[10px] text-[#7A857B]">
                                                    গড়
                                                </p>
                                                <p className="mt-1 break-words text-xs font-bold text-[#263329]">
                                                    ৳{formatPrice(Math.round((market.min + market.max) / 2))}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tablet & Desktop Table */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full min-w-[600px] border-collapse text-left text-xs lg:text-sm">
                                    <thead>
                                        <tr className="border-y border-[#E3EAE2] bg-[#F0F4EF] text-[#536B55]">
                                            <th className="px-3 py-3 font-semibold lg:px-4">
                                                বাজার
                                            </th>
                                            <th className="px-3 py-3 font-semibold lg:px-4">
                                                বিভাগ
                                            </th>
                                            <th className="px-3 py-3 text-right font-semibold lg:px-4">
                                                সর্বনিম্ন
                                            </th>
                                            <th className="px-3 py-3 text-right font-semibold lg:px-4">
                                                সর্বোচ্চ
                                            </th>
                                            <th className="px-3 py-3 text-right font-semibold lg:px-4">
                                                গড়
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {markets.map((market, index) => (
                                            <tr
                                                key={`${market.market}-${index}`}
                                                className={`border-b border-[#E3EAE2] text-[#263329] transition-colors hover:bg-[#EAF1E8] ${index % 2 === 0
                                                        ? "bg-[#FAFCFA]"
                                                        : "bg-[#F3F7F2]"
                                                    }`}
                                            >
                                                <td className="px-3 py-3 font-medium lg:px-4">
                                                    {market.market}
                                                </td>

                                                <td className="px-3 py-3 text-[#69756B] lg:px-4">
                                                    {market.division}
                                                </td>

                                                <td className="px-3 py-3 text-right font-semibold text-[#238636] lg:px-4">
                                                    ৳{formatPrice(market.min)}
                                                </td>

                                                <td className="px-3 py-3 text-right font-semibold text-[#E53935] lg:px-4">
                                                    ৳{formatPrice(market.max)}
                                                </td>

                                                <td className="px-3 py-3 text-right font-semibold lg:px-4">
                                                    ৳{formatPrice(Math.round((market.min + market.max) / 2))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="rounded-lg bg-[#F0F4EF] p-8 text-center">
                            <p className="text-2xl">🏪</p>
                            <p className="mt-2 text-sm font-semibold text-[#263329]">
                                কোনো বাজারের তথ্য পাওয়া যায়নি।
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );

}
