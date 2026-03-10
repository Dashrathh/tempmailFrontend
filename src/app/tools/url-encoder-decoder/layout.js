export const metadata = {
    title: "URL Encoder & Decoder – Free Online Tool | TempMail.sbs",
    description: "Easily encode or decode URL strings securely. A free developer tool to format URLs and convert special characters into valid formats.",
    keywords: ["url encoder", "url decoder", "encode url online", "decode url online", "url parser", "percent encoding", "developer tools"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/url-encoder-decoder"
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
                        name: "URL Encoder & Decoder",
                        description: "Easily encode or decode URL strings securely. A free developer tool to format URLs and convert special characters into valid formats.",
                        url: "https://www.tempmail.sbs/tools/url-encoder-decoder",
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
