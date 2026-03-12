import Script from "next/script";

function NativeBanner() {
    return (
        <>
            <Script
                async
                data-cfasync="false"
                src="https://pl28869662.effectivegatecpm.com/7bf86e5554e94d0b08383cbc8047c94f/invoke.js"
                strategy="lazyOnload"
            />
            <div id="container-7bf86e5554e94d0b08383cbc8047c94f"></div>
        </>
    );
}

export default function WhatIsTempMail() {
    return (
        <>
            <section className="py-16 px-4 bg-gradient-to-b mt-1 from-white to-gray-100 w-full">
                <div className="max-w-3xl mx-auto text-center px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        What is Disposable Temporary Email? - TempMail.sbs
                    </h2>

                    <p className="text-gray-700 text-lg mb-3">
                        <a
                            href="https://tempmail.sbs"
                            className="text-blue-600 underline hover:text-blue-800"
                            title="Disposable Temporary Email Service"
                            aria-label="TempMail.sbs - Free Disposable Email Service"
                        >
                            Disposable temporary email
                        </a>{" "}
                        protects your real email address from spam, advertising mailings, and
                        malware. This <strong>anonymous email service</strong> is completely
                        free. Our system automatically deletes temporary emails that don&apos;t
                        receive messages for a period of time.
                    </p>

                    <p className="text-gray-700 text-lg mb-3">
                        Commonly known as <strong>throwaway email</strong>,{" "}
                        <strong>10 minute mail</strong>, <strong>tempmail</strong>,{" "}
                        <strong>trash mail</strong>, and <strong>fake mail</strong>, these
                        services provide quick, anonymous email solutions.
                    </p>

                    <p className="text-gray-700 text-lg mb-6">
                        Use <strong>temporary email addresses</strong> to protect your privacy
                        on:
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-gray-700 text-left max-w-md mx-auto">
                        <li className="flex items-center">
                            <span className="mr-2">•</span> Social media platforms
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">•</span> File hosting sites
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">•</span> Public Wi-Fi logins
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">•</span> Blogs and forums
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">•</span> Website registrations
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">•</span> Trial sign-ups
                        </li>
                    </ul>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6 rounded-md">
                        <p className="text-blue-700">
                            <strong>Pro Tip:</strong> TempMail.sbs is the most reliable
                            <strong> free disposable email service</strong> that requires no
                            registration. Use it anytime you need to protect your primary email
                            from spam!
                        </p>
                    </div>
                </div>
            </section>

            {/* NativeBanner Ad — Mobile + Desktop dono pe */}
            <div className="w-full flex flex-col items-center py-4 bg-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Advertisement</p>
                <div className="w-full max-w-3xl">
                    <NativeBanner />
                </div>
            </div>
        </>
    );
}