export const metadata = {
    title: "What Is My IP Address? – IP Lookup Tool",
    description: "Find your public IP address, location, ISP and network details instantly. Free IPv4/IPv6 lookup tool.",
    keywords: ["what is my ip", "ip lookup", "ip geolocation", "find ip address", "trace ip location", "check my ip", "public ip address"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/ip-lookup"
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
                        name: "IP Lookup Tool",
                        description: "Find your public IP address, location, ISP and network details instantly. Free IPv4/IPv6 lookup tool.",
                        url: "https://www.tempmail.sbs/tools/ip-lookup",
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
