import Link from "next/link";

export const metadata = {
    title: "About Us",
    description:
        "Learn about TempMail.sbs — your go-to solution for fast, secure, and anonymous temporary email addresses.",
    openGraph: {
        title: "About Us - TempMail.sbs",
        description:
            "Learn about TempMail.sbs — your go-to solution for fast, secure, and anonymous temporary email addresses.",
    },
    alternates: {
        canonical: "https://www.tempmail.sbs/aboutus",
    },
};

export default function AboutUs() {
    return (
        <div className="bg-[#111827] text-white min-h-screen px-6 py-12">
            <div className="max-w-5xl mx-auto">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-100">
                    About TempMail.sbs
                </h1>

                {/* Intro */}
                <p className="text-gray-300 text-lg mb-8 text-center">
                    TempMail.sbs is your go-to solution for fast, secure, and anonymous
                    temporary email addresses. We believe in simple privacy tools that
                    just work — no signup, no tracking, no nonsense.
                </p>

                {/* Our Mission */}
                <div className="bg-[#1f2937] p-6 rounded-xl shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-3">🚀 Our Mission</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Our goal is to protect your online identity by providing an instant,
                        disposable inbox. In a digital world full of spam and privacy
                        threats, we aim to give you control over your email usage without
                        revealing personal info.
                    </p>
                </div>

                {/* What We Offer */}
                <div className="bg-[#1f2937] p-6 rounded-xl shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-3">💡 What We Offer</h2>
                    <ul className="list-disc ml-6 text-gray-300 space-y-2">
                        <li>One-click temp email generation</li>
                        <li>No registration or login required</li>
                        <li>Instant inbox with real-time email receiving</li>
                        <li>Email auto-deletes after a period</li>
                        <li>Complete anonymity and no tracking</li>
                    </ul>
                </div>

                {/* Why Trust Us */}
                <div className="bg-[#1f2937] p-6 rounded-xl shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-3">🔒 Why Trust Us</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We don&apos;t store any personal data. We don&apos;t log IPs. TempuMail is
                        built for people who care about privacy. Whether you&apos;re testing a
                        service or want to avoid spam — we&apos;re here for you.
                    </p>
                </div>

                {/* Final Note */}
                <div className="text-center mt-12">
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                        Ready to Get Started?
                    </h3>
                    <p className="text-gray-400 mb-4">
                        Start using TempuMail and protect your inbox in seconds.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
