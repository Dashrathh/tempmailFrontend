export const metadata = {
    title: "Email Breach Checker – Was Your Email Leaked? | TempMail.sbs",
    description: "Check if your email was exposed in a data breach. Powered by HIBP API. Free and instant.",
    keywords: ["email breach checker", "has my email been pwned", "email leak check", "data breach email", "check email pwned"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/email-breach-checker"
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
                        name: "Email Breach Checker",
                        description: "Check if your email was exposed in a data breach. Powered by HIBP API. Free and instant.",
                        url: "https://www.tempmail.sbs/tools/email-breach-checker",
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
