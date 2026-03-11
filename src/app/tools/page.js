import Link from "next/link";
import { KeyRound, ShieldCheck, Mail, CheckCircle2, Globe, FileJson, ShieldAlert, Type, Key, Link2, Binary, AlignLeft } from "lucide-react";

export const metadata = {
    title: "Free Online Tools – Password Generator, IP Lookup & More",
    description: "Free privacy and web tools — password generator, IP lookup, email validator, QR code generator and more. No signup, 100% free.",
    keywords: ["free online tools", "password generator", "email tools", "privacy tools", "web tools", "random password generator"],
    alternates: {
        canonical: "https://www.tempmail.sbs/tools"
    }
};

const toolsList = [
    {
        id: "password-generator",
        title: "Strong Password Generator",
        description: "Create highly secure, random passwords instantly. Protect your digital life with enterprise-grade password security.",
        icon: <KeyRound className="w-8 h-8 text-cyan-500" />,
        href: "/tools/password-generator",
        tag: "Popular",
        tagColor: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
        id: "email-validator",
        title: "Email Validator",
        description: "Verify if an email address exists, is deliverable, or is a known temporary/disposable address.",
        icon: <Mail className="w-8 h-8 text-emerald-500" />,
        href: "/tools/email-validator",
        tag: "New",
        tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    // Adding standard tool placeholders for the future
    {
        id: "qr-generator",
        title: "QR Code Generator",
        description: "Convert links, texts, and emails into scannable QR codes instantly. Fast and secure.",
        icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
        href: "/tools/qr-generator",
        tagColor: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
        id: "word-counter",
        title: "Word & Character Counter",
        description: "Count words, characters, sentences, check keyword density, and estimate reading time.",
        icon: <Type className="w-8 h-8 text-fuchsia-500" />,
        href: "/tools/word-counter",
        tag: "Popular",
        tagColor: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
        id: "uuid-generator",
        title: "UUID / GUID Generator",
        description: "Generate bulk random universally unique identifiers (v4 & v1) instantly. Fast & secure.",
        icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
        href: "/tools/uuid-generator",
        tagColor: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
        id: "ip-lookup",
        title: "What is my IP? (Lookup)",
        description: "Instantly find your public IP address, location, ISP, and network details. Trace any IPv4/IPv6.",
        icon: <Globe className="w-8 h-8 text-sky-500" />,
        href: "/tools/ip-lookup",
        tag: "Popular",
        tagColor: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
        id: "random-word-generator",
        title: "Random Word Generator",
        description: "Generate instant random words for brainstorming, Pictionary, Catchphrase, and creative writing.",
        icon: <Type className="w-8 h-8 text-fuchsia-400" />,
        href: "/tools/random-word-generator",
        tag: "New",
        tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
        id: "json-formatter",
        title: "JSON Formatter",
        description: "Format, beautify, and validate JSON data instantly. 100% secure client-side parsing.",
        icon: <FileJson className="w-8 h-8 text-amber-500" />,
        href: "/tools/json-formatter",
        tag: "Dev Tool",
        tagColor: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
        id: "jwt-decoder",
        title: "JWT Decoder",
        description: "Decode, parse, and inspect JSON Web Tokens (JWT) instantly. 100% secure client-side decoding.",
        icon: <Key className="w-8 h-8 text-indigo-500" />,
        href: "/tools/jwt-decoder",
        tag: "Dev Tool",
        tagColor: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
        id: "url-encoder-decoder",
        title: "URL Encoder & Decoder",
        description: "Format URLs securely. Encode special characters or decode them back to readable text.",
        icon: <Link2 className="w-8 h-8 text-teal-500" />,
        href: "/tools/url-encoder-decoder",
        tag: "Dev Tool",
        tagColor: "bg-teal-50 text-teal-600 border-teal-200"
    },
    {
        id: "email-breach-checker",
        title: "Email Breach Checker",
        description: "Verify if your email has been compromised in any public data breaches. Uses HIBP API v3.",
        icon: <ShieldAlert className="w-8 h-8 text-rose-500" />,
        href: "/tools/email-breach-checker",
        tag: "Privacy Tool",
        tagColor: "bg-rose-50 text-rose-600 border-rose-200"
    },
    {
        id: "pwned-checker",
        title: "Pwned Password Scanner",
        description: "Check if your password was exposed in a data breach! Secure k-anonymity API.",
        icon: <ShieldAlert className="w-8 h-8 text-rose-500" />,
        href: "/tools/password-breach-checker",
        tag: "Privacy Tool",
        tagColor: "bg-rose-50 text-rose-600 border-rose-200"
    },
    {
        id: "base64-encoder-decoder",
        title: "Base64 Encoder & Decoder",
        description: "Encode text to Base64 or decode Base64 strings instantly. Upload files to encode them too.",
        icon: <Binary className="w-8 h-8 text-orange-500" />,
        href: "/tools/base64-encoder-decoder",
        tag: "Dev Tool",
        tagColor: "bg-orange-50 text-orange-600 border-orange-200"
    },
    {
        id: "lorem-ipsum-generator",
        title: "Lorem Ipsum Generator",
        description: "Generate customizable placeholder text for designs and mockups. Paragraphs, sentences, or words.",
        icon: <AlignLeft className="w-8 h-8 text-lime-600" />,
        href: "/tools/lorem-ipsum-generator",
        tag: "Design Tool",
        tagColor: "bg-lime-50 text-lime-600 border-lime-200"
    }
];

export default function ToolsHub() {
    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col items-center pt-16 pb-24 px-4 sm:px-6">
            <div className="max-w-6xl w-full">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 tracking-tight mb-4">
                        Free Privacy & Web Tools
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        A suite of free, fast, and secure tools designed to keep your digital identity safe. No registration, no tracking, 100% private.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {toolsList.map((tool) => (
                        <Link
                            key={tool.id}
                            href={tool.href}
                            className={`flex flex-col p-6 rounded-2xl bg-white border shadow-sm transition-all duration-300 ${tool.href !== "#"
                                ? "hover:border-blue-300 hover:shadow-md hover:-translate-y-1 cursor-pointer border-slate-200"
                                : "opacity-80 cursor-default border-slate-200"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    {tool.icon}
                                </div>
                                {tool.tag && (
                                    <span className={`text-xs px-3 py-1 rounded-full border ${tool.tagColor} font-medium`}>
                                        {tool.tag}
                                    </span>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">{tool.title}</h2>
                            <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                                {tool.description}
                            </p>

                            {tool.href !== "#" && (
                                <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500">
                                    Use Tool
                                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </Link>
                    ))}
                </div>

                {/* SEO Content Section */}
                <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Why Use Our Free Web Tools?</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-start gap-3 mb-4">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-slate-800">100% Client-Side Processing</h3>
                                    <p className="text-sm text-slate-600 mt-1">Tools like our Password Generator run entirely in your browser. No data is ever sent to our servers.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 mb-4">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-slate-800">Completely Free Forever</h3>
                                    <p className="text-sm text-slate-600 mt-1">No sign-ups, no hidden fees, and no premium gates. Access all features instantly.</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-start gap-3 mb-4">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-slate-800">Lightning Fast</h3>
                                    <p className="text-sm text-slate-600 mt-1">Built with modern web technologies to ensure instant results without loading screens.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 mb-4">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-slate-800">Mobile Optimized</h3>
                                    <p className="text-sm text-slate-600 mt-1">Use our tools seamlessly on your smartphone, tablet, or desktop computer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ultimate Web Tools Guide & FAQs Section (SEO Focused) */}
                <div className="max-w-4xl mx-auto mt-16 px-4 md:px-0 pb-12 border-t border-slate-200 pt-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">The Ultimate Suite of Free Online Tools</h2>
                    
                    <div className="prose prose-slate max-w-none mb-12">
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Welcome to the web's most reliable collection of privacy-first, client-side digital utilities. 
                            Whether you're an everyday internet user aiming to secure your online presence, or a developer 
                            looking for quick, trustworthy utilities, you've come to the right place. 
                            Unlike many other platforms, we don't bombard you with intrusive ads, force you to create an account, or secretly harvest the data you input.
                        </p>
                        
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Why Privacy-First Tools Matter</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Imagine using a random web tool to decode a sensitive JSON file, or an online generator to create a crucial database password. 
                            If that tool operates server-side, you are essentially handing over your private data to an unknown entity. 
                            Our core philosophy is simple: what happens in your browser, stays in your browser. 
                            From our <strong>Password Generator</strong> to our <strong>JSON Formatter</strong>, computations are handled locally on your device via client-side JavaScript. 
                            This guarantees absolute data privacy and blistering fast execution speeds.
                        </p>
                        
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Our Commitment to Developers and Everyday Users</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            We bridge the gap between complex developer tools and user-friendly interfaces. 
                            A web developer can effortlessly use our <strong>JWT Decoder</strong> to debug authentication tokens or the <strong>Base64 Encoder</strong> during daily coding tasks. 
                            Simultaneously, a casual user can check if their data was exposed in a breach using our <strong>Email Breach Checker</strong>, or instantly get random words for a game night with our <strong>Random Word Generator</strong>. 
                            Every tool is designed to be self-explanatory, robust, and accessible from both desktop and mobile devices.
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 mb-8 border-t border-slate-200 pt-12">Frequently Asked Questions</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Are these tools really 100% free?</h4>
                            <p className="text-slate-600">
                                Yes. Every tool listed on this hub—from the IP Lookup to the Password Breach Scanner—is completely free to use. There are no paid tiers, hidden subscriptions, or limits on how many times you can use them per day.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">How do you ensure my data isn't stolen?</h4>
                            <p className="text-slate-600">
                                The vast majority of our tools are built using client-side processing technologies. This means when you generate a password, decode a JWT, or format JSON, the processing utilizes your device's CPU right inside your web browser. The data is never sent across the internet to our servers.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Can I use these tools on my mobile phone?</h4>
                            <p className="text-slate-600">
                                Absolutely. The entire suite of tools is built with a mobile-first responsive design. Whether you are generating a QR code on the go using your smartphone or working on a massive desktop monitor, the tools will adapt seamlessly to provide a perfect user experience.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Do I need to create an account?</h4>
                            <p className="text-slate-600">
                                No registration is required. We believe in providing friction-free utilities. You can bookmark this page and access any tool instantly without email signups or giving up any personal information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
