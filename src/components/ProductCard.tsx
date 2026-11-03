import type { IProduct } from "@/lib/utils";
import Link from "next/link";

interface ProductCardProps {
    product: IProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
    const isRising = product.change.dir === "up";
    const isFalling = product.change.dir === "down";

    return (
        <Link href={`/products/${product.id}`}>
            <div className="flex items-center justify-between rounded-2xl border border-[#DFE7DF] bg-[#FAFCFA] p-4">
                <div className="flex items-start gap-3">
                    {/* Product Image */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F4EF] text-2xl">
                        {product.image}
                    </div>

                    {/* Product Information */}
                    <div>
                        <h3 className="text-base font-bold text-[#263329]">
                            {product.nameBn}
                        </h3>

                        <p className="text-sm text-[#69756B]">
                            প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                        </p>

                        <div className="mt-3">
                            <p className="text-sm text-[#69756B]">
                                আজকের দাম
                            </p>

                            <p className="text-base font-bold text-[#263329]">
                                {product.today.toLocaleString("bn-BD")} টাকা
                            </p>
                        </div>
                    </div>
                </div>

                {/* Price Change */}
                <div
                    className={`shrink-0 self-end rounded-full px-3 py-1 text-xs font-semibold ${isRising
                        ? "bg-[#FDF1F1] text-[#E53935]"
                        : isFalling
                            ? "bg-[#EAF7EC] text-[#238636]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                >
                    {isRising ? "▲" : isFalling ? "▼" : "—"}{" "}
                    {product.change.pct.toLocaleString("bn-BD")}%
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;