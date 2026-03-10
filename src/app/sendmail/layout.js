export const metadata = {
    title: "Send Anonymous Email Free - No Signup Required",
    description:
        "Send anonymous emails instantly with TempMail.sbs. No registration, no personal data stored, no logs. Use a disposable temporary email address to send emails with attachments — 100% free and private.",
    keywords: [
        "anonymous email sender",
        "temporary email",
        "disposable email",
        "send email without registration",
        "burner email",
        "fake email sender",
        "private email sender",
        "free anonymous email",
        "no signup email",
        "send email anonymously",
        "send anonymous email online",
        "temporary email address free",
    ],
    alternates: {
        canonical: "https://www.tempmail.sbs/sendmail",
    },
    openGraph: {
        type: "website",
        title: "Send Anonymous Email Free - No Signup | TempMail.sbs",
        description:
            "Send emails anonymously with a disposable address. No registration needed. 100% free, private & secure.",
        url: "https://www.tempmail.sbs/sendmail",
        images: [{ url: "https://www.tempmail.sbs/og-image.png" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Send Anonymous Email Free | TempMail.sbs",
        description:
            "Send emails anonymously with a disposable address. No registration needed. 100% free & private.",
        images: ["https://www.tempmail.sbs/og-image.png"],
    },
};

export default function SendMailLayout({ children }) {
    return (
        <>
            {/* WebApplication Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "TempMail.sbs Anonymous Email Sender",
                        url: "https://tempmail.sbs/sendmail",
                        description:
                            "Send anonymous emails instantly with a disposable temporary email address. No registration required. 100% free and private.",
                        applicationCategory: "UtilitiesApplication",
                        operatingSystem: "Any",
                        offers: {
                            "@type": "Offer",
                            price: "0",
                            priceCurrency: "USD",
                        },
                        featureList: [
                            "Anonymous email sending",
                            "No registration required",
                            "File attachments up to 5 files",
                            "Auto-deleted disposable inbox",
                            "Multiple email domains",
                            "Zero data retention",
                        ],
                    }),
                }}
            />

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: [
                            {
                                "@type": "Question",
                                name: "How do I send an anonymous email for free?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "Just enter any username on TempMail.sbs, choose a domain (@tempmail.sbs or @filmyhunt.xyz), type your message and hit Send. No signup or registration needed.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "Can I send an email without revealing my identity?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "Yes. TempMail.sbs generates a disposable email address that completely hides your real identity. The recipient cannot trace the email back to you.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "Is TempMail.sbs safe and private to use?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "Absolutely. We store zero personal data, no IP logs, and all inboxes are auto-deleted after use. Your privacy is our top priority.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "Can I attach files to anonymous emails?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "Yes — you can attach up to 5 files per email on TempMail.sbs, completely free. Supported formats include documents, images, PDFs and more.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "What is a temporary or disposable email address?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "A temporary email is a one-time email address you can use to send or receive emails without exposing your real email account. It auto-expires after use.",
                                },
                            },
                        ],
                    }),
                }}
            />
            {children}
        </>
    );
}
