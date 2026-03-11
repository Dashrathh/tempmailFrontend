import Link from "next/link";
import { KeyRound, Globe, Type, ShieldCheck } from "lucide-react";

const popularTools = [
    {
        title: "Password Generator",
        description: "Create strong, secure, random passwords instantly.",
        icon: <KeyRound className="w-7 h-7 text-cyan-500" />,
        href: "/tools/password-generator",
        color: "border-cyan-100 hover:border-cyan-300",
    },
    {
        title: "IP Lookup",
        description: "Find your IP address, location, ISP & network details.",
        icon: <Globe className="w-7 h-7 text-sky-500" />,
        href: "/tools/ip-lookup",
        color: "border-sky-100 hover:border-sky-300",
    },
    {
        title: "Word Counter",
        description: "Count words, characters, sentences & reading time.",
        icon: <Type className="w-7 h-7 text-fuchsia-500" />,
        href: "/tools/word-counter",
        color: "border-fuchsia-100 hover:border-fuchsia-300",
    },
    {
        title: "QR Code Generator",
        description: "Convert any URL or text into a scannable QR code.",
        icon: <ShieldCheck className="w-7 h-7 text-purple-500" />,
        href: "/tools/qr-generator",
        color: "border-purple-100 hover:border-purple-300",
    },
];

export default function PopularTools() {
    return (
        <section className="w-full py-16 px-4 sm:px-6 bg-slate-50">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
                        Popular Free Tools
                    </h2>
                    <p className="text-slate-500 text-sm max-w-lg mx-auto">
                        Enhance your productivity and privacy with our suite of free, fast, and secure web tools.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {popularTools.map((tool, idx) => (
                        <Link
                            key={idx}
                            href={tool.href}
                            className={`flex flex-col items-center text-center p-6 rounded-2xl bg-white border ${tool.color} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                                {tool.icon}
                            </div>
                            <h3 className="font-bold text-slate-800 mb-1 text-base">{tool.title}</h3>
                            <p className="text-slate-500 text-xs leading-relaxed">{tool.description}</p>
                            <span className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1">
                                Use Tool
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                        View All {'>'}  14 Free Tools →
                    </Link>
                </div>
            </div>
        </section>
    );
}
