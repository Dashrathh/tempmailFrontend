export const metadata = {
    title: "Email Validator – Check If Email Exists",
    description: "Verify if an email address is real, deliverable, or disposable. Free email validation tool.",
    keywords: ["email validator", "email checker", "verify email", "disposable email checker", "free email verification"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/email-validator"
    }
};

export default function Layout({ children }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Email Validator",
                        description: "Verify if an email address is real, deliverable, or disposable. Free email validation tool.",
                        url: "https://www.tempmail.sbs/tools/email-validator",
                        applicationCategory: "UtilitiesApplication",
                        operatingSystem: "Web",
                        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
                    })
                }}
            />
            {children}
        </>
    );
}
