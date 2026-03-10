export const metadata = {
    title: "Privacy Policy",
    description:
        "Read the TempMail.sbs Privacy Policy. We do not collect personal data. Your temporary emails are auto-deleted.",
    openGraph: {
        title: "Privacy Policy - TempMail.sbs",
        description:
            "Read the TempMail.sbs Privacy Policy. We do not collect personal data.",
    },
    alternates: {
        canonical: "https://www.tempmail.sbs/Privacy",
    },
};

export default function Privacy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Privacy Policy</h1>

            <p className="mb-4">
                This Privacy Policy applies to the TempMail free-to-use website,
                hereinafter referred to as &ldquo;TempMail.sbs&rdquo;. By using this site, you agree
                to the terms outlined below.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                1. No Personal Data Collection
            </h2>
            <p className="mb-4">
                TempMail.sbs does not collect, store, or process any personal user data.
                We do not require registration or login for any service. You can use our
                service without providing any identifiable information.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                2. Temporary Email Retention
            </h2>
            <p className="mb-4">
                All temporary emails are automatically deleted after 10 minutes.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                3. Cookies &amp; Third-Party Ads
            </h2>
            <p className="mb-4">
                We use cookies to improve functionality and to serve non-personalized
                ads through third-party providers like Google AdSense. These cookies may
                be used for analytics or basic ad personalization.
                <br />
                You can manage or disable cookies in your browser settings.
                <br />
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                4. Third-Party Services
            </h2>
            <p className="mb-4">
                We may use third-party services including Google Analytics and
                advertising partners to help maintain and improve our website. These
                services may place cookies on your device for analytics and ad
                personalization purposes, but we do not share or sell any personal data.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                5. Your Privacy Rights
            </h2>
            <p className="mb-4">
                Even though we do not collect personal data, you still have the right
                to:
            </p>
            <ul className="list-disc ml-6 mt-2 mb-4">
                <li>Control cookie usage through your browser</li>
                <li>Learn how third-party ads function</li>
            </ul>
            <p className="mb-4">
                We are committed to respecting user privacy and complying with relevant
                data protection laws.
            </p>


            <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Us</h2>
            <p className="mb-4">
                If you have any questions about this Privacy Policy, you can reach out
                to us at:
                <br />
                📧 Email:{" "}
                <a
                    href="mailto:support@tempmail.sbs"
                    className="text-blue-500 underline"
                >
                    support@tempmail.sbs
                </a>
                <br />
                📍 Address: Banaskantha, Gujarat, India – 385006
            </p>

            <p className="text-sm mt-10 text-gray-500">Effective Date: 1 June 2025</p>
        </div>
    );
}
