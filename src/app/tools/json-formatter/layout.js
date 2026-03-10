export const metadata = {
    title: "JSON Formatter & Validator – Free Online Tool | TempMail.sbs",
    description: "Format, beautify and validate JSON data instantly. 100% client-side, no data sent to servers.",
    keywords: ["json formatter", "json validator", "beautify json", "format json", "minify json", "json parser", "free dev tools"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/json-formatter"
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
                        name: "JSON Formatter & Validator",
                        description: "Format, beautify and validate JSON data instantly. 100% client-side, no data sent to servers.",
                        url: "https://www.tempmail.sbs/tools/json-formatter",
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
