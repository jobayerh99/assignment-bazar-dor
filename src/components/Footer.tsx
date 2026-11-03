import React from "react";

const Footer = () => {
    return (
        <footer className="border-t border-[#E2EBE3] bg-white px-4 py-5 sm:px-6">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

                <div>
                    <p className="text-xs leading-relaxed text-[#758078] sm:text-sm">
                        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                </div>

                <div>
                    <p className="text-xs leading-relaxed text-[#758078] sm:text-sm">
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;