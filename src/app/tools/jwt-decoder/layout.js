export const metadata = {
    title: "JWT Decoder – Decode JSON Web Tokens Online",
    description: "Decode and inspect JWT tokens instantly. 100% secure client-side decoding tool.",
    keywords: ["jwt decoder", "jwt parser", "decode jwt", "json web token", "jwt online", "parse jwt token", "developer tools"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/jwt-decoder"
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
                        name: "JWT Decoder",
                        description: "Decode and inspect JWT tokens instantly. 100% secure client-side decoding tool.",
                        url: "https://www.tempmail.sbs/tools/jwt-decoder",
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
