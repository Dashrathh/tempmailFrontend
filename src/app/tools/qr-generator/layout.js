export const metadata = {
    title: "QR Code Generator – Free & Instant | TempMail.sbs",
    description: "Convert any URL, text or email into a QR code instantly. Free, fast and secure.",
    keywords: ["qr code generator", "free qr code creator", "custom qr code", "qr code maker", "generate qr code online"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/qr-generator"
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
                        name: "QR Code Generator",
                        description: "Convert any URL, text or email into a QR code instantly. Free, fast and secure.",
                        url: "https://www.tempmail.sbs/tools/qr-generator",
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
