import { formatPrice, getUnitBn, IProduct, toBengaliNumber } from "@/lib/utils";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const Marquee = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

    const data: IProduct[] = await res.json();

    console.log(data);


    return (
        <div className="py-2">
            <MarqueeText direction="right" duration={10}>
                {data.map((p) => (
                    <span
                        key={p.id}
                        className="inline-flex items-center gap-2 whitespace-nowrap px-4"
                    >
                        <span>{p.image}</span>

                        <span className="font-medium">{p.nameBn}</span>

                        <span className="font-semibold">
                            {formatPrice(p.today)} টাকা
                        </span>

                        <span className="text-sm text-gray-500">
                            {getUnitBn(p.unit)}
                        </span>

                        <span
                            className={`inline-flex items-center gap-1 text-sm font-semibold ${p.change.dir === "up"
                                ? "text-green-600"
                                : p.change.dir === "down"
                                    ? "text-red-600"
                                    : "text-gray-500"
                                }`}
                        >
                            {p.change.dir === "up" ? (
                                <span>▲</span>
                            ) : p.change.dir === "down" ? (
                                <span>▼</span>
                            ) : (
                                <span>—</span>
                            )}

                            <span>
                                {toBengaliNumber(p.change.pct)}%
                            </span>
                        </span>
                    </span>
                ))}
            </MarqueeText>
            <div className="flex w-full flex-col">

                <div className="divider my-0"></div>
                
            </div>
        </div>
    );
};

export default Marquee;