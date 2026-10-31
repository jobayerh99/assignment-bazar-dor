
const bengaliDigits = [
    "০", "১", "২", "৩", "৪",
    "৫", "৬", "৭", "৮", "৯",
];

export const toBengaliNumber = (
    num: number | string
): string => {
    return String(num).replace(/[0-9]/g, (digit) => {
        return bengaliDigits[Number(digit)];
    });
};

export const formatPrice = (price: number): string => {
    return toBengaliNumber(price.toLocaleString("en-IN"));
};

const unitMap: Record<string, string> = {
    kg: "প্রতি কেজি",
    gram: "প্রতি গ্রাম",
    litre: "প্রতি লিটার",
    ml: "প্রতি মিলিলিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    bag: "প্রতি বস্তা",
};

export const getUnitBn = (unit: string): string => {
    return unitMap[unit] ?? unit;
};

const banglaDays = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
];

const banglaMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
];

export const getBanglaDate = (): string => {
    const today = new Date();

    const day = banglaDays[today.getDay()];
    const date = toBengaliNumber(today.getDate());
    const month = banglaMonths[today.getMonth()];
    const year = toBengaliNumber(today.getFullYear());

    return `${day}, ${date} ${month}, ${year}`;
};

export interface IProduct {
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
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
}

export interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}
