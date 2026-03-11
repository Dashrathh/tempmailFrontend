export const metadata = {
    title: "Base64 Encoder & Decoder – Free Online Tool",
    description: "Encode text to Base64 or decode Base64 strings instantly. 100% client-side, free and secure.",
    keywords: ["base64 encoder", "base64 decoder", "encode base64", "decode base64 online", "base64 converter", "developer tools"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/base64-encoder-decoder"
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
                        name: "Base64 Encoder & Decoder",
                        description: "Encode text to Base64 or decode Base64 strings instantly. 100% client-side, free and secure.",
                        url: "https://www.tempmail.sbs/tools/base64-encoder-decoder",
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
