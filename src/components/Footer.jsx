import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-[#0c1120] text-gray-400 px-6 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                {/* Left: Logo & About */}
                <div className="md:pl-8">
                    <h2 className="text-2xl font-bold text-blue-500">
                        TempMail Generator
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        Fast, secure & anonymous temporary email addresses to protect your
                        privacy.
                    </p>
                </div>

                {/* Middle: Buy Me a Coffee Button */}
                <div className="flex items-center justify-center">
                    <a
                        href="https://buymeacoffee.com/opafgdabq"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                            alt="Buy Me A Coffee"
                            width={162}
                            height={45}
                            unoptimized // Since it's a dynamic badge button, unoptimized is fine or you can let Next.js optimize it. We'll let it optimize.
                            className="h-[45px] w-[162px]"
                        />
                    </a>
                </div>

                {/* Right: Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-blue-400 transition-colors duration-300"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tools"
                                className="hover:text-blue-400 transition-colors duration-300"
                            >
                                Free Tools
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blogs"
                                className="hover:text-blue-400 transition-colors duration-300"
                            >
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/howitswork"
                                className="hover:text-blue-400 transition-colors duration-300"
                            >
                                How It Works
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/aboutus"
                                className="hover:text-blue-400 transition-colors duration-300"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/Privacy"
                                className="hover:text-blue-400 transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/terms"
                                className="hover:text-blue-400 transition-colors duration-300"
                            >
                                Terms and Conditions
                            </Link>
                        </li>


                    </ul>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500 select-none">
                &copy; {new Date().getFullYear()} TempMail. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
