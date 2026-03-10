import Link from "next/link";
import { HiOutlineMail, HiHome } from "react-icons/hi";

export const metadata = {
    title: "Page Not Found",
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 p-4 rounded-full">
                        <HiOutlineMail className="h-16 w-16 text-blue-600" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <div className="inline-block bg-red-100 px-4 py-2 rounded-full mb-4">
                        <span className="text-red-800 font-semibold">Error 404</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
                        Page Not Found
                    </h1>
                    <p className="text-gray-600 text-lg">
                        The email address or page you&apos;re looking for doesn&apos;t exist or may
                        have expired.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                    >
                        <HiHome className="h-5 w-5" />
                        <span>Return to Homepage</span>
                    </Link>

                    <div className="text-center mt-6 pt-6 border-t border-gray-200">
                        <p className="text-gray-500 mb-4">
                            You might find these useful instead:
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/tools" className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                Free Tools
                            </Link>
                            <Link href="/blogs" className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                Blog
                            </Link>
                            <Link href="/sendmail" className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                Send Anonymous Email
                            </Link>
                        </div>
                        <p className="mt-8 text-sm text-gray-400">
                            © {new Date().getFullYear()} tempmail.sbs • Secure Temporary Email
                            Service
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
