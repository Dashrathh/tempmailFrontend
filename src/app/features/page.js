import LearnMoreClient from "./LearnMoreClient";

export const metadata = {
    title: "Learn More - Protect Your Privacy with Temporary Emails",
    description:
        "Learn how Tempmail.sbs protects your privacy with secure, disposable email addresses. Create temporary emails instantly and avoid spam forever.",
    openGraph: {
        title: "Learn More",
        description:
            "Learn how Tempmail.sbs protects your privacy with secure, disposable email addresses.",
    },
    alternates: {
        canonical: "https://www.tempmail.sbs/features",
    },
};

export default function FeaturesPage() {
    return <LearnMoreClient />;
}
