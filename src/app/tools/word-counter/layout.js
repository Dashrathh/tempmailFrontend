export const metadata = {
    title: "Word & Character Counter – Free Online Tool | TempMail.sbs",
    description: "Count words, characters, sentences and keyword density instantly. Free word counter tool.",
    keywords: ["word counter", "character counter", "text analyzer", "keyword density", "reading time calculator", "letter count", "word count online"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/word-counter"
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
                        name: "Word & Character Counter",
                        description: "Count words, characters, sentences and keyword density instantly. Free word counter tool.",
                        url: "https://www.tempmail.sbs/tools/word-counter",
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
