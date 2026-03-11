export const metadata = {
    title: "Terms and Conditions",
    description:
        "Read the Terms and Conditions for using TempMail.sbs - the free temporary disposable email service.",
    openGraph: {
        title: "Terms and Conditions",
        description: "Read the Terms and Conditions for using TempMail.sbs.",
    },
    alternates: {
        canonical: "https://www.tempmail.sbs/terms",
    },
};

export default function TermsAndConditions() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Terms and Conditions
            </h1>

            <p className="mb-6">
                By accessing and using <strong>TempMail.sbs</strong>, you agree to the
                following terms and conditions. Please read them carefully. If you do
                not agree with any part of these terms, you should not use our website.
            </p>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Use of Service</h2>
                <p>
                    TempMail.sbs provides temporary, disposable email addresses for
                    general public use. These email addresses are publicly accessible, and
                    anyone can access the inbox without authentication. This service is
                    meant only for temporary use and spam prevention.
                </p>
                <p className="mt-2">
                    You agree not to use this service for illegal, abusive, harmful, or
                    fraudulent purposes, including sending/receiving malicious content,
                    spam, or phishing emails.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Public Inbox</h2>
                <p>
                    The email addresses and inboxes on this site are{" "}
                    <strong>public and not private</strong>. Do not use them for receiving
                    personal, confidential, or sensitive information.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                    3. Limitation of Liability
                </h2>
                <p>
                    TempMail.sbs and its team are not responsible for any loss, damage,
                    misuse, or data leakage arising from the use of this service. You use
                    this service <strong>entirely at your own risk</strong>. If any issue
                    occurs in the future, we are <strong>not responsible</strong> under
                    any condition.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
                <p>
                    All content, layout, design, and branding on this website belong to
                    TempMail.sbs. Unauthorized use, reproduction, or copying is strictly
                    prohibited.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                    5. Third-Party Ads and Links
                </h2>
                <p>
                    Our website may show ads or contain links to third-party websites. We
                    are not responsible for the content, policies, or actions of those
                    websites. Use them at your own risk.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
                <p>
                    We reserve the right to modify or update these terms at any time
                    without prior notice. Continued use of the site means you agree to the
                    updated terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
                <p>
                    We reserve the right to suspend or terminate your access to the
                    service at any time without notice if you violate these terms.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
                <p>
                    For any questions or concerns, contact us at:{" "}
                    <strong>support@tempmail.sbs</strong>
                </p>
            </section>
        </div>
    );
}
