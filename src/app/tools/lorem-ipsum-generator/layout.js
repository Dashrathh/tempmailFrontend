export const metadata = {
    title: "Lorem Ipsum Generator – Free Placeholder Text",
    description: "Generate lorem ipsum placeholder text instantly. Customize paragraphs, sentences, or words. Free tool for designers and developers.",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text generator", "lorem ipsum", "sample text", "filler text"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/lorem-ipsum-generator"
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
                        name: "Lorem Ipsum Generator",
                        description: "Generate lorem ipsum placeholder text instantly. Customize paragraphs, sentences, or words.",
                        url: "https://www.tempmail.sbs/tools/lorem-ipsum-generator",
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
