export const metadata = {
    title: "How It Works",
    description:
        "Learn how TempuMail works — auto-generate temp emails, receive emails instantly, and auto-expire for privacy.",
    openGraph: {
        title: "How It Works",
        description: "Learn how TempuMail works — auto-generate temp emails, receive emails instantly, and auto-expire for privacy.",
    },
};

export default function HowItWorks() {
    return (
        <div className="bg-gray-900 text-white px-6 py-12">
            {/* Section Title */}
            <h1 className="text-4xl font-bold text-center mb-14">
                How TempuMail Works
            </h1>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-3 gap-10 mb-20">
                {/* Step 1 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-2xl font-semibold mb-3">1. Auto Generate</h3>
                    <p>
                        As soon as you open TempuMail, a unique temporary email address is
                        automatically generated for you. No sign-up or login needed.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-2xl font-semibold mb-3">
                        2. Receive Emails Instantly
                    </h3>
                    <p>
                        All incoming mails — including OTPs, activation links, and messages
                        — appear in real time. Your inbox updates automatically.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-2xl font-semibold mb-3">3. Auto-Expire</h3>
                    <p>
                        Each temp email is deleted after a fixed duration (e.g. 10 minutes).
                        You can stay private, avoid spam, and protect your real inbox.
                    </p>
                </div>
            </div>

            {/* Why We Need This */}
            <div className="bg-[#1f2937] p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Why You Need TempuMail</h2>
                <ul className="list-disc pl-5 space-y-4 text-lg">
                    <li>
                        <strong>Privacy First:</strong> Don&apos;t expose your personal email for
                        trials or downloads.
                    </li>
                    <li>
                        <strong>Block Spam:</strong> Keep spam away from your main inbox
                        when registering on unknown websites.
                    </li>
                    <li>
                        <strong>Fast &amp; Free:</strong> Get quick access to verification
                        codes, OTPs, and confirmations without any hassle.
                    </li>
                    <li>
                        <strong>No Sign-up:</strong> 100% anonymous — just use and go. We
                        don&apos;t store your data.
                    </li>
                    <li>
                        <strong>Secure:</strong> Emails self-destruct after use, leaving no
                        digital trace.
                    </li>
                </ul>
            </div>
        </div>
    );
}
