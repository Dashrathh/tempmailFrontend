export const metadata = {
    title: "Pwned Password Checker – Was Your Password Exposed?",
    description: "Find out if your password was leaked in a data breach. Uses secure k-anonymity API.",
    keywords: ["password breach checker", "have i been pwned", "pwned password check", "data breach scanner", "password leak check", "privacy tools", "secure password check"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/password-breach-checker"
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
                        name: "Pwned Password Checker",
                        description: "Find out if your password was leaked in a data breach. Uses secure k-anonymity API.",
                        url: "https://www.tempmail.sbs/tools/password-breach-checker",
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