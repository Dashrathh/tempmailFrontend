export const metadata = {
    title: "Strong Password Generator – Free & Secure | TempMail.sbs",
    description: "Generate random, secure passwords instantly. No signup required. Free password generator tool by TempMail.sbs.",
    keywords: ["password generator", "random password generator", "strong password generator", "secure password creator", "free password generator"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/password-generator"
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
                        name: "Strong Password Generator",
                        description: "Generate random, secure passwords instantly. No signup required. Free password generator tool by TempMail.sbs.",
                        url: "https://www.tempmail.sbs/tools/password-generator",
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
