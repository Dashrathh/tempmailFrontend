export const metadata = {
    title: "UUID / GUID Generator – Free Bulk Generator | TempMail.sbs",
    description: "Generate random UUID v1 and v4 identifiers instantly. Free bulk UUID generator tool.",
    keywords: ["uuid generator", "guid generator", "random uuid", "generate guid online", "v4 uuid", "bulk uuid generator"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/uuid-generator"
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
                        name: "UUID / GUID Generator",
                        description: "Generate random UUID v1 and v4 identifiers instantly. Free bulk UUID generator tool.",
                        url: "https://www.tempmail.sbs/tools/uuid-generator",
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
