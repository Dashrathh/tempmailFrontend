import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-[#111827] px-4 py-3 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 sm:px-6 sm:py-4 overflow-hidden">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-100 text-center sm:text-left">
                <Link href="/">TempMail</Link>
            </h1>

            <nav className="flex flex-wrap justify-center items-center gap-y-2 gap-x-1 sm:gap-x-4">
                <Link
                    href="/sendmail"
                    className="text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg transition duration-200 hover:bg-white hover:text-black text-xs sm:text-sm md:text-base font-medium"
                >
                    SendMail
                </Link>
                <Link
                    href="/tools"
                    className="text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg transition duration-200 hover:bg-white hover:text-black text-xs sm:text-sm md:text-base font-medium"
                >
                    Tools
                </Link>
                <Link
                    href="/blogs"
                    className="text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg transition duration-200 hover:bg-white hover:text-black text-xs sm:text-sm md:text-base font-medium"
                >
                    Blogs
                </Link>
                <Link
                    href="/aboutus"
                    className="text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg transition duration-200 hover:bg-white hover:text-black text-xs sm:text-sm md:text-base font-medium"
                >
                    About Us
                </Link>
                <Link
                    href="/howitswork"
                    className="text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg transition duration-200 hover:bg-white hover:text-black text-xs sm:text-sm md:text-base font-medium whitespace-nowrap"
                >
                    How It Works
                </Link>
            </nav>
        </header>
    );
};

export default Header;
