export const metadata = {
    title: "Random Word Generator | Free Random Words (Nouns, Verbs, Adjectives)",
    description: "Generate random words instantly! Create 1 to 500 random nouns, verbs, or adjectives for games like Pictionary, brainstorming, or writing prompts. 100% Free.",
    keywords: [
        "random word generator",
        "random nouns",
        "random verbs",
        "random adjectives",
        "generate random words",
        "catchphrase words",
        "pictionary words",
        "creative writing words"
    ],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools/random-word-generator"
    },
    openGraph: {
        title: "Free Random Word Generator | Flashcards & Games",
        description: "Generate up to 500 random words instantly! Choose Nouns, Verbs, Adjectives, or All. Free client-side tool for writing and brainstorming.",
        url: "https://www.tempmail.sbs/tools/random-word-generator",
        siteName: "TempMail.sbs Tools",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Random Word Generator",
        description: "Instantly generate random words safely and for free - Nouns, Verbs, and Adjectives supported."
    }
};

export default function Layout({ children }) {
    return (
        <>
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        name: "Random Word Generator",
                        url: "https://www.tempmail.sbs/tools/random-word-generator",
                        description: "A free online random word generator offering nouns, verbs, and adjectives. Perfect for brainstorming, writers, designers, developers, and games like Pictionary and Catchphrase. Super fast and entirely client-side, respecting your privacy.",
                        applicationCategory: "UtilityApplication",
                        operatingSystem: "Any",
                        offers: {
                            "@type": "Offer",
                            price: "0",
                            priceCurrency: "USD"
                        },
                        featureList: [
                            "Generate up to 50 random words at a time",
                            "Filter by Parts of Speech (Noun, Verb, Adjective)",
                            "Client-side processing (instant generation)",
                            "Copy to clipboard feature"
                        ]
                    })
                }}
            />
            {children}
        </>
    );
}
