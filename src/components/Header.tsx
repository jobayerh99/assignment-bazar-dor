import Image from "next/image";
import NavLinks from "./NavLinks";


const Header = () => {

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    })

    return (
        <header className="p-3">
            <div className="max-w-7xl mx-auto flex justify-between">
                {/* left side for logo */}
                <div className="flex gap-1 items-center">
                    <div className="h-10 w-10 bg-green-200 rounded-2xl grid items-center justify-center">
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
                {/* right side for button and profile */}
                <div className="flex gap-2">
                    <button className="btn btn-ghost">সাইন ইন</button>
                    <button className="btn btn-accent bg-green-500 text-white">সাইন আপ</button>
                </div>
            </div>

            <NavLinks/>
            
        </header>
    );
};

export default Header;