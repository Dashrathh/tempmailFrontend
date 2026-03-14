import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-[#111827] px-4 py-3 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 sm:px-6 sm:py-4 overflow-hidden">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 text-center sm:text-left">
                <Link href="/" className="hover:opacity-80 transition-opacity">TempMail</Link>
            </h1>

            <nav className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                <Link
                    href="/sendmail"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 text-xs sm:text-sm md:text-base font-medium active:scale-95"
                >
                    SendMail
                </Link>
                <Link
                    href="/tools"
                    className="relative group text-gray-300 hover:text-white px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 text-xs sm:text-sm md:text-base font-medium active:scale-95"
                >
                    Tools
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 items-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></span>
                        <span className="relative inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 border border-blue-400/30">
                            NEW
                        </span>
                    </span>
                </Link>
                <Link
                    href="/blogs"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 text-xs sm:text-sm md:text-base font-medium active:scale-95"
                >
                    Blogs
                </Link>
                <Link
                    href="/aboutus"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 text-xs sm:text-sm md:text-base font-medium active:scale-95"
                >
                    About Us
                </Link>
                <Link
                    href="/howitswork"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap active:scale-95"
                >
                    How It Works
                </Link>
            </nav>
        </header>
    );
};

export default Header;
